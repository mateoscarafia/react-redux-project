import React from 'react';
import { shallow } from 'enzyme';
import { Wewoordi } from '../../../src/features/home/Wewoordi';

describe('home/Wewoordi', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Wewoordi {...props} />
    );

    expect(
      renderedComponent.find('.home-wewoordi').length
    ).toBe(1);
  });
});
