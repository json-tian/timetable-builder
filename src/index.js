import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://bent-dog.us-west-2.aws.cloud.dgraph.io/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
