import React from "react";
import renderer from "react-test-renderer";
import App from './app';

describe('App', () => {
  
  const component = renderer.create(<App />);
  const tree = component.toJSON();

  it('renders without crashing', () => {
    expect(tree).toBeTruthy();
  });

  it('has class name', () => {
    expect(tree.props.className).toEqual('App');
  });
  
});
