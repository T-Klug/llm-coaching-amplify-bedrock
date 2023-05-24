/*
Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/

const aws = require("aws-sdk");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["openaikey"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
};
