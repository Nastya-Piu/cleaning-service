import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleAuth = props => {

  const responseGoogle = (response) => {
    const profile = response.getBasicProfile();
    let user = {
      googleId: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail()
    };
    props.onSubmit('google', user);
  }

return (
    <GoogleLogin
      clientId="101746452525-itbic8f4kh63q7skt62pt6dh5gdejtgk.apps.googleusercontent.com"
      buttonText={props.login ? 'Login with Google': 'Register with Google'}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleAuth;