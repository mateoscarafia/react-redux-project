import React from 'react';
import { shallow } from 'enzyme';
import { Comments } from '../../../src/features/home/Comments';

describe('home/Comments', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Comments {...props} />
    );

    expect(
      renderedComponent.find('.home-comments').length
    ).toBe(1);
  });
});
