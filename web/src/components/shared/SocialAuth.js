import React from 'react'
import PropTypes from 'prop-types'
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"

const SocialAuth = props => {

  const onSubmitAuth = methodId => values => {
    let { profile } = values;

    profile[methodId] = profile.id;
    props.onSubmit(methodId, profile);
  };

  return (
    <div className="social-buttons">
      <SocialLogin
        provider='facebook'
        appId='452970722234083'
        callback={onSubmitAuth('facebookId')}
      >
        <button className="btn btn-primary"><FontAwesomeIcon icon={faFacebookF}/>
        { props.login ? "Login with Facebook": "Register with Facebook"}
        </button>
      </SocialLogin>
      <SocialLogin
        provider='google'
        appId='101746452525-itbic8f4kh63q7skt62pt6dh5gdejtgk.apps.googleusercontent.com'
        callback={onSubmitAuth('googleId')}
      >
        <button className="btn btn-primary"><FontAwesomeIcon icon={faGoogle}/>
          { props.login ? "Login with Google": "Register with Google"}
        </button>
      </SocialLogin>
    </div>
  )
}

SocialAuth.propTypes = {
  login: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}

export default SocialAuth
