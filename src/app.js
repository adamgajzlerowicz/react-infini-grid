// @flow

import React from 'react';
import './component/components/grid.css';
import Grid from './component';
import { Item } from './component/components/item';

import type { Element } from 'react';

type AppStateType = {
  items: Element<*>[],
};

class App extends React.Component<{}, AppStateType> {
  generateItems(amount: number): void {
    this.setState({
      items: Array.from(Array(amount)).map((_, i) => <Item id={i} key={i} />),
    });
  }

  state = {
    items: [],
  };

  componentWillMount() {
    this.generateItems(100);
  }

  render() {
    const height = window.innerHeight - 300;
    return (
      <div className="App">
        <div className="header">
          <div className="left">
            <div className="description">
              <h1>react-infini-grid</h1>
              <p>
                React infinity scroll Component, that renders only tiles that
                are visible in viewport. It is a data presentation table that
                scales! Usage:
              </p>
              <pre style={{ backgroundColor: '#eff0f1' }}>
                {`yarn add react-infini-grid`}
              </pre>
              <pre style={{ backgroundColor: '#eff0f1' }}>
                {`<Grid itemHeight={250} itemWidth={250} items={items} height={height} />`}
              </pre>
            </div>
            <div className="buttons">
              <p style={{ marginTop: 60 }}>
                See it in action. Press a button to generate random items:
              </p>
              <button onClick={() => this.generateItems(0)}> 0 </button>
              <button onClick={() => this.generateItems(1)}> 1 </button>
              <button onClick={() => this.generateItems(4)}> 4 </button>
              <button onClick={() => this.generateItems(19)}> 19 </button>
              <button onClick={() => this.generateItems(200)}> 200 </button>
              <button onClick={() => this.generateItems(100000)}>100000</button>
            </div>
          </div>
          <div className="icons">
            <a href="https://www.npmjs.com/package/react-infini-grid">
              <i className="mdi mdi-npm" />
            </a>
            <a href="https://github.com/adamgajzlerowicz/react-infini-grid">
              <i className="mdi mdi-github-box" />
            </a>
          </div>
        </div>
        <Grid
          itemHeight={250}
          itemWidth={250}
          items={this.state.items}
          height={height}
        />
      </div>
    );
  }
}

export default App;
