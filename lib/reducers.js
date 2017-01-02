'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var reducers = exports.reducers = function reducers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case '@@redux/INIT':
            {
                return {
                    open: false,
                    initialRender: true,
                    visibilityFilter: ''
                };
            }
        case 'SET_ITEMS':
            {
                return Object.assign({}, state, {
                    items: action.payload,
                    visibleItems: action.payload

                });
            }
        case 'SET_FILTER':
            {
                var _ret = function () {
                    var visibleItems = {};
                    Object.keys(state.items).map(function (key) {
                        if (!action.payload || state.items[key].toLowerCase().indexOf(action.payload.toLowerCase().trim()) !== -1) {
                            visibleItems[key] = state.items[key];
                        }
                    });

                    return {
                        v: Object.assign({}, state, {
                            visibilityFilter: action.payload,
                            visibleItems: visibleItems,
                            currentlyHighlighted: state.open ? Object.keys(visibleItems)[0] || '' : ''
                        })
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        case 'TOGGLE_OPEN':
            {
                return Object.assign({}, state, {
                    open: !state.open,
                    currentlyHighlighted: !state.open ? Object.keys(state.visibleItems)[0] || '' : ''
                });
            }

        case 'SET_OPEN':
            {
                return Object.assign({}, state, {
                    open: action.payload,
                    currentlyHighlighted: action.payload ? Object.keys(state.visibleItems)[0] || '' : ''
                });
            }

        case 'SET_NEXT_HIGHLIGHTED':
            {
                var keys = Object.keys(state.visibleItems);
                var currentIndex = keys.indexOf(state.currentlyHighlighted);

                var newIndex = 0;
                if (currentIndex < keys.length - 1 && currentIndex != -1) {
                    newIndex = currentIndex + 1;
                }
                return Object.assign({}, state, {
                    currentlyHighlighted: keys[newIndex]
                });
            }

        case 'SET_PREV_HIGHLIGHTED':
            {
                var _keys = Object.keys(state.visibleItems);
                var _currentIndex = _keys.indexOf(state.currentlyHighlighted);

                var _newIndex = 0;
                if (_currentIndex > 0) {
                    _newIndex = _currentIndex - 1;
                }

                return Object.assign({}, state, {
                    currentlyHighlighted: _keys[_newIndex]
                });
            }

        case 'SET_HIGHLIGHTED':
            {
                return Object.assign({}, state, {
                    currentlyHighlighted: action.payload
                });
            }

        case 'SET_SELECTED':
            {
                return Object.assign({}, state, {
                    currentlyHighlighted: action.payload.selected,
                    selected: action.payload.selected,
                    selectedItemLabel: action.payload.selectedItemLabel
                });
            }

        case 'SET_TABINDEX':
            {
                return Object.assign({}, state, {
                    tabIndex: action.payload
                });
            }
        case 'SET_INITIAL_RENDER_FALSE':
            {
                return Object.assign({}, state, {
                    initialRender: false
                });
            }
    }

    return state;
};