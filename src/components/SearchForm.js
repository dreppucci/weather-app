import React, { PropTypes } from 'react';

import GoogleMap from './GoogleMap';
import CityName from '../containers/CityName';

const __LANG = navigator.language !== 'en-US' ? 'en-US' : navigator.language;
const locale = require('./../locale/' + __LANG + '.json');

class SearchForm extends React.Component {

  componentDidMount() {
    const { store } = this.props;
  }

  render() {
    const props = this.props;
    const { store } = props;

    return (
      <div className="search-form">
        <h2>{locale.SearchFormTitle}</h2>
        <p>{locale.SearchFormIntro}</p>
        <form method="POST" action="javascript:void(0)">
          <fieldset>
            <div className="search-form__field-row">
              <GoogleMap store={store} />
            </div>
            <div className="search-form__field-row">
              <CityName store={store} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SearchForm;