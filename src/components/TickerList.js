import React, {Component} from 'react';
import {Col, Tabs, Tab} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../css/bootstrap.css';
import '../css/react-bootstrap-table.min.css';
import 'moment/locale/nb';

class TickerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tickers: [],
      selected: null
    };
  }

  getStyle = () => {
    return {
      col: {
        width: '258px',
      },
      tabs :{
        maxHeight: '100%'
      },
      tab :{
        maxHeight: '100%',
      },
      table :{
        maxHeight: '100%',
      },
      tableContainer :{
      },
      tableHeader:{
      },
      tableBody:{
        overflow: 'auto',
        maxHeight: '70vh'
      },
      tableColumn:{
        td:{
          fontSize: '10px',
          textAlign: 'center',
          padding: '2px'
        },
        th:{
          textAlign: 'center',
          paddingTop: '0px',
          paddingBottom: '0px',
          fontSize: '11px',
        }
      }
    }
  }

  table = (tickers) => {
    let styles = this.getStyle();
    const options = {
      onRowClick: this.props.onRowClick,
      defaultSortName: 'baseVolume',
      defaultSortOrder: 'desc'
    };
    const selectRow = {
      mode: 'radio',  // single select
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: '#CEE3F8',
      textColor: 'white' //747F8D
    };
    let data = [];
    tickers.forEach((ticker)=>{
      let mock = {};
      mock.name = ticker.name
      mock.last = ticker.last
      mock.baseVolume = Math.floor(parseFloat(ticker.baseVolume)*100)/100
      mock.percentChange = Math.floor(parseFloat(ticker.percentChange)*10000)/100
      data.push(mock)
    })
    if (data.length){
      return (
        <BootstrapTable
          data={ data }
          options={ options }
          selectRow={ selectRow }
          striped
          hover
          tableStyle={ styles.table }
          containerStyle={ styles.tableContainer }
          headerStyle={ styles.tableHeader }
          bodyStyle={ styles.tableBody }>
          <TableHeaderColumn dataField='name'
            isKey
            dataSort
            thStyle={ styles.tableColumn.th }
            tdStyle={ styles.tableColumn.td }>
            Coin
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='last'
            dataSort
            width='70px'
            thStyle={ styles.tableColumn.th }
            tdStyle={ styles.tableColumn.td }>
            Price
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='baseVolume'
            dataSort
            width='60px'
            thStyle={ styles.tableColumn.th }
            tdStyle={ styles.tableColumn.td }>
            Vol
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='percentChange'
            dataSort
            thStyle={ styles.tableColumn.th }
            tdStyle={ styles.tableColumn.td }>
            ±%
          </TableHeaderColumn>
        </BootstrapTable>
      )
    }
  }

  tab = (key, tickers) => {
    let styles = this.getStyle();
    return (
      <Tab
        key={ key }
        eventKey={ key }
        title={ key }
        style={ styles.tab }
        unmountOnExit>
        { this.table(tickers) }
      </Tab>
    )
  }

  tabs = (tickers) => {
    let styles = this.getStyle();
    let keys = [];
    for (var key in tickers) {
      let asset = key.split('_')[0]
      if (keys.indexOf(asset) < 0){ keys.push(asset) }
    }
    let tabs =[];
    keys.forEach((key, index) => {
      let rel_tickers = [];
      for (var compare_key in tickers) {
        if(compare_key.split('_')[0] === key) {
          rel_tickers.push(tickers[compare_key])
          rel_tickers[rel_tickers.length - 1].name = compare_key.split('_')[1]
        }
      }
      tabs.push(this.tab(key, rel_tickers))
    })
    return (
      <Tabs
        id='markets'
        defaultActiveKey={ 'BTC' }
        style={ styles.tabs }>
        { tabs }
      </Tabs>
    )
  }



  render = () => {
    let styles = this.getStyle();
    return (
      <Col
        style={ styles.col }>
        {this.tabs(this.props.tickers)}
      </Col>
    );
  }
}

export default TickerList;
