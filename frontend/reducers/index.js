import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { posts, post } from './posts';
import progress from './progress';

const reducers = combineReducers({
    post,
    posts,
    progress,
    routing: routerReducer
});

export default reducers;
