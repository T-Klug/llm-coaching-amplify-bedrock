# Amplify POC

The amplify POC is the home of both the frontend and backend of Uniquity's application. It is built on Vite.

The front end web is deployed using vite utilizing the Amplify Web Hosting. In other words anything checked into Main will be pushed out to https://app.uniquity.ai

[Amplify](https://aws.amazon.com/amplify/) is doing both our backend and our frontend. This is due to the fact we can quickly add capabilities and auto generated code for backend persistance in dynamodb, as well as connections into Amazon Analytics, predictions, authentication etc.

# Getting Setup

I suggest getting nvm to quickly be able to switching between node versions.

I also suggest the following vscode extensions

- [ESLINT](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

These extensions do format and runtime checks. Also the .vscode folder has the settings necessary to have the IDE autoformat on save.

Once you have nvm & node LTS and the extensions installed. You will need one globally installed package

```
npm i -g @aws-amplify/cli
```

Download the git repository, then in the root folder you will configure amplify.

Once you have done that you will need to configure the aws amplify cli

```
amplify pull
```

To work on the frontend you will want to have an expo account and the expo app to view the iOS version

## Install Depdendencies

Change to the uniquity folder

```
cd uniquity
npm install
```

## Run the application

```
npm run dev
```

## Build for Delivery

```
npm run build
```

## CI-CD

Edit the `amplify.yml`

## Backend

The Amplify folder `backend` itself has numerous folders

- analytics - this houses all the amazon pinpoint setup
- api - this houses both the App Sync Graphql Schema - we have overriden it to do some of our more unique use cases
- auth - this is the Cognito setup and functions
- function - this is the lambda functions, some are hooked up as graphql resolvers, others are storage triggers etc
- storage - this is the setup for our buckets available for use in the Amplify Storage
- types - this is type information for typescript

Amplify documentation is your best bet to utilize any of the backend parts. Updates are simply `amplify update api` for instance.

Adding functions can be as sipmle as `amplify add function`
