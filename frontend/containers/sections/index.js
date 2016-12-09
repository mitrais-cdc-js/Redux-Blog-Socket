import { connect } from 'react-redux';
import MainSection from '../../components/sections';
import { BACK_TO_HOME, DELETE_DIALOG_OPEN } from '../../constants';

const onDeleteClick = (id, dispatch) => {
    dispatch(Object.assign({}, DELETE_DIALOG_OPEN, {
        id: id
    }));
};

const onTitleClick = (dispatch) => {
    console.log(BACK_TO_HOME);
    dispatch(BACK_TO_HOME);
};

const mapStateToProps = (state) => {
    return {
        isProgressActive: state.progress.active,
        posts: state.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleClick: () =>
            onTitleClick(dispatch),
        onDeleteClick: (id) =>
            onDeleteClick(id, dispatch),
        dispatch
    };
};

const Main = connect(mapStateToProps, mapDispatchToProps)(MainSection);

export default Main;
