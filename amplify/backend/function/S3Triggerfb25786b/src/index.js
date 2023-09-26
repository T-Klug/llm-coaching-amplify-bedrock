/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DOCCONTEXTS_BUCKETNAME
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Client } from "@opensearch-project/opensearch";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";

const SECRET_PATH = process.env.OpenAIKey;
const OPEN_SEARCH_URL = process.env.OpenSearchUrl;

export const handler = async (event) => {
  console.log("Received S3 event:", JSON.stringify(event, null, 2));
  // Read Event
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  // Get User Id
  const userId = key.split(":")[1].split("/")[0];
  console.log(`Bucket: ${bucket}`, `Key: ${key}`, `UserId: ${userId}`);
  // Get File
  const clientS3 = new S3Client();
  const s3Input = {
    Bucket: bucket,
    Key: key,
  };
  const commandS3 = new GetObjectCommand(s3Input);
  const response = await clientS3.send(commandS3);

  // Setup Loader
  let loader;
  if (key.endsWith(".pdf")) {
    loader = new PDFLoader();
  } else if (key.endsWith(".docx")) {
    loader = new DocxLoader();
  } else {
    console.log("Unsupported Document Type");
    return "Not Supported Document type";
  }

  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const docs = await loader.parse(buffer, { name: key });
  console.log(docs);
  docs.forEach((d) => {
    delete d.metadata.pdf;
    delete d.metadata.loc;
  });

  // Get Open AI Key
  const ssmClient = new SSMClient();
  const input = {
    Name: SECRET_PATH,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const { Parameter } = await ssmClient.send(command);

  // Setup Open Search Client
  const client = new Client({
    ...AwsSigv4Signer({
      region: "us-east-1",
      service: "es", // 'aoss' for OpenSearch Serverless
      // Must return a Promise that resolve to an AWS.Credentials object.
      // This function is used to acquire the credentials when the client start and
      // when the credentials are expired.
      // The Client will refresh the Credentials only when they are expired.
      // With AWS SDK V2, Credentials.refreshPromise is used when available to refresh the credentials.

      // Example with AWS SDK V3:
      getCredentials: () => {
        // Any other method to acquire a new Credentials object can be used.
        const credentialsProvider = defaultProvider();
        return credentialsProvider();
      },
    }),
    node: OPEN_SEARCH_URL,
  });

  // Load the doc to the user's index
  await OpenSearchVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: Parameter.Value,
    }),
    {
      client,
      indexName: userId,
    }
  );
};
