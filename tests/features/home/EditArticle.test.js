import React from 'react';
import { shallow } from 'enzyme';
import { EditArticle } from '../../../src/features/home/EditArticle';

describe('home/EditArticle', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditArticle {...props} />
    );

    expect(
      renderedComponent.find('.home-edit-article').length
    ).toBe(1);
  });
});
