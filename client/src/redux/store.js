// redux/store.js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import persistedReducer from './reducers/rootReducer';
import { persistStore } from 'redux-persist';

const middlewares = [];
// const middlewares = [logger];

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

export const persistor = persistStore(store);


// ### Next: Add Redux thunk to it again
