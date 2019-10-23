import React from 'react';
import Header from './shared/Header';
import CompanyList from '../components/cleaning-companies/CompanyList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './users/Register';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Header />
        <div className="container">
          <Switch>
                <Route path="/" exact component={CompanyList}/>
                <Route path="/users/new" exact component={Register}/>
          </Switch>
        </div>
      </Router>
    );
  };
}

export default App;