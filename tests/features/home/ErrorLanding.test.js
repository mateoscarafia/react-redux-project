import React from 'react';
import { shallow } from 'enzyme';
import { ErrorLanding } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ErrorLanding />);
  expect(renderedComponent.find('.home-error-landing').length).toBe(1);
});
