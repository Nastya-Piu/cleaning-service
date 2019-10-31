import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import LoginFirst from '../shared/LoginFirst';

class UserPage extends Component {

  render() {
    const { user } = this.props;

    if (!user) {
      return <LoginFirst />
    }

    return (
      <Row>
        <Col md={3}>
          <img width="70%" src={user.profilePicURL ? user.profilePicURL : `https://picsum.photos/id/${user.id}/200/200?grayscale`} />
        </Col>
        <Col md={9}>
          <h4>{user.name}</h4>
          <div>{user.email}</div>
          {user.address && <div><FontAwesomeIcon icon={faMapMarker} /> {user.address} </div>}
          <div className="float-right">
            <Link to={`/users/${user.id}/edit`}><FontAwesomeIcon icon={faPencilAlt} /></Link>
          </div>
        </Col>


      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo
})

export default connect(mapStateToProps)(UserPage)

