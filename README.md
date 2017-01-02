## ReactSelect

A searchable select box, similar to select2.

What is different about this plugin? It doesn't build an underlying select item, but acts like it. 
Behaviour and select action is to be passed as a prop, allowing full compatibility with redux.

[demo](https://adamgajzlerowicz.github.io/ReactSelect/)

install:
```
npm install --save select-react-redux
```

usage: 
```
import React from 'react';
import {render} from 'react-dom';
import Select from 'select-react-redux';

const items = {
    'item1': 'Mercedes Benz C40',
    'item2': 'Mazda 6',
};

const onChange = (val) => {
    console.log(val);
};

render((
    <div>
        <Select items={items} onChange={onChange}/>
    </div>
), document.getElementById('app'));
```

