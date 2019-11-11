import React from 'react'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Popup from '../shared/Popup';
import AddressMap from '../shared/AddressMap';
import { getRandomImage } from '../../utils/picture'

const CompanyCard = props => {

  const { id, name, address, rate, coordinates, logo } = props.company;

  const ServiceImage = styled.div`
    width: 100%;
    height: 250px;
    background-position: center center;
    background-size: cover;
    background-image: url(${logo ? logo : getRandomImage(id)})
  `
  const AddressSpan = styled.span`
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `

  return (
    <div className="card col-md-3 col-sm-6 col-6">
      <ServiceImage />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/services/${id}`}>
            {name}
          </Link>
        </h5>
        <Popup title={`${name} address`} content={<AddressMap address={address} coordinates={coordinates} />}>
          <AddressSpan><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</AddressSpan>
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