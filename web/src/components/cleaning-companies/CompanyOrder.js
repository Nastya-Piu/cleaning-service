import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import OrderForm from '../users/OrderForm'
import LoginFirst from '../shared/LoginFirst';
import { fetchCompany, fetchServiceTypes, createRequest } from '../../store/actions/companyActions';

class CompanyOrder extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchServiceTypes();
      this.props.fetchCompany(this.props.match.params.id);
    }
  }

  onSubmit = (request) => {
    request.created = new Date();
    request.serviceId = this.props.match.params.id;
    request.userId = this.props.user.id;
    this.props.createRequest(request);
  }

  render() {

    if (!this.props.user) {
      return (
        <LoginFirst message="You cannot make order." />
      )
    }

    const { company } = this.props;

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Back to companies</Link>
            <li className="breadcrumb-item active">Order</li>
          </ol>
        </nav>
        <div className="order-form">
          <h1>Fill in the fiels to make order:</h1>
          {company && <h4>Company: {company.name}</h4>}
          <OrderForm onSubmit={this.onSubmit} orderTypes={this.props.types} />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    types: state.companies.types,
    company: state.companies.data[0],
    user: state.auth.userInfo
  }
}

export default connect(mapStateToProps, {
  fetchServiceTypes, fetchCompany, createRequest
})(CompanyOrder)
