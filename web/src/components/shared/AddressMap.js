import React, { useState, useEffect } from 'react'
import PropTypes, { number } from 'prop-types'
import './AddressMap.scss'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AddressMap = props => {

  const [loaded, setLoaded] = useState(true);
  const { address, coordinates } = props;
  const mapParams = {
    center: [53.900595, 27.559007],
    zoom: 10
  };

  useEffect(() => {// TODO: set up geocoding for getting coordinates by address
    if (address) {
      // Geocode
    }
  })

  const geocode = (ymaps) => { // TODO: set up geocoding for getting coordinates by address
    // ymaps.geocode(props.address)
    //   .then(result => console.log(result.geoObjects.get(0).geometry.getCoordinates()))

    // ymaps.coordSystem.geo.getDistance([52.455, 23.4566], [52.4566, 36.433])
  }

  return (
    <YMaps>
      {loaded && <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin /></div>}
      <div className="map-container">
        <Map onLoad={(ymaps) => { setLoaded(false); geocode(ymaps) }} defaultState={mapParams}>
          <Placemark defaultGeometry={coordinates} />
        </Map>
      </div>
    </YMaps>
  )
}

AddressMap.propTypes = {
  address: PropTypes.string,
  coordinates: PropTypes.arrayOf(number)
}

AddressMap.defaultProps = {
  coordinates: []
}


export default AddressMap
