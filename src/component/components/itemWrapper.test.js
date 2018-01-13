import React from 'react';
import renderer from 'react-test-renderer';

import ItemWrapper from './itemWrapper';

describe('ItemWrapper', () => {
  const Child = () => {
    return <div>blah</div>;
  };

  const component = renderer.create(
    <ItemWrapper height={250} itemsInRow={4} child={<Child />} />
  );
  const tree = component.toJSON();

  it('renders', () => {
    expect(tree).toBeTruthy();
  });

  it('renders child', () => {
    expect(tree.children[0].children[0]).toEqual('blah');
  });

  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot();
  });

  it('sets correct styles from props', () => {
    expect(tree.props.style.flexBasis).toEqual(100 / 4 + '%');
    expect(tree.props.style.height).toEqual(250);
  });
});
