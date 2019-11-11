import React, { Component } from 'react'
import { connect } from 'react-redux'
import CompanyForm from './CompanyForm'
import { createCompany } from '../../store/actions/companyActions'
import LoginFirst from '../shared/LoginFirst'

class CompanyCreate extends Component {

  onSubmit = values => {
    this.props.createCompany(values);
  }

  render() {

    if (!this.props.user) {
      return <LoginFirst message="You have no rights to create new company." />;
    }

    return (
      <div>
        <h4>Add your company:</h4>
        <CompanyForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo
})


export default connect(mapStateToProps, {
  createCompany
})(CompanyCreate)
