## ReactGrid

A fast grid, that shows only items that are in current Viewport, allowing to add thousands of items to the page and it will render in a blink of a eye!


[demo](https://adamgajzlerowicz.github.io/ReactGrid)

The grid will allow you expect you to implement on your own the internals of the shown tailes. After you specify their target size, you need to make sure that they retain it.  

install:
```
npm install --save react-infini-grid
```

usage: 
```
import React from 'react';
import {render} from 'react-dom';
import {Grid} from 'react-infini-grid';

const Item = ({id}) => {
    return (
        <div style={containerStyle}>
            <div style={itemStyle}>Item : {id +1}</div>
        </div>
    )
};

const items = [];
for (let i = 0; i <= 500; i++) {
    items.push(<Item id={i}/>);
}

render((
    <Grid items={items} height={500} itemHeight={250} itemWidth={250}/>
), document.getElementById('app'));
```

