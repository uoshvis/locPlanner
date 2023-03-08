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

### Environment Variables

Set environmental variables:

```
$EDITOR ~/.profile
# add lines at the bottom of the file:
    export NODE_ENV=development
    export PORT=5000
    export MONGO_URI="your_mongo_uri"
    export JWT_SECRET="any_string"
```

Source the file:

```bash
source ~/.profile
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
