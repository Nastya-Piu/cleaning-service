import React from 'react'
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CompanyOrderCard = (props) => {

  const { id, description, address, created } = props.order;

  return (
    <div className="order-card">
      <h5>{address}</h5>
      <p>{description}</p>
      <TimeAgo className="text-muted review-time" date={created} />
      <div className="remove-btn"><FontAwesomeIcon icon={faTimes} onClick={props.onRemove(id)} /></div>
    </div>
  )
}

export default CompanyOrderCard
