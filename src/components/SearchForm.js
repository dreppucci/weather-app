import React, { PropTypes } from 'react';

import GoogleMap from './GoogleMap';
import CityName from '../containers/CityName';

import { locale } from './../index.js';

class SearchForm extends React.Component {

  render() {
    return (
      <div className="search-form">
        <h2>{locale.SearchFormTitle}</h2>
        <p>{locale.SearchFormIntro}</p>
        <form method="POST" action="javascript:void(0)">
          <fieldset>
            <div className="search-form__field-row">
              <GoogleMap />
            </div>
            <div className="search-form__field-row">
              <CityName />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SearchForm;