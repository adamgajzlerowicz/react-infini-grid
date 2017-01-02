'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NoItems = function NoItems() {

    return _react2['default'].createElement(
        'div',
        {
            key: null,
            className: 'item item-no-results'
        },
        'No results found'
    );
};

var Presentation = function Presentation(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var topBar = void 0;
    var visibleItems = Object.keys(props.visibleItems).map(function (item) {
        return _react2['default'].createElement(
            'div',
            {
                onClick: function () {
                    function onClick() {
                        props.submit({
                            selected: item,
                            selectedItemLabel: props.items[item]
                        });
                        focus();
                    }

                    return onClick;
                }(),
                key: item,
                className: item == props.currentlyHighlighted ? 'item item-selected' : 'item'
            },
            props.items[item]
        );
    });
    var focus = function focus() {
        if (topBar) topBar.focus();
    };
    return _react2['default'].createElement(
        'div',
        {
            className: 'select-react-redux-container',
            ref: function () {
                function ref(input) {
                    if (props.initialRender && input) {
                        props.initialRenderFalse();
                        document.addEventListener('click', function (event) {
                            if (!input.contains(event.target)) {
                                props.refresh();
                            }
                        });
                    }
                }

                return ref;
            }() },
        _react2['default'].createElement(
            'a',
            {
                tabIndex: props.tabIndex,
                onClick: props.topBarOnClick,
                onKeyPress: props.linkOnKeyPress,
                autoFocus: true,
                onKeyDown: function () {
                    function onKeyDown(e) {
                        if (e.key.indexOf('Arrow') == 0) {
                            props.linkOnKeyPress(e);
                        }
                    }

                    return onKeyDown;
                }(),
                className: props.open ? 'selected selected-open' : 'selected',
                ref: function () {
                    function ref(input) {
                        if (input && props.open) {
                            topBar = input;
                            focus();
                        }
                    }

                    return ref;
                }()
            },
            _react2['default'].createElement(
                'div',
                {
                    className: Object.keys(props.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar' },
                Object.keys(props.items).length == 0 ? 'No options available' : props.selectedItemLabel ? props.selectedItemLabel : 'Please select...'
            )
        ),
        _react2['default'].createElement(
            'div',
            { className: props.open ? 'results-container open' : 'results-container' },
            _react2['default'].createElement(
                'div',
                { className: 'input-container' },
                _react2['default'].createElement('input', {
                    type: 'text',
                    autoCorrect: 'off',
                    autoCapitalize: 'off',
                    spellCheck: 'false',
                    autoComplete: 'off',
                    ref: function () {
                        function ref(item) {
                            if (item && props.open) {
                                item.focus();
                            }
                        }

                        return ref;
                    }(),
                    value: props.visibilityFilter,
                    onKeyPress: function () {
                        function onKeyPress(e) {
                            if (e.key === 'Enter' && props.open) {
                                props.submit({
                                    selected: props.currentlyHighlighted,
                                    selectedItemLabel: props.items[props.currentlyHighlighted]
                                });
                                focus();
                                e.preventDefault();
                                return false;
                            }
                        }

                        return onKeyPress;
                    }(),
                    onChange: props.inputOnChange,
                    onKeyDown: function () {
                        function onKeyDown(e) {
                            props.inputOnKeyDown(e);
                            if (e.key == 'Escape') {
                                focus();
                            }
                        }

                        return onKeyDown;
                    }()
                })
            ),
            visibleItems.length > 0 ? visibleItems : _react2['default'].createElement(NoItems, null)
        )
    );
};

var Stateless = function Stateless(_ref2) {
    var items = _ref2.items,
        _ref2$selected = _ref2.selected,
        selected = _ref2$selected === undefined ? null : _ref2$selected,
        _ref2$tabIndex = _ref2.tabIndex,
        tabIndex = _ref2$tabIndex === undefined ? null : _ref2$tabIndex,
        onChange = _ref2.onChange;


    var store = (0, _redux.createStore)(_reducers.reducers);

    store.dispatch({ type: '@@redux/INIT' });

    window.store = store;

    store.dispatch({ type: _actions2['default'].SET_ITEMS, payload: items });

    if (selected) {
        store.dispatch({
            type: _actions2['default'].SET_SELECTED, payload: {
                selected: selected,
                selectedItemLabel: items[selected]
            }
        });
    }

    if (tabIndex) {
        store.dispatch({ type: _actions2['default'].SET_TABINDEX, payload: tabIndex });
    }

    var mapStateToProps = function mapStateToProps() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return state;
    };

    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return {
            submit: function () {
                function submit(item) {
                    if (item.selected) {
                        dispatch({ type: _actions2['default'].SET_SELECTED, payload: item });
                        dispatch({ type: _actions2['default'].SET_OPEN, payload: false });
                        dispatch({ type: _actions2['default'].SET_FILTER, payload: '' });
                        onChange(item.selected);
                    }
                }

                return submit;
            }(),
            linkOnKeyPress: function () {
                function linkOnKeyPress(e) {
                    if (e.key != 'Escape') {
                        dispatch({ type: _actions2['default'].SET_OPEN, payload: true });
                        dispatch({ type: _actions2['default'].SET_FILTER, payload: '' });
                    }
                }

                return linkOnKeyPress;
            }(),

            inputOnChange: function () {
                function inputOnChange(e) {
                    dispatch({ type: _actions2['default'].SET_FILTER, payload: e.target.value });
                }

                return inputOnChange;
            }(),
            inputOnKeyDown: function () {
                function inputOnKeyDown(e) {
                    if (e.key === 'ArrowDown') {
                        dispatch({ type: _actions2['default'].SET_NEXT_HIGHLIGHTED, payload: false });
                    }

                    if (e.key === 'ArrowUp') {
                        dispatch({ type: _actions2['default'].SET_PREV_HIGHLIGHTED, payload: false });
                    }

                    if (e.key === 'Escape') {
                        dispatch({ type: _actions2['default'].SET_OPEN, payload: false });
                        dispatch({ type: _actions2['default'].SET_FILTER, payload: '' });
                    }
                }

                return inputOnKeyDown;
            }(),
            topBarOnClick: function () {
                function topBarOnClick(e) {
                    dispatch({ type: _actions2['default'].TOGGLE_OPEN });
                }

                return topBarOnClick;
            }(),

            initialRenderFalse: function () {
                function initialRenderFalse() {
                    dispatch({ type: _actions2['default'].SET_INITIAL_RENDER_FALSE });
                }

                return initialRenderFalse;
            }(),
            refresh: function () {
                function refresh() {
                    dispatch({ type: _actions2['default'].SET_OPEN, payload: false });
                    dispatch({ type: _actions2['default'].SET_FILTER, payload: '' });
                }

                return refresh;
            }()
        };
    };

    var SelectWithStore = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Presentation);

    return _react2['default'].createElement(SelectWithStore, { store: store });
};

var Select = exports.Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));
    }

    _createClass(Select, [{
        key: 'shouldComponentUpdate',
        value: function () {
            function shouldComponentUpdate(newProps) {
                return JSON.stringify(newProps.items) != JSON.stringify(this.props.items);
            }

            return shouldComponentUpdate;
        }()
    }, {
        key: 'render',
        value: function () {
            function render() {
                return _react2['default'].createElement(Stateless, this.props);
            }

            return render;
        }()
    }]);

    return Select;
}(_react2['default'].Component);