import { connect } from 'react-redux';
import * as weather from '../actions/weather';
import WeatherNextDisplayer from '../components/WeatherNextDisplayer';

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.weatherReducer.data,
    type: state.weatherTypeReducer.tab,
    message: state.weatherReducer.message,
    status: state.weatherReducer.status
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const country = ownProps.store.getState().cityReducer.country,
    state = ownProps.store.getState().cityReducer.state,
    city = ownProps.store.getState().cityReducer.city,
    lat = ownProps.store.getState().cityReducer.lat,
    lng = ownProps.store.getState().cityReducer.lng;

  dispatch(
    weather.getNext(
      country,
      state,
      city,
      lat,
      lng
    )
  );

  return {};
};

const weatherNext = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherNextDisplayer);

export default weatherNext;