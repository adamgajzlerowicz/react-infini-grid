import React from 'react';
import {render} from 'react-dom';
import {Select} from '../src';
import {createStore, applyMiddleware} from 'redux';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';


const items = {
    'item1': 'Mercedes-benz GLE',
    'item2': 'Mazda 6',
    'item3': 'Mazda 3',
    'item4': 'Rover Discovery Sport'
};



const reducer = (state = {item: ''}, action) => {
    let newVar = {
        ...state,
        item: action.payload
    };
    console.log(newVar);
    return newVar;
};

let store = createStore(reducer);
window.store2 = store;

const App = ({...props}) => {
    console.log(props);
    const onChange = (val) => {
        props.foo(val);
    };
    return (
        <div>
            <Select items={items} onChange={onChange} tabIndex="2" selected={props.selected}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        selected: state.selected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        foo: (item)=> {
            dispatch({type: 'kjhsdfkjhgsdfkjh', payload: item})
        }

    }
};

export const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps
)(App);

render((
    <div>
        <Provider store={store}>
            <Grid items={items} height={height} itemHeight={250} itemWidth={250}/>
        </Provider>

    </div>
), document.getElementById('app'));

