import { connect } from 'react-redux';
import { updateWeatherType } from '../actions/weather';
import WeatherForecastTypeDisplayer from '../components/WeatherForecastTypeDisplayer';

const mapStateToProps = (state, ownProps) => {
  return {
    type: state.weatherTypeReducer.type,
    tab: state.weatherTypeReducer.tab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (tab) => {
      dispatch(updateWeatherType(tab));
      return tab;
    }
  };
};

const weatherForecastType = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherForecastTypeDisplayer);

export default weatherForecastType;