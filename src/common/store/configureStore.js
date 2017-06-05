import { createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import { createLogger } from 'redux-logger';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';
console.log(devTools)
console.log(reduxReactRouter({
          createHistory
        }))
const middlewareBuilder = () => {

  let middleware = {};
  let universalMiddleware = [thunk,promiseMiddleware];
  let allComposeElements = [];

  if(process.browser){
    if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'){
      middleware = applyMiddleware(...universalMiddleware);
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        })
      ]
    }
    else{
      middleware = applyMiddleware(...universalMiddleware, createLogger());
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        }),
      ]
    }
  }
  else{
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ]
  }

  return allComposeElements;

}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
  const store = finalCreateStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  /* eslint-enable */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
