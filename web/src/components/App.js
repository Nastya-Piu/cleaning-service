import React from 'react';
import Header from './shared/Header';
import CompanyList from '../components/cleaning-companies/CompanyList';
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Register from './users/Register';
import Login from './users/Login';
import history from '../history';
import CompanyOrder from './cleaning-companies/CompanyOrder';

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
                <Route path="/" exact component={CompanyList}/>
                <Route path="/users/register" exact component={Register}/>
                <Route path="/users/login" exact component={Login}/>
                <Route path="/order/:id" exact component={CompanyOrder}/>
          </Switch>
        </Container>
      </Router>
    );
  };
}

export default App;