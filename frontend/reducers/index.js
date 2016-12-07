import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';
import progress from './progress';

const reducers = combineReducers({
    posts,
    progress,
    routing: routerReducer
});

export default reducers;
