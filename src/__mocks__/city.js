// __mocks__/city.js
const Geoposition = {
  coords: {
    accuracy: 39,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 45.4448551,
    longitude: 9.1521257,
    speed: null
  }
};

export default function get(lat, lng) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      process.nextTick(
        () => users[userID] ? resolve(users[userID]) : reject({
          error: 'User with ' + userID + ' not found.',
        })
      );
    });
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${settings.GoogleMaps}`)
      .then(response => response.json() )
      .then(json => dispatch(recoverCity(lat, lng, json)))
      .catch(error => dispatch(recoverCityError(error)));
  };
};