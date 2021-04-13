import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';
// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';

// pages
import Home from './pages/Home';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Success from './pages/Success';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken();
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <div>
            {/* all components belong inside the StoreProvider tags */}
            <StoreProvider>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/orderhistory" component={OrderHistory} />
                <Route exact path="/aboutUs" component={About} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/items/:id" component={Detail} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/success" component={Success} />
                {/* if the route doesn't match any of the other path's, get a 404 */}
                <Route component={NoMatch} />
              </Switch>
              <Footer />
            </StoreProvider>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
