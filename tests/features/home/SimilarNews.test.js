import React from 'react';
import { shallow } from 'enzyme';
import { SimilarNews } from '../../../src/features/home/SimilarNews';

describe('home/SimilarNews', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SimilarNews {...props} />
    );

    expect(
      renderedComponent.find('.home-similar-news').length
    ).toBe(1);
  });
});
