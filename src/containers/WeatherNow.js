import { connect } from 'react-redux';
import WeatherNowDisplayer from '../components/WeatherNowDisplayer';

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.weatherReducer.data,
    message: state.cityReducer.message,
    status: state.cityReducer.status
  };
};

const weatherNow = connect(
  mapStateToProps
)(WeatherNowDisplayer);

export default weatherNow;