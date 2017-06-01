import React, {Component} from 'react';
import {Grid} from "react-bootstrap";
import axios from 'axios';
import TickerList from '../components/TickerList'
import ChartContainer from '../components/chart/ChartContainer'
import 'moment/locale/nb';

class Markets extends Component {

  constructor(props){
    super(props);
    this.state = { currencies: {}, tickers: {} };

  }
  getStyle = () => {
    return {
      tickerList: {
      },
    }
  }
  componentDidMount = () => {
    this.loadCurrencies();
    this.loadTickers();
    this.interval = setInterval(()=>{this.loadTickers()}, 6500)
  }
  componentWillUnmount = () => {
    clearInterval(this.interval);
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
  onRowClick = (row) => {
    this.setState({selected: row})
  }
  render = () => {
    let styles = this.getStyle();
    console.log(this.state.selected)
    return (
      <Grid >
        <TickerList tickers={this.state.tickers} onRowClick={this.onRowClick}/>
        <Chart/>
      </Grid>
    );
  }
}

export default Markets;
