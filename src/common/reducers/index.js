import { combineReducers } from 'redux'
// import tickerExchange from '../reducers/tickerExchange'
// import * as reducers from '../reducers'
import isValidReduxReducer from 'is-valid-redux-reducer'
import tickerExchange from '../reducers/tickerExchange'
// console.log(tickerExchange)
// console.log(isValidReduxReducer(tickerExchange))
// console.log(reducers)
// console.log(isValidReduxReducer(reducers))
const rootReducer = combineReducers({
  tickerExchange: tickerExchange,
})
// console.log(rootReducer)
// console.log(isValidReduxReducer(rootReducer))
export default rootReducer
