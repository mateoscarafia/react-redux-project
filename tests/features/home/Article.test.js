import React from 'react';
import { shallow } from 'enzyme';
import { Article } from '../../../src/features/home/Article';

describe('home/Article', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Article {...props} />
    );

    expect(
      renderedComponent.find('.home-article').length
    ).toBe(1);
  });
});
