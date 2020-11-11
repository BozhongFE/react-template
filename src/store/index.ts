import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default () => {
  const middleeares = [thunk];
  const enhancers = applyMiddleware(...middleeares);
  const composeEnhancers = composeWithDevTools(...[enhancers]);
  const store = createStore(reducer, composeEnhancers);
  return store;
};
