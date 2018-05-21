import { createStore, applyMiddleware } from 'redux';
import puzzleReducer from '../reducers/puzzleReducer';
import thunk from 'redux-thunk';

const store = createStore(puzzleReducer, applyMiddleware(thunk));

export default store;