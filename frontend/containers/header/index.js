import { connect } from 'react-redux';
import React from 'react';
import { red300 } from 'material-ui/styles/colors';
import Headerbar from '../../components/header';
import {
    BACK_TO_HOME, DIALOG_OPEN, DIALOG_CLOSE, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    SHOW_SNACKBAR, HIDE_SNACKBAR, URL, STORE_POSTS, CLEAR_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST,
    DELETE_DIALOG_CLOSE
} from '../../constants';
import request from 'superagent';
import cookie from 'react-cookie';
import { isTokenValid } from '../../actions';
import io from 'socket.io-client';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

export var socket = io.connect('http://localhost:3000');

const onDeleteOK = (id, dispatch) => {
    dispatch(PROGRESS_ACTIVE);
    request
        .post(`${URL}/blog/delete`)
        .authBearer(cookie.load('token'))
        .type('form')
        .send({
            id: id
        })
        .end((err, res) => {
            if (err || !res.ok) {
                let alert = Object.assign({}, SHOW_SNACKBAR, {
                    message: 'You are not logged in.'
                });
                dispatch(alert);
                dispatch(PROGRESS_INACTIVE);
                return;
            }
            let resp = JSON.parse(res.text);
            if (resp.status === '0') {
                dispatch(Object.assign({}, DELETE_POST, {
                    id: id
                }));
                let alert = Object.assign({}, SHOW_SNACKBAR, {
                    message: 'Post deleted'
                });
                dispatch(alert);
                dispatch(DELETE_DIALOG_CLOSE);
                dispatch(PROGRESS_INACTIVE);
            }
        });
};

const onDeleteCancel = (dispatch) => {
    dispatch(DELETE_DIALOG_CLOSE);
};

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

                socket.emit('online', data, () => {
                    dispatch(Object.assign({}, SHOW_SNACKBAR, {
                        message: 'Logged in as: ' + data.fullname
                    }));
                });

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
            ReactMaterialUiNotifications.showNotification({
                title: 'Timeline updated',
                additionalText: data.author + ' created a post',
                icon: (<CheckCircle />),
                iconBadgeColor: red300,
                overflowText: 'Redux Blog',
                timestamp: '',
                avatar: 'material-icons/chatting.png',
                personalised: true
            });

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
        socket.on('online', (data) => {
            ReactMaterialUiNotifications.showNotification({
                title: 'User logged in',
                additionalText: data.fullname + ' has signed in and might change your posts.',
                icon: (<CheckCircle />),
                iconBadgeColor: red300,
                overflowText: 'Redux Blog',
                timestamp: '',
                avatar: 'material-icons/user.png',
                personalised: true
            });

            dispatch(PROGRESS_INACTIVE);
        });
        socket.on('updated post', (data) => {
            dispatch(PROGRESS_ACTIVE);
            ReactMaterialUiNotifications.showNotification({
                title: 'Timeline updated',
                additionalText: data.author + ' made changes on post',
                icon: (<CheckCircle />),
                iconBadgeColor: red300,
                overflowText: 'Redux Blog',
                timestamp: '',
                avatar: 'material-icons/chatting.png',
                personalised: true
            });

            setTimeout(() => {
                let post = Object.assign({}, UPDATE_POST, {
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
        isDialogDeleteOpen: state.progress.isDeleteDialogOpen,
        isProgressActive: state.progress.active,
        snackbarActive: state.progress.snackbarActive,
        message: state.progress.message,
        deleteId: state.progress.id
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
        onDeleteOK: (id) =>
            onDeleteOK(id, dispatch),
        onDeleteCancel: () =>
            onDeleteCancel(dispatch),
        dispatch
    };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(Headerbar);

export default Header;
