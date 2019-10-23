import React from 'react';
import GoogleAuth from '../shared/GoogleAuth';
import FacebookAuth from '../shared/FacebookAuth';

class Register extends React.Component {

  render() {
    return (
      <div>
        <GoogleAuth />
        <FacebookAuth />
      </div>
    )
  }
}

export default Register;