import React from 'react';
import { shallow } from 'enzyme';
import { TextEditor } from '../../../src/features/home/TextEditor';

describe('home/TextEditor', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TextEditor {...props} />
    );

    expect(
      renderedComponent.find('.home-text-editor').length
    ).toBe(1);
  });
});
