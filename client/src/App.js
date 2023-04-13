import React from 'react';
import {  ApolloClient,
          InMemoryCache,
          ApolloProvider,
          createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import PageWrapper from './components/pageWrapper';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function renderPage() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Splash />}
            />
            <Route
              path="/dashboard"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            {/* if user accesses any other page, send em home! */}
            <Route
              path="*"
              element={<Home />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function App() {
  return (
    <PageWrapper>{renderPage()}</PageWrapper>
  )
}

export default App;
