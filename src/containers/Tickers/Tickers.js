import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { withApp } from 'app';
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
    tickers: state.tickers
  }),
  { ...tickersActions }
)
@withApp
export default class Tickers extends Component {

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

  componentDidMount() {

    this.props.app.service('tickers').on('patched', this.props.load);
    this.props.app.service('tickers').on('patched', console.log('patched'));
    this.props.app.service('tickers').on('created', console.log('created'));
  }

  componentWillUnmount() {
    this.props.app.service('tickers').removeListener('patched', console.log('removeListener'));
  }


  render() {
    const { user, tickers } = this.props;
    // console.log(tickers.tickers);
    // const { error } = this.state;

    const displayTickers = [];
    Object.keys(tickers.tickers).forEach((key) => {
      displayTickers.push(tickers.tickers[key].last);
    });
    return (
      <div className="container">
        <h1>Tickers</h1>

        {user && <div>
          <ul>
            {displayTickers}
          </ul>
        </div>
        }
      </div>
    );
  }
}
