import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './shared/Header';
import history from '../history';
import Notfound from './shared/NotFound';
import { routes } from '../routes';

class App extends React.Component {

  componentDidMount() {
    // get user - sessionStorage / localStorage - need isSignedIn, userInfo
    // check roles
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <Container>
          <Switch>
                {routes.map((route) => <Route exact key={route.path} {...route} />)}
                <Route component={Notfound} />
          </Switch>
        </Container>
      </Router>
    );
  };
}

export default App;