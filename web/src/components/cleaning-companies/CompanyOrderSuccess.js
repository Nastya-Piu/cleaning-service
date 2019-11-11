import React from 'react'
import { Link } from 'react-router-dom';

const CompanyOrderSuccess = () => {
  return (
    <div className="text-center">
      <h2>You successfully order the cleaning!</h2>
      <Link to="/">To main page</Link>
    </div>
  )
}

export default CompanyOrderSuccess
