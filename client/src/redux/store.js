import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import persistedReducer from './reducers/rootReducer';
import { persistStore } from 'redux-persist';

const middlewares = [thunk, logger]; // Apply middleware as needed

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

const persistor = persistStore(store);

export { store, persistor };
