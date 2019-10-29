import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../store/actions/userActions';

export class UserPage extends Component {

  componentDidMount() {
    // fetch user info
    console.log(this.props);
    // this.props.getUser(this.props.match.params.id)
  }


  render() {
    return (
      <div>
        This is profile page
        {this.props && this.props.userInfo && this.props.userInfo.name}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { userInfo: state.auth.userInfo }
}

export default connect(mapStateToProps, { getUser })(UserPage)
