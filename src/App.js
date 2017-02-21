import React from 'react';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WeatherForecast from './components/WeatherForecast';

import './styles/App.sass';

const App = React.createClass({

  getInitialState() {
    return {
      version: '0.1.0',
      weatherDisplay: false
    };
  },

  componentDidMount() {
    const { store } = this.props;

    function select(state, value) {
      return state[value];
    };

    var handleChange = function() {
      let currentCity = select(store.getState().cityReducer, 'city');

      if (currentCity !== undefined) this.setState({ weatherDisplay: true });
      else this.setState({ weatherDisplay: false });
    }.bind(this);

    store.subscribe(handleChange);
  },

  render() {
    const props = this.props;
    const { store } = props;

    return (
      <div className="App">
        <Header />
        
        <SearchForm store={store} />

        {this.state.weatherDisplay ? <WeatherForecast store={store} /> : ''}
      </div>
    );
  }
});

export default App;
