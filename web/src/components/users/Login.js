import React from 'react';
import GoogleAuth from '../shared/GoogleAuth';
import FacebookAuth from '../shared/FacebookAuth';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { signIn, signOut } from '../../store/actions';
import { Link } from 'react-router-dom';

class Login extends React.Component {

  logout = () => {
    this.props.signOut();
  }

  onSubmit = (value) => {
    this.props.signIn('form', value);
  };

  render() {
    return (
      <div>
        { !this.props.isSignedIn &&
          <>
          <h1 className="text-center">Log in:</h1>
          <GoogleAuth />
          <FacebookAuth /><br/><br/>
          <LoginForm onSubmit={this.onSubmit}/>
        </>
        }
        {this.props.wrongCredentials && <div>User is not exist. Please, <Link to='/users/register'>Sign up</Link> first</div>}
        { this.props.isSignedIn && <div className="text-center">
          <h1>You are already signed in</h1>
          <button className="ui button" onClick={this.logout}>Logout</button>
        </div>}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, wrongCredentials: state.auth.wrongCredentials }
};

export default connect(mapStateToProps, {
  signIn, signOut
})(Login);