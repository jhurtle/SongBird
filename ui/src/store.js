import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import promise from 'redux-promise';

/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(promise)
    )
);
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(promise)
  ));

export default store;
