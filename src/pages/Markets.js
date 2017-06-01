import React, {Component} from 'react';
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
      pair: 'BTC_ETH',
      period: 300,
      start: Math.round(new Date().getTime() / 1000) - (24 * 3600),
      end: new Date().getTime()
    };
    console.log()
  }

  getStyle = () => {
    return {
      tickerList: {
      },
    }
  }

  componentDidMount = () => {
    let { pair, period, start, end } = this.state
    this.loadCurrencies();
    this.loadTickers();
    this.loadPeriods(pair, period, start, end)
    this.tickerInterval = setInterval(()=>{this.loadTickers()}, 6500)
    this.periodsInterval = setInterval(()=>{this.loadPeriods(pair, period, start, end)}, 6500)
  }

  componentWillUnmount = () => {
    clearInterval(this.tickerInterval);
    clearInterval(this.periodsInterval);
  }

  chartContainer = () => {
    let { periods, pair } = this.state;
    if (periods) {
      return (
        <ChartContainer periods={ periods } pair={ pair } />
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
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
    this.loadPeriods(row.pair, this.state.period, this.state.start, this.state.end)
  }
  render = () => {
    let styles = this.getStyle();
    return (
      <Grid >
        <Row>
          <TickerList tickers={this.state.tickers} onRowClick={this.onRowClick}/>
          {this.chartContainer()}
        </Row>
      </Grid>
    );
  }
}

export default Markets;
