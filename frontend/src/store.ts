import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './reducer';

import { routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const musicRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => applyMiddleware(musicRouterMiddleware, createLogger());

export const store = createStore(
    rootReducer(history), JSON.parse(localStorage.state || '{}'), composeWithDevTools(getMiddleware())  
);

store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
})