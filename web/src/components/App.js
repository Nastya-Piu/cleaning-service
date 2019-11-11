import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { getProfile } from '../store/actions/userActions'
import Header from './shared/Header';
import history from '../history';
import Notfound from './shared/NotFound';
import { routes } from '../routes';

class App extends React.Component {

  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return (
      <Router history={history}>
        <ReactNotification />
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

export default connect(null, { getProfile })(App);