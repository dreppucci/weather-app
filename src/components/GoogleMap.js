import React from 'react';
import ReactGA from 'react-ga';
import settings from '../settings/keys.json';
import CityName from '../containers/CityName';
import { getGoogleMapsPlaceInfo } from '../containers/GoogleMapPlace';
import * as city from '../actions/city';
import * as weather from '../actions/weather';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');
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
    const { store } = this.props;

    let input = document.getElementById('city'),
      options = {
        types: ['(cities)']
      },
      autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function() {

      store.dispatch( city.remove() );
      store.dispatch( weather.updateType('current') );

      let place = autocomplete.getPlace();

      if (!place.geometry) {

        store.dispatch(
          city.updateStatus('CITY_UNKNOWN')
        );

        ReactGA.exception({
          description: 'CITY_UNKNOWN',
          fatal: true
        });

        return;
      }

      store.dispatch(
        city.print(
          place.name,
          [ getGoogleMapsPlaceInfo(place, 'administrative_area_level_1', 'short_name'), getGoogleMapsPlaceInfo(place, 'administrative_area_level_1', 'long_name')],
          getGoogleMapsPlaceInfo(place, 'country'),
          place.geometry.location.lat(),
          place.geometry.location.lng()
        )
      );

      let GALabelString = place.name+', '+getGoogleMapsPlaceInfo(place, 'administrative_area_level_1', 'short_name')+', '+getGoogleMapsPlaceInfo(place, 'country');

      ReactGA.event({
        category: 'Geolocation',
        action: 'Selected from list',
        label: GALabelString
      });

    }.bind(this));
  }

  onChange(evt) {
    let city = evt.target.value;

    let props = {
      searchInputFull: city.length === 0 ? false : true
    }

    this.setState(props);
  }

  onBlurPlaceholder(evt) {
    this.setState({ searchInputFull: evt.target.value.length === 0 ? false : true });
  }

  requestGeoPosition() {
    const { store } = this.props;
    
    if (navigator.geolocation) {
      store.dispatch( city.remove() );
      store.dispatch( weather.updateType('current') );

      store.dispatch( city.updateStatus('GEOLOCATING_CITY') );

      navigator.geolocation.getCurrentPosition(function(position) {

        store.dispatch( city.updateStatus('FETCHING_CITY') );

        store.dispatch(
          city.get(
            position.coords.latitude,
            position.coords.longitude
          )
        );

        let GALabelString = position.coords.latitude+', '+position.coords.longitude;

        ReactGA.event({
          category: 'Geolocation',
          action: 'Auto-geolocate',
          label: GALabelString
        });

      }.bind(this), function(error) {
        store.dispatch(
          city.updateStatus('DENIED_GEOLOCATION')
        );

        ReactGA.exception({
          description: 'DENIED_GEOLOCATION',
          fatal: true
        });
      });
    }
  }

  render() {

    return (
      <div className="r-wrapper">
        <div className="search-form__input-wrapper">
          <input type="text" id="city" name="city" onChange={this.onChange.bind(this)} className={this.state.searchInputFull ? 'is-valued' : ''} onBlur={this.onBlurPlaceholder.bind(this)} required="required" placeholder="" />
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