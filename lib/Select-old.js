'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDom = require('react-dom');

var Select = exports.Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.getVisibleItems = _this.getVisibleItems.bind(_this);
        _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
        _this.inputOnChange = _this.inputOnChange.bind(_this);
        _this.inputOnKeyPress = _this.inputOnKeyPress.bind(_this);
        _this.inputOnKeyDown = _this.inputOnKeyDown.bind(_this);
        _this.linkOnKeyDown = _this.linkOnKeyDown.bind(_this);
        _this.setNextHighlightedItem = _this.setNextHighlightedItem.bind(_this);
        _this.findIndex = _this.findIndex.bind(_this);
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillMount',
        value: function () {
            function componentWillMount() {
                this.setState({
                    open: false,
                    items: this.props.items ? this.props.items : {},
                    filter: '',
                    selectedItem: '',
                    selectedItemLabel: '',
                    visibleItems: [],
                    tabIndex: this.props.tabIndex ? this.props.tabIndex : null,
                    currentlyHighlighted: ''
                });
                document.addEventListener('click', this.handleOutsideClick, false);
            }

            return componentWillMount;
        }()
    }, {
        key: 'componentDidMount',
        value: function () {
            function componentDidMount() {
                var _this2 = this;

                this.getVisibleItems();
                document.addEventListener('keydown', function (e) {
                    if (e.key === "Escape") {
                        _this2.setState({
                            open: false,
                            filter: ''
                        });
                        _this2.setState({
                            currentlyHighlighted: ''
                        });
                        _this2.getVisibleItems();
                        if (ReactDom.findDOMNode(_this2).contains(e.target)) {
                            _this2.link.focus();
                        }
                    }
                });
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillUnmount',
        value: function () {
            function componentWillUnmount() {
                document.removeEventListener('click', this.handleOutsideClick, false);
            }

            return componentWillUnmount;
        }()
    }, {
        key: 'toggle',
        value: function () {
            function toggle(value) {
                this.setState({
                    open: value
                });
                if (value == false) {
                    this.setState({
                        filter: ''
                    });
                } else {
                    if (this.state.selectedItem) {
                        this.setState({
                            currentlyHighlighted: this.state.selectedItem
                        });
                    }
                }
            }

            return toggle;
        }()
    }, {
        key: 'componentWillReceiveProps',
        value: function () {
            function componentWillReceiveProps(nextProps) {
                var _this3 = this;

                if (nextProps.items !== this.state.items) {
                    this.setState({ items: nextProps.items }, function () {
                        _this3.getVisibleItems();
                    });
                }
            }

            return componentWillReceiveProps;
        }()
    }, {
        key: 'submit',
        value: function () {
            function submit(value) {
                var _this4 = this;

                this.props.onChange(value);
                this.setState({
                    selectedItem: value,
                    selectedItemLabel: this.props.items[value],
                    open: false,
                    currentlyHighlighted: ''
                }, function () {
                    _this4.getVisibleItems();
                });
            }

            return submit;
        }()
    }, {
        key: 'getVisibleItems',
        value: function () {
            function getVisibleItems(isSearching) {
                var _this5 = this;

                var first = true;
                var visibleItems = [];
                Object.keys(this.props.items).forEach(function (key) {
                    if (!_this5.state.filter || _this5.props.items[key].toLowerCase().indexOf(_this5.state.filter.toLowerCase().trim()) !== -1) {
                        var className = '';
                        if (isSearching) {
                            if (first == true) {
                                first = false;
                                className = 'item item-selected';
                                _this5.setState({
                                    currentlyHighlighted: key
                                });
                            } else {
                                className = 'item';
                            }
                        } else {
                            className = key == _this5.state.currentlyHighlighted && _this5.state.selectedItem == '' || key == _this5.state.selectedItem && _this5.state.currentlyHighlighted == '' || _this5.state.currentlyHighlighted != '' && _this5.state.selectedItem != '' && key == _this5.state.currentlyHighlighted ? 'item item-selected' : 'item';
                        }
                        visibleItems.push(_react2['default'].createElement(
                            'div',
                            {
                                onClick: function () {
                                    function onClick() {
                                        _this5.submit(key);
                                    }

                                    return onClick;
                                }(),
                                key: key,
                                className: className
                            },
                            _this5.props.items[key]
                        ));
                    }
                });

                if (visibleItems.length === 0) {
                    visibleItems.push(_react2['default'].createElement(
                        'div',
                        {
                            key: null,
                            className: 'item item-no-results'
                        },
                        'No results found'
                    ));
                    this.setState({
                        currentlyHighlighted: ''
                    });
                }

                this.setState({
                    visibleItems: visibleItems
                });
            }

            return getVisibleItems;
        }()
    }, {
        key: 'handleOutsideClick',
        value: function () {
            function handleOutsideClick(e) {
                var _this6 = this;

                if (!ReactDom.findDOMNode(this).contains(e.target)) {
                    this.setState({
                        open: false,
                        filter: ''
                    }, function () {
                        _this6.getVisibleItems();
                    });
                }
            }

            return handleOutsideClick;
        }()
    }, {
        key: 'findIndex',
        value: function () {
            function findIndex(item) {
                return item.key == this.state.currentlyHighlighted;
            }

            return findIndex;
        }()
    }, {
        key: 'setNextHighlightedItem',
        value: function () {
            function setNextHighlightedItem() {
                var _this7 = this;

                var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var isSearching = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                var currentIndex = this.state.visibleItems.findIndex(this.findIndex);
                var newIndex = 0;
                if (direction == 'down' && currentIndex < this.state.visibleItems.length - 1 && currentIndex != -1) {
                    newIndex = currentIndex + 1;
                } else if (direction == 'up' && currentIndex > 0) {
                    newIndex = currentIndex - 1;
                } else if (!direction) {
                    newIndex = 0;
                }
                this.setState({
                    currentlyHighlighted: this.state.visibleItems[newIndex].key
                }, function () {
                    _this7.getVisibleItems(isSearching);
                });
            }

            return setNextHighlightedItem;
        }()
    }, {
        key: 'inputOnKeyDown',
        value: function () {
            function inputOnKeyDown(e) {
                if (e.key === 'ArrowDown') {
                    this.setNextHighlightedItem('down');
                }

                if (e.key === 'ArrowUp') {
                    this.setNextHighlightedItem('up');
                }
            }

            return inputOnKeyDown;
        }()
    }, {
        key: 'inputOnKeyPress',
        value: function () {
            function inputOnKeyPress(e) {
                if (e.key === 'Esc') {
                    this.toggle(!this.state.open);
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (this.state.currentlyHighlighted != '') {
                        this.submit(this.state.currentlyHighlighted);
                        this.toggle(!this.state.open);
                        this.link.focus();
                    }
                    return false;
                }
            }

            return inputOnKeyPress;
        }()
    }, {
        key: 'inputOnChange',
        value: function () {
            function inputOnChange(e) {
                var _this8 = this;

                this.setState({
                    filter: e.target.value
                }, function () {
                    _this8.setNextHighlightedItem(null, true);
                });
            }

            return inputOnChange;
        }()
    }, {
        key: 'linkOnKeyDown',
        value: function () {
            function linkOnKeyDown(e) {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    this.setState({
                        open: true
                    });
                }
            }

            return linkOnKeyDown;
        }()
    }, {
        key: 'render',
        value: function () {
            function render() {
                var _this9 = this;

                return _react2['default'].createElement(
                    'div',
                    { className: 'select-react-redux-container' },
                    _react2['default'].createElement(
                        'a',
                        { href: '#',
                            tabIndex: this.state.tabIndex,
                            onClick: function () {
                                function onClick() {
                                    _this9.toggle(!_this9.state.open);
                                }

                                return onClick;
                            }(),
                            onKeyPress: function () {
                                function onKeyPress() {
                                    _this9.setState({ open: true });
                                }

                                return onKeyPress;
                            }(),
                            ref: function () {
                                function ref(e) {
                                    _this9.link = e;
                                }

                                return ref;
                            }(),
                            onKeyDown: this.linkOnKeyDown,
                            className: this.state.open ? 'selected selected-open' : 'selected'
                        },
                        _react2['default'].createElement(
                            'div',
                            {
                                className: Object.keys(this.state.items).length == 0 ? 'top-bar top-bar-empty' : 'top-bar' },
                            this.state.selectedItemLabel ? this.state.selectedItemLabel : Object.keys(this.state.items).length == 0 ? 'No options available' : 'Please select...'
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: this.state.open ? 'results-container open' : 'results-container' },
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
                                    function ref(search) {
                                        return search && search.focus();
                                    }

                                    return ref;
                                }(),
                                value: this.state.filter,
                                onKeyPress: this.inputOnKeyPress,
                                onChange: this.inputOnChange,
                                onKeyDown: this.inputOnKeyDown
                            })
                        ),
                        this.state.visibleItems
                    )
                );
            }

            return render;
        }()
    }]);

    return Select;
}(_react2['default'].Component);