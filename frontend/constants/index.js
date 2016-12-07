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

//header navigation
export const BACK_TO_HOME = createActionType('BACK_TO_HOME');

//login dialog
export const DIALOG_OPEN = { type: 'DIALOG_OPEN' };
export const DIALOG_CLOSE = { type: 'DIALOG_CLOSE' };
export const PROGRESS_ACTIVE = { type: 'PROGRESS_ACTIVE' };
export const PROGRESS_INACTIVE = { type: 'PROGRESS_INACTIVE' };
export const SHOW_SNACKBAR = { type: 'SHOW_SNACKBAR' };
export const HIDE_SNACKBAR = { type: 'HIDE_SNACKBAR' };
