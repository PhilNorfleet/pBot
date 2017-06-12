import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { withApp } from 'app';
import * as marketsActions from 'redux/modules/markets';
import Tickers from '../../components/Tickers/Tickers';
@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const state = getState();

    if (state.online) {
      return dispatch(marketsActions.tickerLoad());
    }
  }
}])
@connect(
  state => ({
    tickers: state.markets.tickers,
    assetTab: state.markets.assetTab,
    coinRow: state.markets.coinRow
  }),
  { ...marketsActions }
)
@withApp
@pure
export default class Markets extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    tickers: PropTypes.array.isRequired,
    tickerLoad: PropTypes.func.isRequired,
    selectAsset: PropTypes.func.isRequired,
    assetTab: PropTypes.string.isRequired,
    selectCoin: PropTypes.func.isRequired,
    coinRow: PropTypes.string.isRequired
  };

  state = {
    tickers: '',
    error: null,
  };

  componentDidMount = () => {
    this.props.app.service('tickers').on('patched', this.props.tickerLoad);
    const assets = [...new Set(this.props.tickers.map(ticker => ticker.asset))];
    this.setState({ assets });
  }

  componentWillUnmount = () => {
    this.props.app.service('tickers').removeListener('patched', this.props.tickerLoad);
  }

  render = () => {
    const { tickers, selectAsset, assetTab, selectCoin, coinRow } = this.props;
    return (
      <div>
        {this.state.assets &&
          <Tickers
            assets={this.state.assets}
            tickers={tickers}
            selectAsset={selectAsset}
            assetTab={assetTab}
            selectCoin={selectCoin}
            coinRow={coinRow} />
        }
      </div>
    );
  }
}
