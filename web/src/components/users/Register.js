import React from 'react';
import GoogleAuth from '../shared/GoogleAuth';
import FacebookAuth from '../shared/FacebookAuth';
import { connect } from 'react-redux';
import { register, signOut } from '../../store/actions/userActions';
import RegisterForm from './RegisterForm';

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
        { this.props.isSignedIn && <button className="ui button" onClick={this.logout}>Logout</button>}
        {this.props.wrongCredentials && <div>User is not exist. Please, Sign up first</div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, wrongCredentials: state.auth.wrongCredentials }
};

export default connect(mapStateToProps, {
  register, signOut
})(Register);