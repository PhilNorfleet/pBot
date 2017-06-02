import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import pbotApp from './reducers'
import MarketsContainer from './pages/Markets';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';
import { selectTickerExchange } from './actions'
import isValidReduxReducer from 'is-valid-redux-reducer'
// console.log(pbotApp)
// console.log(isValidReduxReducer(pbotApp))
let store = createStore(pbotApp)
// console.log(store)
console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch(selectTickerExchange('poloniex'))
unsubscribe()
const Root = ({store}) => {

    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={MarketsContainer}/>
            </Router>
        </Provider>
    )

}


ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
registerServiceWorker();
