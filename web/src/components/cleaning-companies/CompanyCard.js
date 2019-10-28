import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Popup from '../shared/Popup';

const CompanyCard = props => {

  const { company } = props;

  const renderMap = () => {

    return (
      <div>
        <img width="100%" src="https://openmaptiles.org/img/home-banner-map.png"/>
      </div>
    )

    console.log('RENDER MAP!!!')
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
      },
      (err) => {
        console.log(err.message)
      }
    );
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      > <div lat={59.955413}
          lng={30.337844}
          >My Marker</div>
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    )
  };

  return (
    <div className="card col-md-3 col-sm-6 .col-6" style={{padding: 0}}>
      <img src={`https://picsum.photos/id/${company.id+Math.floor(Math.random() * Math.floor(100))}/200?grayscale`} width="100" className="card-img-top" alt={company.name}/>
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <Popup title={`${company.name} address`} content={renderMap()}>
          <span className="company-address"><i className="ui icon map pin"></i> {company.address}</span>
        </Popup>
        <Rating
          name="customized-empty"
          value={company.rate}
          readOnly
          precision={0.1}
        /><br/>
        <Link to={`/order/${company.id}`} className="btn btn-primary">Order</Link>
      </div>
    </div>
  )
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
}

export default CompanyCard;