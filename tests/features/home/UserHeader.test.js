import React from 'react';
import { shallow } from 'enzyme';
import { UserHeader } from '../../../src/features/home/UserHeader';

describe('home/UserHeader', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserHeader {...props} />
    );

    expect(
      renderedComponent.find('.home-user-header').length
    ).toBe(1);
  });
});
