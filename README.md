### What is this?

A grid component with speedy DOM performance. Only items that are visible in the viewport are rendered to DOM, so that thousands of items can be shown in the blink of a eye!

You can see how the grid looks here:
[demo](https://adamgajzlerowicz.github.io/react-infini-grid)

Implemented tiles should have fixed size, which as total with margin and padding, will be specified in as Grid props.

### install:

```
yarn add react-infini-grid
```

### usage:

```
import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-infini-grid';

const Item = ({id}) => {
    return (
        <div style={itemStyle}>Item : {id +1}</div>
    )
};

// generate grid items
const items = [];
for (let i = 0; i <= 500; i++) {
    items.push(<Item id={i}/>);
}

render((
    <Grid items={items} height={1000} itemHeight={250} itemWidth={250}/>
), document.getElementById('app'));
```

### api

| prop       |
| ---------- |
| items      | jsx components that will be rendered in the grid |
| height     | Height of the grid |
| width?     | Width of the grid. This param is optional |
| itemHeight | Declared height of a tile |
| itemWidth  | Declared width of a tile |
