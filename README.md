# Rental Listing App

RentListify is a mobile app for managing apartment rental listings.

This repository contains both the frontend code, written in React Native/TypeScript and also the backend code written using Node, Prisma and TypeScript.

The frontend code is tested and working on iOS latest with iPhone 10/10s/11.

## Demo:

<img src="https://user-images.githubusercontent.com/369384/71656279-9d889000-2cef-11ea-8134-14c4eb5b0254.gif" width="270" />

## Getting Started:

Clone this repository to a directory on your computer. It's recommended to use a Mac for iPhone development (although using Expo this will probably work without a Mac).

You will need to run both the backend and the frontend locally. Requirements include Node v10.5 or above, npm or yarn (recommended), Xcode with iOS simulator (recommended).

### Backend

The following steps wil create a local database and run the dev server.

```sh
cd ~/my-project/backend
# Install dependencies
yarn install
# Create typedefs for the database/ORM
yarn generate
# Create the initial database. Leave this running and open a new tab.
yarn prisma:dev
# [In a new tab] Add some users to the database
yarn seed
# Run the server
yarn start:dev
```

### Frontend

```sh
cd ~/my-project/frontend
# Install dependencies
yarn install
# Start the metro bundler
yarn start
```

This will open a web interface with some information about the React Native bundler. Click on "Run on iOS simulator" on the left, or use your phone and install the [Expo Client](https://expo.io/tools#client), and then scan the QR code using any QR code reader of your choice (you can use the builtin camera app on iOS).

## Using the app

After you launch the app, you can login as a normal user by just creating an account.

To login as an administrator and add/edit users and rental listings, you can login with: sstur@me.com / 123
