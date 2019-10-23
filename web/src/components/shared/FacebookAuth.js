import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { signInFacebook, signOutFacebook } from '../../store/actions';

class FacebookAuth extends React.Component {

  responseFacebook = result => {
    if(result.userID) {
      this.props.signInFacebook(result.userId, result);
    }
  }

  render() {

    const { userInfo } = this.props;
    return (
      <>
      { userInfo && <div>{userInfo.name}</div> }
      { !userInfo && <FacebookLogin
          appId="452970722234083"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
          cssClass="ui button primary"
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
  signInFacebook, signOutFacebook
})(FacebookAuth);