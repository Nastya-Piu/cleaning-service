import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CompanyForm from './CompanyForm'
import { fetchCompany, editCompany } from '../../store/actions/companyActions'
import LoginFirst from '../shared/LoginFirst'
import { getCompanyState } from '../../store/selectors/companySelector'

class CompanyEdit extends Component {

  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editCompany(values);
  }

  render() {

    if (!this.props.user) {
      return <LoginFirst message="You couldn't edit company." />
    }

    return (
      <div>
        <h4>Edit your <Link to={`/services/${this.props.company.id}`}>company</Link>:</h4>
        <CompanyForm onSubmit={this.onSubmit} initialValues={this.props.company} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  company: getCompanyState(state)
})


export default connect(mapStateToProps, {
  fetchCompany, editCompany
})(CompanyEdit)
