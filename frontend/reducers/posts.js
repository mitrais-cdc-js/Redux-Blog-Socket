import { STORE_POSTS, CREATE_POST, CLEAR_POSTS, LOAD_POST, CLEAR_POST } from '../constants';

export const posts = (state = [], action) => {
    switch (action.type) {
        case STORE_POSTS.type:
            return action.posts;
        case CREATE_POST.type:
            return [
                post(null, action),
                ...state
            ];
        case CLEAR_POSTS.type:
            return [];
        default:
            return state;
    }
};

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
        case CLEAR_POST.type:
            return { };
        default:
            return state;
    }
};


