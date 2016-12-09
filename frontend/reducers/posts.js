import { STORE_POSTS, CREATE_POST, CLEAR_POSTS, LOAD_POST, CLEAR_POST, UPDATE_POST,
    DELETE_POST } from '../constants';

export const post = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST.type:
            return {
                id: action.id,
                title: action.title,
                content: action.content,
                media: action.media,
                tags: action.tags
            };
        case LOAD_POST.type:
            return {
                id: action.id,
                title: action.title,
                content: action.content,
                media: action.media,
                tags: action.tags
            };
        case UPDATE_POST.type:
            if (state.id !== action.id) {
                return state;
            }
            return action;
        case CLEAR_POST.type:
            return { };
        default:
            return state;
    }
};

export const posts = (state = [], action) => {
    switch (action.type) {
        case STORE_POSTS.type:
            return action.posts;
        case CREATE_POST.type:
            return [
                post(null, action),
                ...state
            ];
        case UPDATE_POST.type:
            return state.map(item =>
                post(item, action));
        case DELETE_POST.type: {
            var index = state.findIndex(p => p.id === action.id);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        }
        case CLEAR_POSTS.type:
            return [];
        default:
            return state;
    }
};
