import React from 'react';
import { locale, store } from './../index.js';
import settings from '../settings/keys.json';
import CityName from '../containers/CityName';
import { getGoogleMapsPlaceInfo } from '../containers/GoogleMapPlace';
import { fetchCity, printCity, cityError, cityUpdateStatus, removeCity } from '../actions/city';
import { updateWeatherType } from '../actions/weather';

const googleMapApiFile = `https://maps.googleapis.com/maps/api/js?key=${settings.GoogleMaps}&libraries=places&callback=initMap`;

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInputFull: false
    };
  }

  componentDidMount() {
    window.initMap = this.initMap.bind(this);

    var script = window.document.createElement('script');
    script.src = googleMapApiFile;
    script.async = true;

    document.body.appendChild(script);

  }

  initMap() {
    let input = document.getElementById('city'),
      options = {
        types: ['(cities)']
      },
      autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function() {

      store.dispatch( removeCity() );
      store.dispatch( updateWeatherType('current') );

      let place = autocomplete.getPlace();

      if (!place.geometry) {

        store.dispatch(
          cityError('CITY_UNKNOWN')
        );

        return;
      }

      store.dispatch(
        printCity(
          place.name,
          getGoogleMapsPlaceInfo(place, 'country'),
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )
      );

    }.bind(this));
  }

  onBlurPlaceholder(evt) {
    this.setState({ searchInputFull: evt.target.value.length === 0 ? false : true });
  }

  requestGeoPosition() {
    if (navigator.geolocation) {
      store.dispatch( removeCity() );
      store.dispatch( updateWeatherType('current') );

      store.dispatch( cityUpdateStatus('GEOLOCATING_CITY') );

      navigator.geolocation.getCurrentPosition(function(position) {

        store.dispatch( cityUpdateStatus('FETCHING_CITY') );

        store.dispatch(
          fetchCity(
            position.coords.latitude,
            position.coords.longitude
          )
        );

      }.bind(this), function(error) {
        store.dispatch(
          cityError('DENIED_GEOLOCATION')
        );
      });
    }
  }

  render() {
    return (
      <div className="r-wrapper">
        <div className="search-form__input-wrapper">
          <input type="text" id="city" name="city" value={this.city} className={this.state.searchInputFull ? 'is-valued' : ''} onBlur={this.onBlurPlaceholder.bind(this)} required="required" placeholder="" />
          <span className="search-form__input-info">{locale.SearchFormInputPlaceholder}</span>
        </div>
        <div className="search-form__input-wrapper">
          <a href="javascript:void(0)" className="search-form__geo-button" onClick={this.requestGeoPosition.bind(this)} title={locale.SearchFormGeolocalizeMe}><svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6c-.92-8.34-7.54-14.96-15.88-15.88v-4.12h-4v4.12c-8.34.92-14.96 7.54-15.88 15.88h-4.12v4h4.12c.92 8.34 7.54 14.96 15.88 15.88v4.12h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88h4.12v-4h-4.12zm-17.88 16c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z"/></svg></a>
        </div>
      </div>
    );
  }
}

export default GoogleMap;