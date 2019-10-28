import React from 'react';
import GoogleAuth from '../shared/GoogleAuth';
import FacebookAuth from '../shared/FacebookAuth';
import { connect } from 'react-redux';
import { register, signOut } from '../../store/actions/userActions';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';

class Register extends React.Component {

  onSubmit = (method, value) => {
    this.props.register(method, value);
  };

  logout = () => {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        { !this.props.isSignedIn &&
          <>
            <h1 className="text-center">Fill in the fields, please: </h1>
            <GoogleAuth onSubmit={this.onSubmit}/>&nbsp;
            <FacebookAuth onSubmit={this.onSubmit}/><br/><br/>
            <RegisterForm onSubmit={this.onSubmit}/>
          </>
        }
        { this.props.userExists && <div>User is already exists. Please, <Link to='/users/login'>Login</Link></div>}
        { this.props.isSignedIn &&
          <div className="text-center">
            <h1>You are already signed in</h1>
            <button className="ui button" onClick={this.logout}>Logout</button>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userExists: state.auth.userExists }
};

export default connect(mapStateToProps, {
  register, signOut
})(Register);