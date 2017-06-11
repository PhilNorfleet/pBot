import React, { Component } from 'react';
// import '../../components/Table/Table.scss';
import TickerRow from './TickerRow'
// import { Table } from 'react-bootstrap'
import {Table, Thead, Th, Tbody, Tr, Td} from 'reactable'

export default class TickersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const columns = [
      { key: 'coin', label: 'Coin' },
      { key: 'last', label: 'Price' },
      { key: 'baseVolume', label: 'Volume' },
      { key: 'percentChange', label: '±%' },
    ];
    this.setState({columns: columns})
    Tr.prototype.shouldComponentUpdate = (nextProps, nextState) => {
      if (!!this.props.data &&
        (nextProps.data.baseVolume === this.props.data.baseVolume &&
        nextProps.data.last === this.props.data.last)) {
        return false;
      }
      return true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedAsset === nextProps.asset
  }

  tickerRows() {
    const style = require('./Tickers.scss')
    const rows = this.props.tickers.map((ticker) => {
      if (ticker.asset === this.props.selectedAsset){
        return (
          <Tr
            className={`${style.row}`}
            key={ticker.asset + ticker.coin}>
            <Td className={`${style.row}`} column="coin">{ticker.coin}</Td>
            <Td className={`${style.row} ${style.price}`} column="last">
              {+ticker.last.toFixed(8).slice(0,10)}
            </Td>
            <Td className={`${style.row}`} column="baseVolume">
              {+ticker.baseVolume.toFixed(2).slice(0,10)}
            </Td>
            <Td className={`${style.row}`} column="percentChange">
              {+(ticker.percentChange * 100).toFixed(4).slice(0,6)}
            </Td>
          </Tr>
          );
      }
    });
    return rows
  }

  render() {
    const style = require('./Tickers.scss')
    return (
      <Table
        className={`${style.table} table`}
        id='TickersTable'
        columns={this.state.columns}
        sortable
        defaultSort={{column: 'baseVolume', direction: 'desc'}}>
        <Thead className={`${style.header}`}>
          <Th className={`${style.head}`} column='coin'><div >Coin</div></Th>
          <Th className={`${style.head}`} column='last'><div >Price</div></Th>
          <Th className={`${style.head}`} column='baseVolume'><div >Volume</div></Th>
          <Th className={`${style.head}`} column='percentChange'><div >±%</div></Th>
        </Thead>
        {this.tickerRows()}
      </Table>
    )
  }
}
