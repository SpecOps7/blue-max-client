import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { axios } from "axios";

//import gql from "graphql-tag";


const client = new ApolloClient({
  uri: 'https://bluemaxapi20200812102838.azurewebsites.net/api/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query {
        bluemax {
          fullName,
          awardActionDate
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
