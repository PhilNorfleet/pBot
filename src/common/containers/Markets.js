import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTickerExchange } from '../actions'
import {Grid, Row} from "react-bootstrap";
import moment from 'moment';
import axios from 'axios';
import TickerList from '../components/TickerList'
import ChartContainer from '../components/chart/ChartContainer'
import 'moment/locale/nb';

class Markets extends Component {

  constructor(props){
    super(props);
    this.state = {
      currencies: {},
      tickers: {},
      tickerExchange: 'bitfinex',
      pair: 'BTC_ETH',
      period: 300,
      start: Math.round(new Date().getTime() / 1000) - (24 * 3600),
      end: new Date().getTime()
    };

  }

  getStyle = () => {
    return {
      tickerList: {
      },
    }
  }

  getTickersForExchange = (tickerExchange) => {
    let exchange_tickers = {};
    for (var key in this.state.tickers) {
      if (key.split(':')[0] === tickerExchange) {
        exchange_tickers[key] = tickerExchange
      }
    }
    return exchange_tickers
  }

  mapStateToProps = (state) => {
    return {
      tickerExchange: this.getTickersForExchange(state.tickerExchange)
    }
  }

  componentDidMount = () => {
    let { pair, period, start, end } = this.state
    // this.props.store.subscribe(() => {
    //   // When state will be updated(in our case, when items will be fetched), we will update local component state and force component to rerender with new data.
    //   this.setState({
    //     tickerExchange: this.store.getState().tickerExchange
    //   });
    // });
    axios.post('http://localhost:3001/getTrades', {
      data: {
        pair: 'BTC_USDT'
      }
    }).then((res) =>{
      console.log(res)
    })
    // this.loadCurrencies();
    // this.loadTickers();
    // this.loadPeriods(pair, period, start, end)
    // this.tickerInterval = setInterval(()=>{this.loadTickers()}, 6500)
    // this.periodsInterval = setInterval(()=>{this.loadPeriods(pair, period, start, end)}, 6500)
  }

  componentWillUnmount = () => {
    // clearInterval(this.tickerInterval);
    // clearInterval(this.periodsInterval);
  }

  chartContainer = () => {
    // let { periods, pair } = this.state;
    // if (periods) {
    //   return (
    //     <ChartContainer periods={ periods } pair={ pair } />
    //   )
    // } else {
    //   return (
    //     <div>Loading...</div>
    //   )
    // }
  }

  loadCurrencies = () => {
    axios.get('http://localhost:3001/api/currencies').then(res => {
      this.setState({currencies: res.data})
    })
  }

  loadTickers = () => {
    axios.get('http://localhost:3001/api/tickers').then(res => {
      this.setState({tickers: res.data})
    })
  }

  loadPeriods = (pair, period, start, end) => {
    const url = `http://localhost:3001/api/chart/${pair}/${period}/${start}/${end}`;
    return axios.get(url).then(res => {
      this.setState({periods: res.data})
    });
  }

  onRowClick = (row) => {
    this.setState({selected: row})
    let { period, start, end } = this.state;
    clearInterval(this.periodsInterval);
    this.loadPeriods(row.pair, period, start, end)
    this.periodsInterval = setInterval(()=>{this.loadPeriods(row.pair, period, start, end)}, 6500)
  }

  onExchangeSelect = (exchange) => {
    this.setState({tickerExchange: exchange});
  }

  render = () => {
    console.log(this.state.tickerExchange)
    let styles = this.getStyle();
    console.log(this.state.tickers)
    return (
      <Grid >
        <Row>
          <TickerList
            tickers={ this.getTickersForExchange(this.state.tickerExchange) }
            onRowClick={ this.onRowClick }
            onExchangeSelect={ this.onExchangeSelect }/>

        </Row>
      </Grid>
    );
  }
}
const MarketsContainer = connect(
  Markets.mapStateToProps,
  // mapDispatchToProps
)(Markets)
export default MarketsContainer;
