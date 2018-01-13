import React from "react";
import { Item } from './components/item';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Grid from './index';
import {calculate} from './utils';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

configure({ adapter: new Adapter() });

const items = Array.from(Array(50)).map((_, i) => <Item id={i} key={i} />);

const getWrapper = () => {
  return mount(<Grid itemHeight={250} itemWidth={250} items={items} height={500} width={400}/>);
};

describe('Grid', () => {
  
  it('renders', () => {
    const wrapper = getWrapper();
    expect(wrapper.length).toBeTruthy();
  });
  
  it('has class name', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid').length).toBeTruthy();
  });
  
  it('has correct wrapper height', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid').props().style.height).toEqual(500);
  });
  
  it('has a ref to the main div', () => {
    const wrapper = getWrapper();
    expect(wrapper.instance().gridElement).toBeTruthy();
  });
  
  it('allows to set width', () => {
    const noWidth = mount(<Grid itemHeight={250} itemWidth={250} items={items} height={500}/>); 
    expect(noWidth.find('.grid').props().style.width).toEqual('auto');
    
    const withWidth = mount(<Grid itemHeight={250} itemWidth={250} items={items} height={500} width={400}/>); 
    expect(withWidth.find('.grid').props().style.width).toEqual(400);
  });
  
  it('sets wrapper width to state', () => {
    const wrapper = getWrapper();
    expect(wrapper.state().wrapperWidth).toEqual(0);
  });
  
  it('sets wrapper height to state', () => {
    const wrapper = getWrapper();
    expect(wrapper.state().wrapperHeight).toEqual(0);
  });
  
  
  
  it('sets items count on mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.state().itemsCount).toEqual(50);
  });
  
  it('sets rest of data on mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.state().itemsCount).toEqual(50);
    expect(wrapper.state().itemWidth).toEqual(250);
    expect(wrapper.state().itemHeight).toEqual(250);
  });
  
  it('contains inner div', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid .grid-inner').length).toBeTruthy();
  }); 
  
  it('each child contains a wrapper', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid .grid-inner .item-wrapper').length).toEqual(wrapper.find('.grid .grid-inner .item-outer').length);
  }); 
  
  it('sets inner height based on amount of items', () => {
    const wrapper = mount(<Grid itemHeight={250} itemWidth={250} items={items} height={500} width={500}/>); 
    wrapper.setState({ wrapperWidth: 500, wrapperHeight: 500 });
    expect(wrapper.find('.grid .grid-inner').props().style.height).toEqual(6250);
  });
  
  it('should contain styles for mobile', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid').props().style.WebkitOverflowScrolling).toBeTruthy();
  });
  
  it('should display some children in inner container', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.grid .grid-inner .item-outer').length).toBeGreaterThan(1); 
  });
  
  it('adds listener on scroll', () => {
    const wrapper = getWrapper();
    const spy = jest.spyOn(calculate, 'itemsInRow');
    const el = wrapper.find('.grid').instance();
    el.dispatchEvent(new window.Event('scroll'));
    expect(spy).toBeCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  
  it('updates grid on new props', () => {
    const wrapper = getWrapper();
    const spy = jest.spyOn(calculate, 'itemsInRow');
    const el = wrapper.instance();
    el.componentWillReceiveProps({items});
    expect(spy).toBeCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  
  it('should scroll up on new props', () => {
    const wrapper = getWrapper();
    const el = wrapper.instance(); 
    el.gridElement.scrollTop = 200;
    el.componentWillReceiveProps({ items }); 
    expect(el.gridElement.scrollTop).toBe(0);
  });
  
  it('shows space-before item', () => {
    expect(getWrapper().find('.grid .space-before').length).toBe(1); 
  });
  
  it('shows space-after item', () => {
    expect(getWrapper().find('.grid .space-after').length).toBe(1); 
  });
  
  it('shows NothingToSeeComponent ', () => {
    const wrapper = mount(<Grid itemHeight={250} itemWidth={250} items={[]} height={500} width={400} />);
    expect(wrapper.html()).toContain('nothing');
  });
  
});

