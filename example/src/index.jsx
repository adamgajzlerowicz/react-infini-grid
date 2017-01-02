import React from 'react';
import {render} from 'react-dom';
import {Grid} from '../../src/Grid';
import {createStore} from 'redux';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

const itemStyle = {
    color: '#FFF9E5',
    textAlign: 'center'
};

const containerStyle = {
    display: 'flex',
    backgroundColor: '#232320',
    height: 240,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10
};

const reducer = (state = {count: 100000}, action) => {
    switch (action.type) {
        case 'SET_ITEM_COUNT':
            return {
                ...state,
                count: action.payload < 0 ? 0: action.payload
            };
        default:
            return state;
    }
};

let store = createStore(reducer);
window.store = store;

const Item = ({id}) => {

    return (
        <div style={containerStyle}>
            <div style={itemStyle}>Item : {id +1}</div>
        </div>
    )
};

const App = ({...props}) => {
    const items = [];
    for (let i = 0; i <= props.count - 1; i++) {
        items.push(<Item id={i}/>);
    }
    const height = window.innerHeight - 140;
    return (
        <div>
            <div>
                <h3>Item count:</h3>
                <input type="text" value={props.count} onChange={(e) => {
                    props.setItemCount(e.target.value);
                }}/>
            </div>
            <Grid items={items} height={height} itemHeight={250} itemWidth={250}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        count: state.count,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setItemCount: (count) => {
            dispatch({type: 'SET_ITEM_COUNT', payload: parseInt(count) >= 0 ? count : 0})
        }

    }
};

export const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps
)(App);

render((
    <div>
        <Provider store={store}>
            <ConnectedApp />
        </Provider>

    </div>
), document.getElementById('app'));

