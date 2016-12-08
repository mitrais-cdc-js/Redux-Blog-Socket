import { connect } from 'react-redux';
import Headerbar from '../../components/header';
import {
    BACK_TO_HOME, DIALOG_OPEN, DIALOG_CLOSE, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    SHOW_SNACKBAR, HIDE_SNACKBAR, URL, STORE_POSTS, CLEAR_POSTS, CREATE_POST
} from '../../constants';
import request from 'superagent';
import cookie from 'react-cookie';
import { isTokenValid } from '../../actions';
import io from 'socket.io-client';

export var socket = io.connect('http://localhost:3000');

const loadPosts = (dispatch) => {
    if (isTokenValid()) {
        dispatch(PROGRESS_ACTIVE);
        request
            .get(`${URL}/blog/getposts`)
            .authBearer(cookie.load('token'))
            .end((err, res) => {
                if (err || !res.ok) {
                    let alert = Object.assign({}, SHOW_SNACKBAR, {
                        message: 'You are not logged in.'
                    });
                    dispatch(alert);
                    dispatch(PROGRESS_INACTIVE);
                    return;
                }
                let posts = JSON.parse(res.text);
                let data = Object.assign({}, STORE_POSTS, {
                    posts: posts
                });
                dispatch(data);
                dispatch(PROGRESS_INACTIVE);
            });
    }
};

const onSnackbarClose = (dispatch) => {
    dispatch(HIDE_SNACKBAR);
};

const onDialogClose = (dispatch) => {
    dispatch(DIALOG_CLOSE);
    dispatch(PROGRESS_INACTIVE);
};

const onLogout = (dispatch) => {
    cookie.remove('token');
    cookie.remove('fullname');
    cookie.remove('expires');
    cookie.remove('username');
    cookie.remove('password');
    dispatch(CLEAR_POSTS);
    dispatch(DIALOG_OPEN);
    dispatch(Object.assign({}, SHOW_SNACKBAR, {
        message: 'Successfully logged out'
    }));
};

export const onDialogSubmit = (username, pwd, dispatch) => {
    dispatch(PROGRESS_ACTIVE);
    request
        .post(`${URL}/token`)
        .send({ username: username, password: pwd })
        .type('form')
        .end((err, res) => {
            if (err || !res.ok) {
                dispatch(Object.assign({}, SHOW_SNACKBAR, {
                    message: res.text
                }));
                dispatch(PROGRESS_INACTIVE);
            } else {
                let data = JSON.parse(res.text);
                var date = new Date();
                date.setHours(date.getHours(),
                    date.getMinutes(), date.getSeconds() + data.expires_in);
                cookie.save('username', username);
                cookie.save('password', pwd);
                cookie.save('fullname', data.fullname);
                cookie.save('token', data.access_token);
                cookie.save('expires', date.toString());
                dispatch(Object.assign({}, SHOW_SNACKBAR, {
                    message: 'Logged in as: ' + data.fullname
                }));
                onDialogClose(dispatch);
                loadPosts(dispatch);
            }
        });
};


const onLoad = (dispatch) => {
    let token = cookie.load('token');
    let expires = cookie.load('expires');
    let username = cookie.load('username');
    let pwd = cookie.load('password');
    if (token != null && token !== undefined) {
        if (new Date(expires) > new Date()) {
            onDialogClose(dispatch);
            loadPosts(dispatch);
        } else { //refresh token
            onDialogSubmit(username, pwd, dispatch);
        }
    } else {
        dispatch(DIALOG_OPEN);
    }

    //TCP initialization
    socket.on('connect', () => {
        console.log('TCP connected to port 3000 on localhost');
        socket.on('new post', (data) => {
            dispatch(PROGRESS_ACTIVE);
            let alert = Object.assign({}, SHOW_SNACKBAR, {
                message: `New post received: ${data.title}. Loading...`
            });
            dispatch(alert);

            setTimeout(() => {
                let post = Object.assign({}, CREATE_POST, {
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    tags: data.tags,
                    media: data.media
                });
                dispatch(post);


                dispatch(PROGRESS_INACTIVE);
            }, 2000);
        });
    });
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
            onDialogSubmit(username.input.value.trim(), pwd.input.value.trim(), dispatch),
        onDialogClose: () =>
            onDialogClose(dispatch),
        onSnackbarClose: () =>
            onSnackbarClose(dispatch),
        onLogout: () =>
            onLogout(dispatch),
        dispatch
    };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(Headerbar);

export default Header;
