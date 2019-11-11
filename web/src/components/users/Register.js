import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, signOut } from '../../store/actions/userActions';
import RegisterForm from './RegisterForm';
import SocialAuth from '../shared/SocialAuth';

class Register extends React.Component {

  onSubmit = (profile) => {
    this.props.register(profile);
  };

  logout = () => {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        {!this.props.isSignedIn &&
          <>
            <h1 className="text-center">Fill in the fields, please: </h1>
            <SocialAuth onSubmit={this.onSubmit} />
            <RegisterForm onSubmit={this.onSubmit} />
          </>
        }
        {this.props.userExists && <p className="text-danger text-center">User is already exists. Please, <Link to='/users/login'>Login</Link></p>}
        {this.props.isSignedIn &&
          <div className="text-center">
            <h1>You are already signed in</h1>
            <button className="btn btn-outline-secondary" onClick={this.logout}>Logout</button>
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