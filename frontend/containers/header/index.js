import { connect } from 'react-redux';
import Headerbar from '../../components/header';
import { BACK_TO_HOME, DIALOG_OPEN, DIALOG_CLOSE, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    SHOW_SNACKBAR, HIDE_SNACKBAR } from '../../constants';
import request from 'superagent';

const onSnackbarClose = (dispatch) => {
    dispatch(HIDE_SNACKBAR);
};

const onDialogClose = (dispatch) => {
    dispatch(DIALOG_CLOSE);
    dispatch(PROGRESS_INACTIVE);
};

const onDialogSubmit = (username, pwd, dispatch) => {
    dispatch(PROGRESS_ACTIVE);
    request
        .post('http://localhost:5001/token')
        .send({ username: username.input.value.trim(), password: pwd.input.value.trim() })
        .type('form')
        .end((err, res) => {
            if (err || !res.ok) {
                dispatch(Object.assign({}, SHOW_SNACKBAR, {
                    message: res.text
                }));
                dispatch(PROGRESS_INACTIVE);
            } else {
                let data = JSON.parse(res.text);
                console.log(data);
                dispatch(Object.assign({}, SHOW_SNACKBAR, {
                    message: 'Login successful'
                }));
                onDialogClose(dispatch);
            }
        });
};


const onLoad = (dispatch) => {
    dispatch(DIALOG_OPEN);
};

const onTitleClick = (dispatch) => {
    dispatch(BACK_TO_HOME);
};

const mapStateToProps = (state) => {
    return {
        isDialogOpen: state.progress.isDialogOpen,
        isProgressActive: state.progress.active,
        snackbarActive: state.progress.snackbarActive,
        message: state.progress.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () =>
            onLoad(dispatch),
        onTitleClick: () =>
            onTitleClick(dispatch),
        onDialogSubmit: (username, pwd) =>
            onDialogSubmit(username, pwd, dispatch),
        onDialogClose: () =>
            onDialogClose(dispatch),
        onSnackbarClose: () =>
            onSnackbarClose(dispatch),
        dispatch
    };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(Headerbar);

export default Header;
