import React from 'react';
import renderer from 'react-test-renderer';

import NothingToShow from './nothingToShow';

describe('NothingToShow', () => {
  const component = renderer.create(<NothingToShow />);
  const tree = component.toJSON();

  it('renders', () => {
    expect(tree).toBeTruthy();
  });

  it('has class name', () => {
    expect(tree.props.className).toEqual('nothing-to-see');
  });

  it('has styles', () => {
    expect(tree.props.style).toBeTruthy();
  });

  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
