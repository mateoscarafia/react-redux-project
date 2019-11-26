import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../src/features/home/Footer';

describe('home/Footer', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Footer {...props} />
    );

    expect(
      renderedComponent.find('.home-footer').length
    ).toBe(1);
  });
});
