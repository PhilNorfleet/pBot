import React, { Component } from 'react';

export default class TickerRow extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ticker.last === this.props.ticker.last) {
      return false;
    }
    return true;
  }

  render () {
    return (
      <tr>
        <td>{this.props.ticker.coin}</td>
        <td>{this.props.ticker.last}</td>
        <td>{this.props.ticker.baseVolume}</td>
        <td>{this.props.ticker.percentChange}</td>
      </tr>
    );
  }
}
