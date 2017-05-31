import React, {Component} from 'react';
import {Col, Tabs, Tab, Table} from "react-bootstrap";
import '../css/bootstrap.css';
// import Nav from './components/Nav';
// import Footer from './components/Footer';
// import '../assets/css/app.css';
// import '../assets/css/frontpage.css';
import 'moment/locale/nb';
// import Header from "./components/Header";

class TickerList extends Component {

  constructor(props) {
    super(props);
    this.state = { tickers: [] };
  }

  getStyle(){
    return {
      tabs :{

      },
      tab :{

      },
      table :{
        maxWidth: '200px',
      },
      tableEntry:{
        margin: '10px'
      }
    }
  }

  tableEntry(key, ticker){
    let styles = this.getStyle();
    let name = key.split('_')[1]
    return (
      <tr key={key} style={styles.tableEntry}>
        <td>{name}</td>
        <td>{ticker.last}</td>
        <td>{ticker.percentChange}</td>
      </tr>
    )
  }

  table(tickers){
    let styles = this.getStyle();
    let tableEntries = [];
    for (var key in tickers) {
      let ticker = tickers[key]
      tableEntries.push(this.tableEntry(key, ticker))
    }
    return (
      <Table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>% Chg</th>
          </tr>
        </thead>
        <tbody>
          {tableEntries}
        </tbody>
      </Table>
    )
  }

  tab(key, tickers){
    let styles = this.getStyle();
    return (
      <Tab key={key} eventKey={key} title={key}>
        {this.table(tickers)}
      </Tab>
    )
  }

  tabs(tickers){
    let styles = this.getStyle();
    let keys = [];
    for (var key in tickers) {
      let asset = key.split('_')[0]
      if (keys.indexOf(asset) < 0){ keys.push(asset) }
    }
    let tabs =[];
    keys.forEach((key, index) => {
      let rel_tickers = {};
      for (var compare_key in tickers) {
        if(compare_key.split('_')[0] === key) {
          rel_tickers[compare_key] = tickers[compare_key]
        }
      }
      tabs.push(this.tab(key, rel_tickers))
    })
    return (
      <Tabs id='markets' defaultActiveKey={'BTC'}>
        {tabs}
      </Tabs>
    )
  }

  render() {
    let styles = this.getStyle();
    return (
      <Col>
          {this.tabs(this.props.tickers)}
      </Col>
    );
  }
}

export default TickerList;
