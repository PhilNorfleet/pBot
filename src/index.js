import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './common/store/configureStore';
import MarketsContainer from './common/containers/Markets';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';
import { selectTickerExchange } from './common/actions'
import isValidReduxReducer from 'is-valid-redux-reducer'
// console.log(rootReducer)
// console.log(isValidReduxReducer(rootReducer))
let store = configureStore();
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
