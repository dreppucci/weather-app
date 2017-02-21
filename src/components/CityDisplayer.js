import React, { PropTypes } from 'react';
const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

const CityDisplayer = ({ city, state, country, lat, lng, message, status }) => {
  let shortState = typeof state !== 'undefined' ? state[0] : '';
  return (
    <div>
      <div className={ status != 200 || message == 'Fetched' ? 'feedback is-hidden' : 'feedback is-visible' }>{message}</div>
      <div className={ city != null ? 'city is-visible' : 'city is-hidden' }>{city}, {shortState}, {country}</div>
    </div>
  );
};

CityDisplayer.PropTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default CityDisplayer;