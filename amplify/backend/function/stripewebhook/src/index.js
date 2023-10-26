/* Amplify Params - DO NOT EDIT
	API_ADMINQUERIES_APIID
	API_ADMINQUERIES_APINAME
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import Stripe from "stripe";

const ACCOUNT_SECRET = process.env.accountSecret;
const ENDPOINT_SECRET = process.env.endpointSecret;
const USER_POOL_ID = process.env.userpoolId;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const client = new SSMClient();
  const input = {
    Name: ACCOUNT_SECRET,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const accountSecret = await client.send(command);
  const accountSecretValue = accountSecret.Parameter.Value;

  const input2 = {
    Name: ENDPOINT_SECRET,
    WithDecryption: true,
  };
  const command2 = new GetParameterCommand(input2);
  const endpointSecret = await client.send(command2);
  const endpointSecretValue = endpointSecret.Parameter.Value;

  const stripe = new Stripe(accountSecretValue);

  const sig = event.headers["Stripe-Signature"];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecretValue
    );
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify("Bad Arguement"),
    };
  }
  const cognitoClient = new CognitoIdentityProviderClient();

  switch (stripeEvent.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = stripeEvent.data.object;
      console.log(checkoutSessionCompleted.customer_details.email);
      const userInput = {
        UserPoolId: USER_POOL_ID,
        Username: checkoutSessionCompleted.customer_details.email,
        DesiredDeliveryMediums: ["EMAIL"],
        UserAttributes: [
          {
            Name: "email",
            Value: checkoutSessionCompleted.customer_details.email,
          },
        ],
        ValidationData: [
          {
            Name: "email",
            Value: checkoutSessionCompleted.customer_details.email,
          },
        ],
      };
      const newUserCommand = new AdminCreateUserCommand(userInput);
      await cognitoClient.send(newUserCommand);

      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "customer.subscription.deleted":
    case "customer.subscription.updated":
      const subscriptionEvent = stripeEvent.data.object;
      const customer = await stripe.customers.retrieve(
        subscriptionEvent.customer
      );
      switch (subscriptionEvent.status) {
        case "canceled":
        case "past_due":
        case "unpaid":
          const disableUserInput = {
            UserPoolId: USER_POOL_ID,
            Username: customer.email,
          };
          const disableUserCommand = new AdminDisableUserCommand(
            disableUserInput
          );
          await cognitoClient.send(disableUserCommand);
          break;
        case "active":
          const enableUserInput = {
            UserPoolId: USER_POOL_ID,
            Username: customer.email,
          };
          const enableUserCommand = new AdminEnableUserCommand(enableUserInput);
          await cognitoClient.send(enableUserCommand);
          break;
        default:
          console.log(
            `Unhandled subscritption update ${subscriptionEvent.type}`
          );
          return {
            statusCode: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify("Unhandled Event"),
          };
      }
      break;

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify("Unhandled Event"),
      };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
};
