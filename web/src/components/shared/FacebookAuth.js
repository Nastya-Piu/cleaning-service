import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookAuth = props => {

  const responseFacebook = result => {
    if(result.userID) {
      props.onSubmit('facebook', result);
    }
  }

  return (
      <FacebookLogin
        appId="452970722234083"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        textButton={props.login ? 'Login with Facebook': 'Register with Facebook'}
        cssClass="ui button primary facebook-btn"
        icon="fa-facebook"
      />
  )
}

export default FacebookAuth;