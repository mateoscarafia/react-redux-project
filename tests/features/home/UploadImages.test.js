import React from 'react';
import { shallow } from 'enzyme';
import { UploadImages } from '../../../src/features/home/UploadImages';

describe('home/UploadImages', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UploadImages {...props} />
    );

    expect(
      renderedComponent.find('.home-upload-images').length
    ).toBe(1);
  });
});
