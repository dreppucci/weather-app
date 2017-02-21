// __mocks__/geolocation.js
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

export default window.navigator = {
  geolocation: {
    getCurrentPosition() {
      return Geoposition;
    }
  }
};