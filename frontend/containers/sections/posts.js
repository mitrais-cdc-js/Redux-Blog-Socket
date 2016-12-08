import { connect } from 'react-redux';
import PostSection from '../../components/sections/posts';
import {
    BACK_TO_HOME, URL, SHOW_SNACKBAR, CREATE_POST, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    LOAD_POST, CLEAR_POST
} from '../../constants';
import { EditorState } from 'draft-js';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { socket } from '../header';
import { onDialogSubmit } from '../header';

/*global require*/

require('superagent-auth-bearer')(request);

const onClearForm = (dispatch) => {
    dispatch(CLEAR_POST);
};

const onLoad = (id, dispatch) => {
    if (!isNaN(id)) {
        dispatch(PROGRESS_ACTIVE);
        request
            .post(`${URL}/blog/get`)
            .authBearer(cookie.load('token'))
            .type('form')
            .send({
                id: id
            })
            .end((err, res) => {
                if (err || !res.ok) {
                    let alert = Object.assign({}, SHOW_SNACKBAR, {
                        message: 'Error while loading the post'
                    });
                    dispatch(alert);
                    browserHistory.push('/');
                    onDialogSubmit(cookie.load('username'), cookie.load('password'), dispatch);
                    return;
                } else {
                    let data = JSON.parse(res.text);
                    let post = Object.assign({}, LOAD_POST, {
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        tags: data.tags,
                        media: data.media
                    });
                    dispatch(post);
                    dispatch(PROGRESS_INACTIVE);
                }
            });
    }
};

const onPostSubmit = (title, content, dispatch) => {
    dispatch(PROGRESS_ACTIVE);
    request
        .post(`${URL}/blog/create`)
        .authBearer(cookie.load('token'))
        .type('form')
        .send({
            title: title,
            content: content
        })
        .end((err, res) => {
            if (err || !res.ok) {
                let alert = Object.assign({}, SHOW_SNACKBAR, {
                    message: 'Error while posting your post'
                });
                dispatch(alert);
                return;
            } else {
                let data = JSON.parse(res.text);
                if (Number(data.status) === 0) {
                    let post = Object.assign({}, CREATE_POST, {
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        tags: data.tags,
                        media: data.media
                    });
                    dispatch(post);

                    //send notification through TCP
                    socket.emit('post created', data, () => {
                        let alert = Object.assign({}, SHOW_SNACKBAR, {
                            message: 'Your new content is successfully posted and others users are notified'
                        });
                        dispatch(alert);
                    });
                    browserHistory.push('/');
                    dispatch(PROGRESS_INACTIVE);
                }
            }
        });
};

const onTitleClick = (dispatch) => {
    dispatch(BACK_TO_HOME);
};

const mapStateToProps = (state) => {
    const id = Number(state.routing.locationBeforeTransitions.query.id);
    return {
        id: id,
        post: state.post,
        editorState: EditorState.createEmpty(),
        isProgressActive: state.progress.active
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleClick: () =>
            onTitleClick(dispatch),
        onEditorChange: () => {
        },
        onPostSubmit: (title, content) =>
            onPostSubmit(title, content, dispatch),
        onLoad: (id) =>
            onLoad(id, dispatch),
        onClearForm: () =>
            onClearForm(dispatch),
        dispatch
    };
};

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostSection);

export default Posts;
