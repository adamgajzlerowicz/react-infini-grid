## ReactGrid

A fast grid, that shows only items that are in current Viewport, allowing to add thousands of items to the page and it will render in a blink of a eye!


[demo](https://adamgajzlerowicz.github.io/ReactGrid)

install:
```
npm install --save react-grid
```

usage: 
```
import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-grid';

const items = [];
for (let i = 0; i <= 500; i++) {
    items.push(<Item id={i}/>);
}

render((
    <Grid items={items} height={500} itemHeight={250} itemWidth={250}/>
), document.getElementById('app'));
```

