import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from '../shared/Popup';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const CompanyCard = props => {

  const { company } = props;

  const renderMap = () => {

    return (
      <YMaps>
        {company.address}
        <div className="map-container">
          <Map defaultState={{ center: [53.900595, 27.559007], zoom: 10 }}>
            <Placemark defaultGeometry={company.coordinates} />
          </Map>
        </div>
      </YMaps>
    )
  };


  const { id, name, address, rate } = company;

  return (
    <div className="card col-md-3 col-sm-6 .col-6" style={{padding: 0}}>
      <img src={`https://picsum.photos/id/${id+Math.floor(Math.random() * Math.floor(100))}/200?grayscale`} width="100" className="card-img-top" alt={company.name}/>
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/services/${id}`}>
            {name}
          </Link>
        </h5>
        <Popup title={`${name} address`} content={renderMap()}>
          <span className="company-address"><FontAwesomeIcon icon={faMapMarkerAlt}/> {address}</span>
        </Popup>
        <Rating
          name="customized-empty"
          value={rate}
          readOnly
          precision={0.1}
        /><br/>
        <Link to={`/order/${id}`} className="btn btn-primary">Order</Link>
      </div>
    </div>
  )
};

CompanyCard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    address: PropTypes.string,
    rate: PropTypes.number
  }).isRequired
}

export default CompanyCard;