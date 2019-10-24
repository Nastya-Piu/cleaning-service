import React from 'react';
import { connect } from 'react-redux';
import { signOutGoogle, signIn, signOut } from '../../store/actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.auth2.init({
        clientId: '101746452525-itbic8f4kh63q7skt62pt6dh5gdejtgk.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn('google', this.auth.currentUser.get().getId());
    } else {
      this.props.signOutGoogle();
    }
  };

  login = () => {
    this.auth.signIn();
  }

  logout = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
      return <button className="ui button" onClick={this.logout}>Sign out</button>
    } else {
      return (
        <button className="ui button primary" onClick={this.login}>
          <i className="icon google"></i>
          Login with Google
        </button>
      )
    }
  }

  render() {
    return (
      <span>
        {this.renderAuthButton()}
      </span>
    );
  };
};

const masStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(masStateToProps, {
  signOutGoogle, signIn, signOut
})(GoogleAuth);