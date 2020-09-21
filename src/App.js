import React from 'react';
import Main from './hoc/Main';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { MainState } from './components/MainState'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

let client;
let url;
if(window.location.hostname === 'rinx.tplinkdns.com'){
   client = new ApolloClient({
    uri: "http://rinx.tplinkdns.com:3002/graphql", //Local ENV
    defaultOptions: defaultOptions,
  });
  url = 'http://rinx.tplinkdns.com:3002/static/'
    }else{
    client = new ApolloClient({
      uri: 'https://advert.ayar.ro/graphql',
      defaultOptions: defaultOptions,
    });


      url = 'https://advert.ayar.ro/static/'
}



function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <MainState>
          <Main>
            <BrowserRouter>
            <div className="container">
            <Navigation globalURL={url} />
            </div>
            </BrowserRouter>
          </Main>
        </MainState>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
