import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompanyOrder extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumb">
          <Link to="/">Back to companies</Link>&nbsp;/ Order
        </div>
        This is the company order form!!!
      </div>
    )
  }
}

export default CompanyOrder
