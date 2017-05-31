import React, {Component} from 'react';
import {Grid} from "react-bootstrap";
import axios from 'axios';
import TickerList from '../components/TickerList'
import 'moment/locale/nb';

class Markets extends Component {

  constructor(props) {
    super(props);
    this.state = { currencies: {}, tickers: {} };
    this.loadCurrencies.bind(this);
    this.loadTickers.bind(this);
  }
  componentDidMount() {
    this.loadCurrencies();
    this.loadTickers();
    this.interval = setInterval(()=>{this.loadTickers()}, 5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  loadCurrencies() {
    axios.get('http://localhost:3001/api/currencies').then(res => {
      this.setState({currencies: res.data})
    })
  }
  loadTickers() {
    axios.get('http://localhost:3001/api/tickers').then(res => {
      this.setState({tickers: res.data})
    })
  }
  render() {
    return (
      <Grid className="page">
        <TickerList tickers={this.state.tickers}/>
      </Grid>
    );
  }
}

export default Markets;
