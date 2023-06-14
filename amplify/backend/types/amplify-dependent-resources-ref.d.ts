export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "amplifypoc": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "amplifypoc": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "amplifypoc": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "S3Trigger8f157155": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "createOpenAiChat": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "predictions": {
    "InterpretUniquity": {
      "region": "string",
      "type": "string"
    }
  },
  "storage": {
    "resumestorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}