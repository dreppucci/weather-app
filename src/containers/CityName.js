import { connect } from 'react-redux';
import CityDisplayer from '../components/CityDisplayer';

const mapStateToProps = (state, ownProps) => {
  return {
    city: state.cityReducer.city,
    country: state.cityReducer.country,
    lat: state.cityReducer.lat,
    lng: state.cityReducer.lng,
    message: state.cityReducer.message,
    status: state.cityReducer.status
  };
};

const cityName = connect(
  mapStateToProps
)(CityDisplayer);

export default cityName;