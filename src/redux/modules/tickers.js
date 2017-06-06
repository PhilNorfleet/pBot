const LOAD = 'TICKERS_LOAD';
const LOAD_SUCCESS = 'TICKERS_LOAD_SUCCESS';
const LOAD_FAIL = 'TICKERS_LOAD_FAIL';

const initialState = {
  loaded: false,
  tickers: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        tickers: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.tickers && globalState.tickers.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ app }) => app.service('tickers').find({
      paginate: false,
      query: {
        isFrozen: 0
      }
    }).then(page => {
      return { ...page, data: page };
    })
  };
}
