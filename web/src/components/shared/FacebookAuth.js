import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { signIn } from '../../store/actions';

class FacebookAuth extends React.Component {

  responseFacebook = result => {
    if(result.userID) {
      this.props.signIn('facebook', result);
    }
  }

  logout = () => {
    window.FB.logout();
  }

  render() {

    const { userInfo } = this.props;
    return (
      <>
      { userInfo &&
        <div>
          {userInfo.name}
          <button className="ui button" onClick={this.logout}>Logout from Facebook</button>
        </div>
      }
      { !userInfo && <FacebookLogin
          appId="452970722234083"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          cssClass="ui button primary facebook-btn"
          icon="fa-facebook"
        />
      }
      </>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userInfo: state.auth.userInfo };
}

export default connect(mapStateToProps, {
  signIn
})(FacebookAuth);