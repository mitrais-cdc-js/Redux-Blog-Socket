const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createActionType = (base) => {
    const reqType = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => {
        reqType[type] = `${base}_${type}`;
    });
    return reqType;
};

export const URL = 'http://localhost:5001';

//header navigation
export const BACK_TO_HOME = createActionType('BACK_TO_HOME');

//login dialog
export const DIALOG_OPEN = { type: 'DIALOG_OPEN' };
export const DIALOG_CLOSE = { type: 'DIALOG_CLOSE' };
export const PROGRESS_ACTIVE = { type: 'PROGRESS_ACTIVE' };
export const PROGRESS_INACTIVE = { type: 'PROGRESS_INACTIVE' };
export const SHOW_SNACKBAR = { type: 'SHOW_SNACKBAR' };
export const HIDE_SNACKBAR = { type: 'HIDE_SNACKBAR' };

//posts
export const STORE_POSTS = { type: 'STORE_POSTS ' };
export const CREATE_POST = { type: 'CREATE_POST' };
export const CLEAR_POSTS = { type: 'CLEAR_POSTS' };
export const LOAD_POST = { type: 'LOAD_POST' };
export const CLEAR_POST = { type: 'CLEAR_POST' };
