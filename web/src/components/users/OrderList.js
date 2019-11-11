import React from 'react'
import CompanyOrderCard from '../cleaning-companies/CompanyOrderCard'
import './OrderList.scss'

export const OrderList = (props) => {

  const removeOrder = id => () => {
    if (window.confirm('Are you sure to remove this order?')) {
      props.onRemoveOrder(id);
    }
  };

  if (!props.orders || props.orders.length === 0) {
    return <small className="text-muted">You got no orders yet. Please, go to services page and choose company to make order.</small>
  }

  return (
    <div className="orders">
      <h4>Orders:</h4>
      {props.orders.map(order => <CompanyOrderCard key={order.id} order={order} onRemove={removeOrder} />)}
    </div>
  )
}
