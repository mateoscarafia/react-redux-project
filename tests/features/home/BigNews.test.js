import React from 'react';
import { shallow } from 'enzyme';
import { BigNews } from '../../../src/features/home/BigNews';

describe('home/BigNews', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BigNews {...props} />
    );

    expect(
      renderedComponent.find('.home-big-news').length
    ).toBe(1);
  });
});
