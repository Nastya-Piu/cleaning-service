import React from 'react'
import PropTypes from 'prop-types'
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import { faFacebookF, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import * as qs from 'query-string'
import './SocialAuth.scss'
import SocialButton from './SocialButton';
import Axios from 'axios'
import history from '../../history'

const SocialAuth = props => {

  const { code } = qs.parse(window.location.search);
  if (code) {
    const redirectPath = props.login ? 'login' : 'register';
    Axios.post('http://localhost:3000/linkedin', { code: code, redirect: redirectPath }).then(response => {
      let profile = response.data.user;
      // TODO: clean url params
      profile['linkedinId'] = profile.id;
      props.onSubmit(profile);
    }).catch(err => {
      console.error(err)
      history.push(`/users/${redirectPath}`);
    });
  }

  const onSubmitAuth = methodId => values => {
    let { profile } = values;

    profile[methodId] = profile.id;
    props.onSubmit(profile);
  };

  const loginLinkedin = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ase93762zkx5&redirect_uri=https://localhost:3001/users/${props.login ? 'login' : 'register'}&state=aRandomString&scope=r_liteprofile r_emailaddress w_member_social`;
  }

  return (
    <div className="social-buttons">
      <SocialLogin
        provider='facebook'
        appId='452970722234083'
        callback={onSubmitAuth('facebookId')}
      >
        <SocialButton name="Facebook" icon={faFacebookF} login={props.login} />
      </SocialLogin>
      <SocialLogin
        provider='google'
        appId='101746452525-itbic8f4kh63q7skt62pt6dh5gdejtgk.apps.googleusercontent.com'
        callback={onSubmitAuth('googleId')}
      >
        <SocialButton name="Google" icon={faGoogle} login={props.login} />
      </SocialLogin>

      <div onClick={loginLinkedin}>
        <SocialButton name="Linkedin" icon={faLinkedin} login={props.login} />
      </div>

    </div>
  )
}

SocialAuth.propTypes = {
  login: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}

export default SocialAuth
