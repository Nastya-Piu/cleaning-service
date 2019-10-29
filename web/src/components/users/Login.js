import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, signOut } from '../../store/actions/userActions';
import SocialAuth from '../shared/SocialAuth';
import LoginForm from './LoginForm';

class Login extends React.Component {

  logout = () => {
    this.props.signOut();
  }

  onSubmit = (type, value) => {
    this.props.signIn(type, value);
  };

  render() {
    return (
      <div>
        { !this.props.isSignedIn &&
          <>
            <h1 className="text-center">Log in:</h1>
            <SocialAuth login={true} onSubmit={this.onSubmit}/>
            <LoginForm onSubmit={this.onSubmit}/>
          </>
        }
        { this.props.wrongCredentials && <p>User doesn't exist. Please, <Link to='/users/register'>Sign up</Link> first</p> }
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