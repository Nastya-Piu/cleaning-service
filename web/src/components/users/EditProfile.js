import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProfileForm from './ProfileForm'
import LoginFirst from '../shared/LoginFirst';
import { updateProfile } from '../../store/actions/userActions'

class EditProfile extends Component {

  onSubmit = values => {
    console.log(values);
    this.props.updateProfile(values);
  }

  render() {

    const { user } = this.props;

    if (!user) {
      return <LoginFirst message="To edit profile, you should login first." />
    };

    return (
      <div>
        <h4>Edit profile: </h4>
        <ProfileForm onSubmit={this.onSubmit} initialValues={this.props.user} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth.userInfo }
}

export default connect(mapStateToProps, {
  updateProfile
})(EditProfile);
