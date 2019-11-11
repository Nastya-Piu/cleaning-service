import React from 'react'
import { Link } from 'react-router-dom'

const LoginFirst = (props) => {
  return (
    <div className="text-muted">{props.message} Please,
      <Link to="/users/register"> Sign up</Link> or
      <Link to="/users/login"> Login</Link> first.
    </div>
  )
}

export default LoginFirst
