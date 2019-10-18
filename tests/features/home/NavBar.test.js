import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../../../src/features/home/NavBar';

describe('home/NavBar', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NavBar {...props} />
    );

    expect(
      renderedComponent.find('.home-nav-bar').length
    ).toBe(1);
  });
});
