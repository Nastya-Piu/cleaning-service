import React from 'react'
import GoogleAuth from './GoogleAuth'
import FacebookAuth from './FacebookAuth'

const SocialAuth = (props) => {

  const onSubmit = values => {
    props.onSubmit(values); // TODO: do we need to send type?
  };

  return (
    <div>
      <GoogleAuth login={props.login} onSubmit={onSubmit}/>
      <FacebookAuth login={props.login} onSubmit={onSubmit}/>
    </div>
  )
}

export default SocialAuth
