'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Grid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NothingToShow = function NothingToShow() {
    var styles = {
        flex: 1,
        textAlign: 'center'
    };

    return _react2['default'].createElement(
        'div',
        { style: styles, className: 'nothing-to-see' },
        'There is nothing to see here'
    );
};

var Grid = exports.Grid = function (_React$Component) {
    _inherits(Grid, _React$Component);

    _createClass(Grid, null, [{
        key: 'propTypes',
        get: function () {
            function get() {
                return {
                    items: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.object).isRequired,
                    height: _react2['default'].PropTypes.any.isRequired,
                    width: _react2['default'].PropTypes.number,
                    itemHeight: _react2['default'].PropTypes.number,
                    itemWidth: _react2['default'].PropTypes.number
                };
            }

            return get;
        }()
    }]);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this.state = {};
        _this.state.visibleItems = [];
        _this.state.heightOfBefore = 0;
        _this.state.heightOfAfter = 0;

        _this.gridStyle = {
            display: 'flex',
            flexGrow: 1,
            flexBasis: 1,
            flexWrap: 'wrap',
            height: props.height,
            overflow: 'auto'
        };
        _this.itemStyle = {
            flex: '1 0 ' + props.itemHeight + 'px',
            minWidth: props.itemWidth,
            height: props.itemHeight
        };
        _this.itemHeight = props.itemHeight;
        _this.itemWidth = props.itemWidth;

        _this.buildGrid = _this.buildGrid.bind(_this);
        return _this;
    }

    _createClass(Grid, [{
        key: 'componentWillUnmount',
        value: function () {
            function componentWillUnmount() {
                this.gridContainer.removeEventListener('scroll', this.buildGrid);
            }

            return componentWillUnmount;
        }()
    }, {
        key: 'buildGrid',
        value: function () {
            function buildGrid() {
                var containerWidth = this.gridContainer.offsetWidth;

                var itemsInRow = Math.floor(containerWidth / this.props.itemWidth);

                var containerHeight = this.gridContainer.offsetHeight;
                var itemsInCol = Math.floor(containerHeight / this.props.itemHeight);

                var totalContainerHeight = this.props.items.length / itemsInRow * this.props.itemHeight;

                var amountScrolled = this.gridContainer.scrollTop;

                var rowsOffset = Math.floor(amountScrolled / this.props.itemHeight);

                var heightOfAfter = totalContainerHeight - (itemsInRow + rowsOffset) * this.props.itemHeight;
                if (heightOfAfter < 0) heightOfAfter = 0;

                this.setState({
                    visibleItems: this.props.items.slice(rowsOffset * itemsInRow, (itemsInCol + 2 + rowsOffset) * itemsInRow),
                    heightOfAfter: heightOfAfter,
                    heightOfBefore: rowsOffset * this.props.itemHeight
                });
            }

            return buildGrid;
        }()
    }, {
        key: 'componentDidMount',
        value: function () {
            function componentDidMount() {
                this.buildGrid();
                this.gridContainer.addEventListener('scroll', this.buildGrid);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillReceiveProps',
        value: function () {
            function componentWillReceiveProps(nextProps) {
                var _this2 = this;

                this.setState({
                    items: nextProps.items
                }, function () {
                    _this2.buildGrid();
                    _this2.gridContainer.scrollTop = 0;
                });
            }

            return componentWillReceiveProps;
        }()
    }, {
        key: 'render',
        value: function () {
            function render() {
                var _this3 = this;

                var itemsToShow = this.state.visibleItems.map(function (item) {
                    return _react2['default'].createElement(
                        'div',
                        { key: Math.random(), style: _this3.itemStyle, ref: function () {
                                function ref(item) {
                                    if (!_this3.gridItem) _this3.gridItem = item;
                                }

                                return ref;
                            }() },
                        item
                    );
                });
                return _react2['default'].createElement(
                    'div',
                    { style: this.gridStyle, ref: function () {
                            function ref(item) {
                                _this3.gridContainer = item;
                            }

                            return ref;
                        }() },
                    _react2['default'].createElement('div', { style: { flex: '1 1 100%', height: this.state.heightOfBefore } }),
                    itemsToShow.length > 0 ? itemsToShow : _react2['default'].createElement(NothingToShow, null),
                    _react2['default'].createElement('div', { style: { flex: '1 1 100%', height: this.state.heightOfAfter } })
                );
            }

            return render;
        }()
    }]);

    return Grid;
}(_react2['default'].Component);