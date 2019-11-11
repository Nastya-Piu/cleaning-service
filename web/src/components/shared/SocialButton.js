import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialButton = (props) => {

  const { icon, login, name } = props;

  return (
    <button className="btn btn-primary">
      <FontAwesomeIcon icon={icon} />
      {login ? `Login with ${name}` : `Register with ${name}`}
    </button>
  )
}

export default SocialButton
