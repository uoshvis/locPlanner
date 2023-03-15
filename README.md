# Location Planner App

## About

This project is a cloned version of a personal [Location Planner](https://github.com/uoshvis/location-planner) project.

The main task is to recreate the project and learn using:

-   [React Redux](https://react-redux.js.org/)

-   [React Router](https://reactrouter.com/)

-   [React Hook Form](https://react-hook-form.com/)

-   [Material UI](https://mui.com/)

-   [Cypress](https://www.cypress.io/)

-   [Mock Service Worker](https://mswjs.io/docs/getting-started/mocks)

-   [And more..](https://stackoverflow.com/)

## App Features

-   [x] Start React Redux JS template
-   [x] Use Material UI components
-   [x] Add React Big Calendar
-   [x] Event location btn
-   [x] Mock REST API (Mock Service Worker)
-   [x] Async Logic and Data Fetching in Redux
-   [x] Get Events from mock API
-   [x] React hook form (add/update/delete)
-   [x] Form field validation
-   [x] Form field error notifications
-   [x] API status notifications
-   [x] Users profile (select color)
-   [x] Display Events by Users (colors)
-   [x] Login/Logout
-   [x] Router
-   [ ] JWT
-   [x] Roles
-   [ ] ! Tests, tests and tests !

## Usage

### Install Dependencies

Backend & Frontend

```
  npm install
  cd frontend
  npm install
```

### Environment Variables

.env file

```
NODE_ENV = development
PORT = 5000
MONGO_URI = 'insert_your_mongodb_uri'
JWT_SECRET = "any_string"
```

#### Frontend with Mock API

Set environment variable

.env file frontend dir

```
REACT_APP_MOCK_ENV = 'enabled'
```

### Available Scripts

```bash
  # Run frontend (:3000) & backend (:5000)
  npm run dev

  # Run backend only
  npm run server

  # Run frontend only
  npm run client
```
