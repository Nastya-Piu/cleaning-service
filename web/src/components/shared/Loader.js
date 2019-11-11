import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSadTear } from '@fortawesome/free-solid-svg-icons'

const LoaderOrEmpty = (props) => {

  const { isLoading } = props;

  if (isLoading) {
    return <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin /></div>
  }

  return (
    <div className="text-center not-found">
      <FontAwesomeIcon icon={faSadTear} size="lg" />Sorry, not found
    </div>
  )
}

LoaderOrEmpty.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

export default LoaderOrEmpty
