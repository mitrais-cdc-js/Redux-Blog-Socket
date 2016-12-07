import { connect } from 'react-redux';
import MainSection from '../../components/sections';
import { BACK_TO_HOME } from '../../constants';

const onTitleClick = (dispatch) => {
    console.log(BACK_TO_HOME);
    dispatch(BACK_TO_HOME);
};

const mapStateToProps = (state) => {
    return {
        isProgressActive: state.progress.active
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleClick: () =>
            onTitleClick(dispatch),
        dispatch
    };
};

const Main = connect(mapStateToProps, mapDispatchToProps)(MainSection);

export default Main;
