import React, {Component} from 'react';
import {Col, Tabs, Tab, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../styles/css/bootstrap.css';
import '../../styles/css/react-bootstrap-table.min.css';
import 'moment/locale/nb';

const TickerList = ({tickers, onRowClick, onExchangeSelect}) => {

  const getStyle = () => {
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

  const table = (tickers) => {
    let styles = getStyle();
    const options = {
      onRowClick: onRowClick,
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
      mock.pair = ticker.pair
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

  const tab = (key, tickers) => {
    let styles = getStyle();
    return (
      <Tab
        key={ key }
        eventKey={ key }
        title={ key }
        style={ styles.tab }
        unmountOnExit>
        { table(tickers) }
      </Tab>
    )
  }

  const tabs = (tickers) => {
    let styles = getStyle();
    let keys = [];
    for (var key in tickers) {
      let asset = key.slice(key.length-3, key.length)
      if (keys.indexOf(asset) < 0){ keys.push(asset) }
    }
    let tabs =[];
    keys.forEach((key, index) => {
      let rel_tickers = [];
      for (var compare_key in tickers) {
        if(compare_key.slice(key.length-3, key.length) === key) {
          rel_tickers.push(tickers[compare_key])
          rel_tickers[rel_tickers.length - 1].pair = compare_key
          rel_tickers[rel_tickers.length - 1].name = compare_key.split(':')[1].slice(0, key.length-2)
        }
      }
      tabs.push(tab(key, rel_tickers))
    })



    return (
      <Col>
        <Nav>
          <NavDropdown title="Exchange" onSelect={ handleExchangeSelect } id="nav-dropdown-within-tab">
            <MenuItem eventKey={'bitfinex'}>Bitfinex</MenuItem>
            <MenuItem eventKey={'poloniex'}>Poloniex</MenuItem>
            <MenuItem eventKey={'coinbase'}>Coinbase</MenuItem>
          </NavDropdown>
        </Nav>
        <Tabs
          id='markets'
          defaultActiveKey={ 'BTC' }
          style={ styles.tabs }>
          { tabs }
        </Tabs>
      </Col>
    )
  }

  const handleExchangeSelect = (exchange) => {
    onExchangeSelect(exchange)
  }

  let style = getStyle();
  return (
    <Col md={4} lg={2} sm={6} xs={12}
      style={ style }>
      {tabs(tickers)}
    </Col>
  );

}

export default TickerList;
