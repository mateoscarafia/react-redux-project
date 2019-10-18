import React from 'react';
import { shallow } from 'enzyme';
import { BannerMidd } from '../../../src/features/home/BannerMidd';

describe('home/BannerMidd', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BannerMidd {...props} />
    );

    expect(
      renderedComponent.find('.home-banner-midd').length
    ).toBe(1);
  });
});
