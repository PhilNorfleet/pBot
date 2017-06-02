import { combineReducers } from 'redux'
// import tickerExchange from '../reducers/tickerExchange'
// import * as reducers from '../reducers'
import isValidReduxReducer from 'is-valid-redux-reducer'
import tickerExchange from '../reducers/tickerExchange'
// console.log(tickerExchange)
// console.log(isValidReduxReducer(tickerExchange))
// console.log(reducers)
// console.log(isValidReduxReducer(reducers))
const pbotApp = combineReducers({
  tickerExchange: tickerExchange,
})
// console.log(pbotApp)
// console.log(isValidReduxReducer(pbotApp))
export default pbotApp
