import { createStore, applyMiddleware } from 'redux';
import root from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(root, applyMiddleware(thunk));

export default store;
