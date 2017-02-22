import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import SearchForm from './../components/SearchForm.js';
import cityReducer from './../reducers/cityReducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SearchForm', () => {
  let SearchFormComponent;

  beforeEach(() => {
  	const store = mockStore({ cityReducer });
    SearchFormComponent = mount(<SearchForm store={store} />);
  });

  it('renders nested components', () => {
    expect(SearchFormComponent.find('GoogleMap').length).toEqual(1);
  });
});