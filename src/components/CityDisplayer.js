import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const CityDisplayer = ({ city, country, lat, lng, message, status }) => {
  return (
    <div>
      <div className={ status != 200 || message == 'Fetched' ? 'feedback is-hidden' : 'feedback is-visible' }>{message}</div>
      <div className={ city != null ? 'city is-visible' : 'city is-hidden' }>{city}, {country}</div>
    </div>
  );
};

CityDisplayer.PropTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default CityDisplayer;