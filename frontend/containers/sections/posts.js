import { connect } from 'react-redux';
import PostSection from '../../components/sections/posts';
import {
    BACK_TO_HOME, URL, SHOW_SNACKBAR, CREATE_POST, PROGRESS_ACTIVE, PROGRESS_INACTIVE,
    LOAD_POST, CLEAR_POST, UPDATE_POST, WRITE_TITLE, WRITE_CONTENT
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

const onTitleChanged = (e, dispatch) => {
    dispatch(Object.assign({}, WRITE_TITLE, {
        title: e.target.value
    }));
};

const onContentChanged = (e, dispatch) => {
    dispatch(Object.assign({}, WRITE_CONTENT, {
        content: e.target.value
    }));
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

                    //set each text field
                    dispatch(Object.assign({}, WRITE_TITLE, {
                        title: data.title
                    }));
                    dispatch(Object.assign({}, WRITE_CONTENT, {
                        content: data.content
                    }));

                    dispatch(post);
                    dispatch(PROGRESS_INACTIVE);
                }
            });
    }
};

const onPostSubmit = (id, title, content, dispatch) => {
    dispatch(PROGRESS_ACTIVE);
    var url = `${URL}/blog/create`;
    var socketAction = 'post created';
    var postedMessage = 'Your new content is successfully posted and others users are notified';
    if (!isNaN(id)) {
        url = `${URL}/blog/update`;
        socketAction = 'post updated';
        postedMessage = 'Your post is modified';
    }
    request
        .post(url)
        .authBearer(cookie.load('token'))
        .type('form')
        .send({
            id: id,
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
                    let post = Object.assign({}, isNaN(id) ? CREATE_POST : UPDATE_POST, {
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        tags: data.tags,
                        media: data.media
                    });
                    dispatch(post);

                    var newdata = Object.assign({}, data, {
                        author: cookie.load('fullname')
                    });

                    //send notification through TCP
                    socket.emit(socketAction, newdata, () => {
                        let alert = Object.assign({}, SHOW_SNACKBAR, {
                            message: postedMessage
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
        isProgressActive: state.progress.active,
        titleText: state.textfield.title,
        contentText: state.textfield.content
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleClick: () =>
            onTitleClick(dispatch),
        onEditorChange: () => {
        },
        onPostSubmit: (id, title, content) =>
            onPostSubmit(id, title, content, dispatch),
        onLoad: (id) =>
            onLoad(id, dispatch),
        onClearForm: () =>
            onClearForm(dispatch),
        onTitleChanged: (e) =>
            onTitleChanged(e, dispatch),
        onContentChanged: (e) =>
            onContentChanged(e, dispatch),
        dispatch
    };
};

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostSection);

export default Posts;
