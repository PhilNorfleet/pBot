// see http://redux.js.org/docs/basics/Reducers.html
import { SELECT_TICKER_EXCHANGE } from '../actions'
const tickerExchange = (state = 'bitfinex', action) => {
  switch(action.type) {
    case SELECT_TICKER_EXCHANGE:
      return action.tickerExchange
    default:
      return state
  }
}
export default tickerExchange
