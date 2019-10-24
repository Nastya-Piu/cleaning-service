import React from 'react';
import Header from './shared/Header';
import CompanyList from '../components/cleaning-companies/CompanyList';
import { Router, Route, Switch } from 'react-router-dom';
import Register from './users/Register';
import Login from './users/Login';
import history from '../history';

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Header />
        <div className="container">
          <Switch>
                <Route path="/" exact component={CompanyList}/>
                <Route path="/users/register" exact component={Register}/>
                <Route path="/users/login" exact component={Login}/>
          </Switch>
        </div>
      </Router>
    );
  };
}

export default App;