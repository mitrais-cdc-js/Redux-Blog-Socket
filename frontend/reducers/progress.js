import { DIALOG_OPEN, DIALOG_CLOSE, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    SHOW_SNACKBAR, HIDE_SNACKBAR } from '../constants';

const progress = (state = {
    isDialogOpen: false,
    active: false,
    snackbarActive: false,
    message: ''
}, action) => {
    switch (action.type) {
        case DIALOG_OPEN.type: {
            return Object.assign({}, state, {
                isDialogOpen: true
            });
        }
        case DIALOG_CLOSE.type: {
            return Object.assign({}, state, {
                isDialogOpen: false
            });
        }
        case PROGRESS_ACTIVE.type: {
            return Object.assign({}, state, {
                active: true
            });
        }
        case PROGRESS_INACTIVE.type: {
            return Object.assign({}, state, {
                active: false
            });
        }
        case SHOW_SNACKBAR.type: {
            return Object.assign({}, state, {
                snackbarActive: true,
                message: action.message
            });
        }
        case HIDE_SNACKBAR.type: {
            return Object.assign({}, state, {
                snackbarActive: false,
                message: ''
            });
        }
        default:
            return state;
    }
};

export default progress;
