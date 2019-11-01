import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import LoginFirst from '../shared/LoginFirst';
import { fetchOrders } from '../../store/actions/companyActions';
import CompanyOrderCard from '../cleaning-companies/CompanyOrderCard';

class UserPage extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.match.params.id);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return <LoginFirst />
    }

    return (
      <Row>
        <Col xs={12} md={3}>
          <img width="70%" src={user.profilePicURL ? user.profilePicURL : `https://picsum.photos/id/${user.id}/200/200?grayscale`} />
        </Col>
        <Col xs={12} md={9}>
          <h4>{user.name}</h4>
          <div>{user.email}</div>
          {user.address && <div><FontAwesomeIcon icon={faMapMarker} /> {user.address} </div>}
          <div className="float-right">
            <Link to={`/users/${user.id}/edit`}><FontAwesomeIcon icon={faPencilAlt} /></Link>
          </div>
          {this.props.orders &&
            <div className="orders">
              <h4>Orders:</h4>
              {this.props.orders.map(order => <CompanyOrderCard key={order.id} order={order} />)}
            </div>
          }
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  orders: state.companies.orders
})

export default connect(mapStateToProps, {
  fetchOrders
})(UserPage)

