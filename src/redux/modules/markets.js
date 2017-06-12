const TICKERS_LOAD = 'TICKERS_LOAD';
const TICKERS_LOAD_SUCCESS = 'TICKERS_LOAD_SUCCESS';
const TICKERS_LOAD_FAIL = 'TICKERS_LOAD_FAIL';
const SELECT_ASSET = 'SELECT_ASSET';
const SELECT_COIN = 'SELECT_COIN';

const initialState = {
  tickerLoaded: false,
  tickers: [],
  assetTab: 'BTC',
  coinRow: 'ETH'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TICKERS_LOAD:
      return {
        ...state,
        tickerLoading: true
      };
    case TICKERS_LOAD_SUCCESS: {
      return {
        ...state,
        tickerLoading: false,
        tickerLoaded: true,
        tickers: action.result
      };
    }
    case TICKERS_LOAD_FAIL: {
      return {
        ...state,
        tickerLoading: false,
        tickerLoaded: false,
        error: action.error
      };
    }
    case SELECT_ASSET: {
      return {
        ...state,
        assetTab: action.asset
      };
    }
    case SELECT_COIN: {
      return {
        ...state,
        coinRow: action.coin
      };
    }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.tickers && globalState.tickers.tickerLoaded;
}

export function selectAsset(asset) {
  return { type: SELECT_ASSET, asset };
}

export function selectCoin(coin) {
  return { type: SELECT_COIN, coin };
}

const defaultLoadParams = {
  paginate: false,
  query: {
    isFrozen: 0
  }
};

export function tickerLoad(newParams = {}) {
  const params = Object.assign({}, defaultLoadParams, newParams);
  return {
    types: [TICKERS_LOAD, TICKERS_LOAD_SUCCESS, TICKERS_LOAD_FAIL],
    promise: ({ app }) => app.service('tickers').find(params).then(data => {
      const tickers = Object.values(data);
      return tickers;
    })
  };
}
