import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import _ from 'lodash';
import LoginFirst from '../shared/LoginFirst';
import { fetchOrders, removeOrder } from '../../store/actions/companyActions';
import { getRandomImage } from '../../utils/picture';
import jss from 'jss';

import preset from 'jss-preset-default'
import { OrderList } from './OrderList';

jss.setup(preset());

const styles = {
  userImage: {
    borderRadius: '4px',
    width: '200px',
    border: '4px solid black',
    boxShadow: '4px 4px 8px 2px #bbb'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 45,
    background: '#3498db',
    border: 0,
    ':hover': {
      backgroundColor: '#2980b9'
    }
  }
}

const { classes } = jss.createStyleSheet(styles).attach();

class UserPage extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.match.params.id);
  }

  removeOrder = (id) => {
    this.props.removeOrder(id);
  };

  render() {
    const { user } = this.props;

    if (!user) {
      return <LoginFirst />
    }

    const { id, profilePicURL, name, email, address } = user;

    return (
      <Row>
        <Col xs={12} md={3}>
          <img className={classes.userImage} width="70%" src={profilePicURL ? profilePicURL : getRandomImage(id)} />
        </Col>
        <Col xs={12} md={9}>
          <h4>{name} <Link style={{ fontSize: '0.8em' }} to={`/users/${id}/edit`}><FontAwesomeIcon icon={faPencilAlt} /></Link></h4>
          <div>{email}</div>
          {address && <div><FontAwesomeIcon icon={faMapMarker} /> {address} </div>}
          <OrderList orders={this.props.orders} onRemoveOrder={this.removeOrder} />
        </Col>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.userInfo,
  orders: state.companies.orders
})

export default connect(mapStateToProps, {
  fetchOrders, removeOrder
})(UserPage)

