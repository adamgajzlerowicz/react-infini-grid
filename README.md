### What is this?

A grid component with speedy DOM performance. Only items that are visible in the viewport are rendered to DOM, so that thousands of items can be shown in the blink of a eye!

You can see how the grid looks here:
[demo](https://adamgajzlerowicz.github.io/react-infini-grid)

Implemented tiles should have fixed size, which as total with margin and padding, will be specified in as Grid props.

This plugin also knows how to re-render when:

* window size changes
* receives new props (new items)

### Install:

```
yarn add react-infini-grid
```

### Working plug and play usage:

```
import React, { Component } from 'react';
import { render } from 'react-dom';
import Grid from 'react-infini-grid';

const Item = ({ id }) => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        margin: 5,
        color: 'white',
        minWidth: 90,
        height: 90
      }}
    >
      Item : {id + 1}
    </div>
  );
};

const items = Array.from(Array(500)).map((_, i) => <Item id={i} key={i} />);

class App extends Component {
  render() {
    return <Grid itemHeight={100} itemWidth={100} items={items} height={400} />;
  }
}

export default App;

render(<App />, document.getElementById('root'));
```

### Api

| prop       | description                                      |
| ---------- | ------------------------------------------------ |
| items      | jsx components that will be rendered in the grid |
| height     | Height of the grid                               |
| width?     | Width of the grid. This param is optional        |
| itemHeight | Declared height of a tile                        |
| itemWidth  | Declared width of a tile                         |
