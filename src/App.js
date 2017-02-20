import React from 'react';

import { store } from './index.js';
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
    return (
      <div className="App">
        <Header />
        
        <SearchForm />

        {this.state.weatherDisplay ? <WeatherForecast store={store} /> : ''}
      </div>
    );
  }
});

export default App;
