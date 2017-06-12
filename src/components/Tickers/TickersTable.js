import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Th, Tr, Td } from 'reactable';

export default class TickersTable extends Component {

  static propTypes = {
    tickers: PropTypes.array.isRequired,
    selectedAsset: PropTypes.string.isRequired,
    selectCoin: PropTypes.func.isRequired,
    selectedRow: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Tr.prototype.shouldComponentUpdate = (nextProps) => {
      if (!!this.props.data &&
        (nextProps.data.baseVolume === this.props.data.baseVolume &&
        nextProps.data.last === this.props.data.last)) {
        return false;
      }
      return true;
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.selectedAsset === nextProps.asset;
  }

  tickerRows() {
    const style = require('./Tickers.scss');
    const rows = this.props.tickers.map((ticker) => {
      if (ticker.asset === this.props.selectedAsset) {
        return (
          <Tr
            className={`${this.props.selectedRow === ticker.coin ? style.selectedRow : style.row}`}
            key={ticker.asset + ticker.coin}
            onClick={() => this.props.selectCoin(ticker.coin)}>
            <Td className={`${style.row} ${style.coin}`} column="coin">{ticker.coin}</Td>
            <Td className={`${style.row} ${style.price}`} column="last">
              {+ticker.last.toFixed(8).slice(0, 10)}
            </Td>
            <Td className={`${style.row} ${style.volume}`} column="baseVolume">
              {+ticker.baseVolume.toFixed(2).slice(0, 10)}
            </Td>
            <Td className={`${style.row} ${style.percent}`} column="percentChange">
              {+(ticker.percentChange * 100).toFixed(4).slice(0, 5)}
            </Td>
          </Tr>
        );
      }
      return null;
    });
    return rows;
  }

  render() {
    const style = require('./Tickers.scss');
    const columns = [
      { key: 'coin', label: 'Coin' },
      { key: 'last', label: 'Price' },
      { key: 'baseVolume', label: 'Volume' },
      { key: 'percentChange', label: '±%' },
    ];
    return (
      <Table
        className={`${style.table} table`}
        id="TickersTable"
        columns={columns}
        sortable
        defaultSort={{ column: 'baseVolume', direction: 'desc' }}>
        <Thead className={style.header}>
          <Th className={style.head} column="coin">Coin</Th>
          <Th className={style.head} column="last">Price</Th>
          <Th className={style.head} column="baseVolume">Volume</Th>
          <Th className={style.head} column="percentChange">±%</Th>
        </Thead>
        {this.tickerRows()}
      </Table>
    );
  }
}
