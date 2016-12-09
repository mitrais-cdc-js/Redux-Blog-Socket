import { WRITE_TITLE, CLEAR_TITLE, WRITE_CONTENT, CLEAR_CONTENT } from '../constants';

const textfield = (state = {
    title: '',
    content: ''
}, action) => {
    switch (action.type) {
        case WRITE_TITLE.type:
            return Object.assign({}, state, {
                title: action.title
            });
        case CLEAR_TITLE.type:
            return Object.assign({}, state, {
                title: ''
            });
        case WRITE_CONTENT.type:
            return Object.assign({}, state, {
                content: action.content
            });
        case CLEAR_CONTENT.type:
            return Object.assign({}, state, {
                content: ''
            });
        default:
            return state;
    }
};

export default textfield;
