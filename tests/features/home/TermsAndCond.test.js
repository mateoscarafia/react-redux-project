import React from 'react';
import { shallow } from 'enzyme';
import { TermsAndCond } from '../../../src/features/home/TermsAndCond';

describe('home/TermsAndCond', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TermsAndCond {...props} />
    );

    expect(
      renderedComponent.find('.home-terms-and-cond').length
    ).toBe(1);
  });
});
