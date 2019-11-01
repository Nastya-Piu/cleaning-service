import React from 'react'
import TimeAgo from 'react-timeago'

const CompanyOrderCard = (props) => {

  const { description, address, created } = props.order;

  return (
    <div className="order-card">
      <p>{description}</p>
      <div>{address}</div>
      <TimeAgo className="text-muted review-time" date={created} />
    </div>
  )
}

export default CompanyOrderCard
