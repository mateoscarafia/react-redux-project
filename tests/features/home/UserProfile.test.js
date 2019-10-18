import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile } from '../../../src/features/home/UserProfile';

describe('home/UserProfile', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserProfile {...props} />
    );

    expect(
      renderedComponent.find('.home-user-profile').length
    ).toBe(1);
  });
});
