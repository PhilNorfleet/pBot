import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { withApp } from 'app';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as tickersActions from 'redux/modules/tickers';
import '../../components/Table/Table.scss';
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
    tickers: state.tickers
  }),
  { ...tickersActions }
)
@withApp
@pure
export default class Tickers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    tickers: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };

  state = {
    tickers: '',
    error: null
  };

  componentDidMount = () => {
    this.props.app.service('tickers').on('patched', this.props.load);
    const tickers = Object.keys(this.props.tickers.tickers.data).map(key => {
      return this.props.tickers.tickers.data[key];
    });
    const assets = [...new Set(tickers.map(ticker => ticker.asset))];
    this.setState({assets: assets})
  }

  componentWillUnmount = () => {
    this.props.app.service('tickers').removeListener('patched', this.props.load);
  }

  tickerTable = (tickersForAsset) => {
    const data = tickersForAsset.map((ticker) => {
      const tickerData = {
        coin: ticker.coin,
        last: ticker.last,
        percentChange: ticker.percentChange,
        baseVolume: ticker.baseVolume
      };
      return tickerData;
    });
    return (
      <BootstrapTable data={data} striped hover>
        <TableHeaderColumn dataField="coin" isKey dataAlign="center" dataSort>Coin</TableHeaderColumn>
        <TableHeaderColumn dataField="last" dataAlign="center" dataSort>Price</TableHeaderColumn>
        <TableHeaderColumn dataField="baseVolume" dataAlign="center" dataSort>Volume</TableHeaderColumn>
        <TableHeaderColumn dataField="percentChange" dataAlign="center" dataSort>24h±%</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  tab = (asset, tickers) => {
    console.log('tab')
    const tickersForAsset = tickers.filter(ticker => {
      return ticker.asset === asset
    });
    return (<Tab key={asset} title={asset} eventKey={asset}> { this.tickerTable(tickersForAsset) } </Tab>)
  }

  tabs = (tickers) => {
    console.log('tabs')
    const tabs = this.state.assets.map(asset => {
      return this.tab(asset, tickers);
    });
    return tabs;
  }

  render = () => {
    // console.log('rendering')
    const { user, tickers } = this.props;
    const displayTickers = Object.keys(tickers.tickers.data).map(key => {
      return tickers.tickers.data[key];
    });
    return (
      <div className="container">
        <h1>Tickers</h1>

        {(user && this.state.assets) && <Tabs id='tickerTableTabs' defaultActiveKey='BTC'>
          { this.tabs(displayTickers) }
        </Tabs>
        }
      </div>
    );
  }
}
