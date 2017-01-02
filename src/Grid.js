import React from 'react';
import {render} from 'react-dom';

const NothingToShow = () => {
    let styles = {
        flex: 1,
        textAlign: 'center'
    };

    return (
        <div style={styles} className="nothing-to-see">
            There is nothing to see here
        </div>
    )
};

export class Grid extends React.Component {
    static get propTypes() {
        return {
            items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            height: React.PropTypes.any.isRequired,
            width: React.PropTypes.number,
            itemHeight: React.PropTypes.number,
            itemWidth: React.PropTypes.number
        }
    }

    constructor(props) {
        super(props);

        this.state = {};
        this.state.visibleItems = [];
        this.state.heightOfBefore = 0;
        this.state.heightOfAfter = 0;

        this.gridStyle = {
            display: 'flex',
            flexGrow: 1,
            flexBasis: 1,
            flexWrap: 'wrap',
            height: props.height,
            overflow: 'auto'
        };
        this.itemStyle = {
            flex: '1 0 ' + props.itemHeight + 'px',
            minWidth: props.itemWidth,
            height: props.itemHeight
        };
        this.itemHeight = props.itemHeight;
        this.itemWidth = props.itemWidth;


        this.buildGrid = this.buildGrid.bind(this);
    }

    componentWillUnmount() {
        this.gridContainer.removeEventListener('scroll', this.buildGrid);
    }

    buildGrid() {
        let containerWidth = this.gridContainer.offsetWidth;

        let itemsInRow = Math.floor(containerWidth / this.props.itemWidth);

        let containerHeight = this.gridContainer.offsetHeight;
        let itemsInCol = Math.floor(containerHeight / this.props.itemHeight);

        let totalContainerHeight = this.props.items.length / itemsInRow * this.props.itemHeight;

        let amountScrolled = this.gridContainer.scrollTop;

        let rowsOffset = Math.floor(amountScrolled / this.props.itemHeight);

        let heightOfAfter = totalContainerHeight - ((itemsInRow + rowsOffset) * this.props.itemHeight);
        if (heightOfAfter < 0) heightOfAfter = 0;

        this.setState({
            visibleItems: this.props.items.slice(rowsOffset * itemsInRow, (itemsInCol + 2 + rowsOffset) * itemsInRow),
            heightOfAfter: heightOfAfter,
            heightOfBefore: rowsOffset * this.props.itemHeight
        })
    }

    componentDidMount() {
        this.buildGrid();
        this.gridContainer.addEventListener('scroll', this.buildGrid);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        }, () => {
            this.buildGrid();
            this.gridContainer.scrollTop = 0;
        })
    }

    render() {
        let itemsToShow = this.state.visibleItems.map((item) => {
            return (
                <div key={Math.random()} style={this.itemStyle} ref={(item) => {
                    if (!this.gridItem) this.gridItem = item;
                }}>
                    {item}
                </div>
            )
        });
        return (
            <div style={this.gridStyle} ref={(item) => {
                this.gridContainer = item;
            }}>
                <div style={{flex: '1 1 100%', height: this.state.heightOfBefore}}></div>
                {itemsToShow.length > 0 ? itemsToShow : <NothingToShow />}
                <div style={{flex: '1 1 100%', height: this.state.heightOfAfter}}></div>
            </div>
        )
    }
}