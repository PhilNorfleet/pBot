const LOAD = 'TICKERS_LOAD';
const LOAD_SUCCESS = 'TICKERS_LOAD_SUCCESS';
const LOAD_FAIL = 'TICKERS_LOAD_FAIL';
const SELECT_ASSET = 'SELECT_ASSET';

const initialState = {
  loaded: false,
  tickers: [],
  assetTab: 'BTC'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        tickers: action.result
      };
    }
    case LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
      }
    case SELECT_ASSET: {
      return {
        ...state,
        assetTab: action.asset
      };
    }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.tickers && globalState.tickers.loaded;
}

export function selectAsset(asset) {
  return { type: SELECT_ASSET, asset };
}

const defaultLoadParams = {
  paginate: false,
  query: {
    isFrozen: 0
  }
}

export function load(newParams = {}) {
  const params = Object.assign({}, defaultLoadParams, newParams)
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ app }) => app.service('tickers').find(params).then(data => {
      const tickers = Object.values(data);
      return tickers;
    })
  };
}
