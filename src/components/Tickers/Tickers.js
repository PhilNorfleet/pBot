import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import TickersTable from './TickersTable';
import style from './Tickers.scss';

const Tickers = ({ tickers, assets, selectAsset, assetTab, selectCoin, coinRow }) => {
  const makeTabs = () => {
    const tabs = assets.map((asset) => {
      const table = (
        <TickersTable
          className="table"
          tickers={tickers}
          asset={asset}
          selectedAsset={assetTab}
          selectedRow={coinRow}
          selectCoin={selectCoin} />
      );
      return (
        <Tab
          className={`${style.tab}`}
          title={asset}
          key={asset}
          eventKey={asset}>
          {asset === assetTab && table}
        </Tab>
      );
    });
    return tabs;
  };

  return (
    <div className={`${style.tickers} container`}>
      <Tabs
        className={`${style.tabs}`}
        onSelect={selectAsset}
        id="tickerTableTabs"
        defaultActiveKey={'BTC'}>
        { makeTabs() }
      </Tabs>
    </div>
  );
};
const propTypes = {
  tickers: PropTypes.array.isRequired,
  assets: PropTypes.array.isRequired,
  selectAsset: PropTypes.func.isRequired,
  assetTab: PropTypes.string.isRequired,
  selectCoin: PropTypes.func.isRequired,
  coinRow: PropTypes.string.isRequired
};
Tickers.propTypes = propTypes;
export default Tickers;
