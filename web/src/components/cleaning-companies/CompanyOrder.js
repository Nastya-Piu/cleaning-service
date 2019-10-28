import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompanyOrder extends Component {
  render() {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Back to companies</Link>
            <li className="breadcrumb-item active">Order</li>
          </ol>
        </nav>
        <div>
          <p>
            This is the company order form!!!
          </p>
        </div>
      </>
    )
  }
}

export default CompanyOrder
