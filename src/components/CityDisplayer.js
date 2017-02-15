import React, { PropTypes } from 'react';
import { locale } from './../index.js';

const CityDisplayer = ({ city, country, lat, lng, message, status }) => {
  return (
    <div>
      <div className={ status != 200 ? 'message is-hidden' : 'message is-visible' }>{message}</div>
      <div className="city">
        <div className={ city != null ? 'is-visible' : 'is-hidden' }>
          <ul>
            <li>{locale.Country}: {country}</li>
            <li>{locale.City}: {city}</li>
            <li>{locale.Latitude}: {lat}</li>
            <li>{locale.Longitude}: {lng}</li>
          </ul>
        </div>
      </div>
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