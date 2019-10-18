import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../src/features/home/Register';

describe('home/Register', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Register {...props} />
    );

    expect(
      renderedComponent.find('.home-register').length
    ).toBe(1);
  });
});
