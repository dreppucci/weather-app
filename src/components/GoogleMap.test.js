import React from 'react';
import ReactTestUtils from 'react-addons-test-utils'
import GoogleMap from './GoogleMap';
import { shallow } from 'enzyme';

jest.dontMock('./GoogleMap');
let renderer, wrapper;

describe('GoogleMap', function() {
  beforeEach(function() {
    renderer = ReactTestUtils.createRenderer(),
      wrapper = shallow(<GoogleMap />);
  });

  it('renders without crashing', () => {
    renderer.render(<GoogleMap />);
    const result = renderer.getRenderOutput();
  });

  it('Loads GoogleMaps API when component mounts', () => {
    wrapper.instance().componentDidMount();
  });

  it('Change input search', () => {
    renderer.render(<GoogleMap />);
    const result = renderer.getRenderOutput();
    const input = result.props.children[0].props.children[0];
    /*console.log(input);
    input.value = 'Miami';
    input.value = 'Miami';

    ReactTestUtils.Simulate.change(input);
    ReactTestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});*/
  });

  it('Request geolocation', () => {
    wrapper.instance().requestGeoPosition();
  });
});