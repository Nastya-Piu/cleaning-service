import React from 'react'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Popup from '../shared/Popup';
import AddressMap from '../shared/AddressMap';

const CompanyCard = props => {

  const { id, name, address, rate, coordinates, logo } = props.company;

  return (
    <div className="card col-md-3 col-sm-6 .col-6" style={{ padding: 0 }}>
      <img height="283" src={
        logo ? logo : `https://picsum.photos/id/${id + Math.floor(Math.random() * Math.floor(100))}/200?grayscale`} width="100" className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/services/${id}`}>
            {name}
          </Link>
        </h5>
        <Popup title={`${name} address`} content={<AddressMap address={address} coordinates={coordinates ? coordinates : []} />}>
          <span className="company-address"><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</span>
        </Popup>
        <Rating
          value={rate}
          readOnly
          precision={0.1}
        />
        <Link to={`/order/${id}`} className="btn btn-primary float-right">Order</Link>
      </div>
    </div>
  )
};

CompanyCard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    address: PropTypes.string,
    rate: PropTypes.number
  }).isRequired
}

export default CompanyCard;