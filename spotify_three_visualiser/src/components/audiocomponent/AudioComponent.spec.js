import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import AudioComponent from './index';

describe('AudioComponent', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AudioComponent />);
  })

  it('AudioComponent should render', () => {
    expect(wrapper).to.have.length(1);
  });

  it('AudioComponent should render both SongControls and VolumeControls', () => {
    const wrapper = shallow(<AudioComponent />);
    expect(wrapper.children()).to.have.length(2);
  });

});
