import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { withApp } from 'app';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import TickersTable from './TickersTable'
import TickersTab from './TickersTab'
import * as tickersActions from 'redux/modules/tickers';
@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const state = getState();

    if (state.online) {
      return dispatch(tickersActions.load());
    }
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    tickers: state.tickers.tickers,
    assetTab: state.tickers.assetTab
  }),
  { ...tickersActions }
)
@withApp
@pure
export default class Tickers extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    tickers: PropTypes.array.isRequired,
    load: PropTypes.func.isRequired,
    selectAsset: PropTypes.func.isRequired,
    assetTab: PropTypes.string.isRequired
  };

  state = {
    tickers: '',
    error: null,
  };

  componentDidMount = () => {
    this.props.app.service('tickers').on('patched', this.props.load);
    const assets = [...new Set(this.props.tickers.map(ticker => ticker.asset))];
    this.setState({assets: assets})
  }

  componentWillUnmount = () => {
    this.props.app.service('tickers').removeListener('patched', this.props.load);
  }

  tabs = () => {
    const style = require('./Tickers.scss');
    const tabs = this.state.assets.map((asset, index) => {
      const table = ( <TickersTable
            className='table'
            tickers={this.props.tickers}
            asset={asset}
            selectedAsset={this.props.assetTab}/>);
      return (
        <Tab
          className={`${style.tab}`}
          title={asset}
          key={asset}
          eventKey={asset}>
          {asset === this.props.assetTab && table}
        </Tab>
      )
    });
    return tabs;
  }

  render = () => {
    const style = require('./Tickers.scss');
    const { user, tickers, assetTab, selectAsset } = this.props;
    return (
      <div className={`${style.tickers} container`}>
        <h1>Tickers</h1>
        {(user && this.state.assets) &&
          <Tabs
            className={`${style.tabs}`}
            onSelect={selectAsset}
            id='tickerTableTabs'
            defaultActiveKey={'BTC'}>
            { this.tabs(tickers) }
          </Tabs>
        }
      </div>
    );
  }
}
