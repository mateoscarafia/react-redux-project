import React from 'react';
import { shallow } from 'enzyme';
import { SearchEngine } from '../../../src/features/home/SearchEngine';

describe('home/SearchEngine', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SearchEngine {...props} />
    );

    expect(
      renderedComponent.find('.home-search-engine').length
    ).toBe(1);
  });
});
