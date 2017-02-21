import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from './../App.js';

describe('App', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('App renders nested components', () => {
    expect(app.find('Header').length).toEqual(1);
    expect(app.find('SearchForm').length).toEqual(1);
  });
});