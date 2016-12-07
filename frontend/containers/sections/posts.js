import { connect } from 'react-redux';
import PostSection from '../../components/sections/posts';
import { BACK_TO_HOME } from '../../constants';
import { EditorState } from 'draft-js';

const onTitleClick = (dispatch) => {
    console.log(BACK_TO_HOME);
    dispatch(BACK_TO_HOME);
};

const mapStateToProps = (state) => {
    return {
        editorState: EditorState.createEmpty()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleClick: () =>
            onTitleClick(dispatch),
        onEditorChange: () => {
        },
        dispatch
    };
};

const Posts = connect(mapStateToProps, mapDispatchToProps)(PostSection);

export default Posts;
