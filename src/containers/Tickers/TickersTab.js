import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import TickersTable from './TickersTable'

import { pure } from 'recompose';
@pure
export default class TickersTab extends Component {
  static propTypes = {
    tickers: PropTypes.array.isRequired,
    selectedAsset: PropTypes.string.isRequired,
    asset: PropTypes.string.isRequired
  };

  render = () => {
    const { tickers, asset, selectedAsset } = this.props
    return (
      <Tab className='tab' title={asset} key={asset} eventKey={asset}>
        <TickersTable tickers={tickers} selectedAsset={selectedAsset}/>
      </Tab>
    )
  }
}
