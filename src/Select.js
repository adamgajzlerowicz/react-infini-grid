import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {createStore} from 'redux';
import actions from './actions';
import {reducers} from './reducers';


const NoItems = () => {

    return (
        <div
            key={null}
            className="item item-no-results"
        >No results found</div>
    );
};

const Presentation = ({...props}) => {
    let topBar;
    const visibleItems = Object.keys(props.visibleItems).map((item) => {
        return (
            <div
                onClick={() => {
                    props.submit({
                        selected: item,
                        selectedItemLabel: props.items[item]
                    });
                    focus();
                }}
                key={item}
                className={
                    (item == props.currentlyHighlighted) ? 'item item-selected' : 'item'
                }
            >
                {props.items[item]}
            </div>
        )

    });
    const focus = () => {
        if (topBar)
            topBar.focus();
    };
    return (
        <div
            className="select-react-redux-container"
            ref={(input) => {
                if (props.initialRender && input) {
                    props.initialRenderFalse();
                    document.addEventListener('click', function (event) {
                        if (!input.contains(event.target)) {
                            props.refresh();
                        }
                    });

                }

            }}>
            <a
               tabIndex={props.tabIndex}
               onClick={props.topBarOnClick}
               onKeyPress={props.linkOnKeyPress}
               autoFocus
               onKeyDown={e => {
                   if (e.key.indexOf('Arrow') == 0) {
                       props.linkOnKeyPress(e)
                   }
               }}
               className={props.open ? 'selected selected-open' : 'selected'}
               ref={function (input) {
                   if (input && props.open) {
                       topBar = input;
                       focus();
                   }
               }}
            >
                <div
                    className={Object.keys(props.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar'}>
                    { Object.keys(props.items).length == 0 ? 'No options available' :
                        props.selectedItemLabel
                            ? props.selectedItemLabel
                            : 'Please select...'}
                </div>
            </a>

            <div className={props.open ? 'results-container open' : 'results-container' }>
                <div className="input-container">
                    <input
                        type="text"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        autoComplete="off"
                        ref={(item) => {
                            if (item && props.open) {
                                item.focus()
                            }
                        }}
                        value={props.visibilityFilter}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && props.open) {
                                props.submit({
                                    selected: props.currentlyHighlighted,
                                    selectedItemLabel: props.items[props.currentlyHighlighted]
                                });
                                focus();
                                e.preventDefault();
                                return false;
                            }
                        }}
                        onChange={props.inputOnChange}
                        onKeyDown={(e) => {
                            props.inputOnKeyDown(e);
                            if (e.key == 'Escape') {
                                focus();
                            }
                        }}
                    />
                </div>
                {visibleItems.length > 0 ? visibleItems : <NoItems/>}
            </div>
        </div>
    );
};

const Stateless = ({items, selected = null, tabIndex = null, onChange}) => {

    const store = createStore(reducers);

    store.dispatch({type: '@@redux/INIT'});

    window.store = store;

    store.dispatch({type: actions.SET_ITEMS, payload: items});

    if (selected) {
        store.dispatch({
            type: actions.SET_SELECTED, payload: {
                selected: selected,
                selectedItemLabel: items[selected]
            }
        });
    }

    if (tabIndex) {
        store.dispatch({type: actions.SET_TABINDEX, payload: tabIndex})
    }

    const mapStateToProps = (state = {}) => {
        return state;
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            submit: (item) => {
                if (item.selected) {
                    dispatch({type: actions.SET_SELECTED, payload: item});
                    dispatch({type: actions.SET_OPEN, payload: false});
                    dispatch({type: actions.SET_FILTER, payload: ''});
                    onChange(item.selected);
                }
            },
            linkOnKeyPress: (e) => {
                if (e.key != 'Escape') {
                    dispatch({type: actions.SET_OPEN, payload: true});
                    dispatch({type: actions.SET_FILTER, payload: ''});
                }
            },

            inputOnChange: (e) => {
                dispatch({type: actions.SET_FILTER, payload: e.target.value})
            },
            inputOnKeyDown: (e) => {
                if (e.key === 'ArrowDown') {
                    dispatch({type: actions.SET_NEXT_HIGHLIGHTED, payload: false})
                }

                if (e.key === 'ArrowUp') {
                    dispatch({type: actions.SET_PREV_HIGHLIGHTED, payload: false})
                }

                if (e.key === 'Escape') {
                    dispatch({type: actions.SET_OPEN, payload: false});
                    dispatch({type: actions.SET_FILTER, payload: ''});
                }
            },
            topBarOnClick: (e) => {
                dispatch({type: actions.TOGGLE_OPEN});
            },

            initialRenderFalse: () => {
                dispatch({type: actions.SET_INITIAL_RENDER_FALSE});
            },
            refresh: () => {
                dispatch({type: actions.SET_OPEN, payload: false});
                dispatch({type: actions.SET_FILTER, payload: ''});
            }
        }
    };

    const SelectWithStore = connect(
        mapStateToProps,
        mapDispatchToProps
    )(Presentation);

    return (
        <SelectWithStore store={store}/>
    )
};


export class Select extends React.Component {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(newProps) {
        return JSON.stringify(newProps.items) != JSON.stringify(this.props.items);
    }


    render() {
        return (
            <Stateless {...this.props} />
        )
    }
}