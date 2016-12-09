import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { posts, post } from './posts';
import progress from './progress';
import textfield from './textfield';

const reducers = combineReducers({
    post,
    posts,
    progress,
    textfield,
    routing: routerReducer
});

export default reducers;
