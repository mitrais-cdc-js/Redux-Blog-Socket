import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { blue300, green400 } from 'material-ui/styles/colors';
import Header from '../../containers/header';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { blue400 } from 'material-ui/styles/colors';

class PostSection extends Component {
    componentWillMount () {
        const { onLoad, id } = this.props;
        onLoad(id);
    }
    componentWillUnmount () {
        const { onClearForm } = this.props;
        onClearForm();
    }
    render () {
        const { id, onPostSubmit, isProgressActive, onTitleChanged, onContentChanged } = this.props;
        var { titleText, contentText } = this.props;
        const style = {
            width: 'auto',
            margin: '200px',
            marginTop: '50px',
            padding: '50px'
        };
        const underlineStyle = {
            color: blue300
        };
        const textAreaStyle = {
            fontSize: '22px',
            fontFamily: 'Georgia, Source Sans Pro'
        };
        return (
            <div>
                <Header />
                <Paper style={style} zDepth={1}>
                    <CircularProgress color={blue400} size={60} thickness={5}
                        style={isProgressActive ? { display: 'inline-block' } : { display: 'none' }} />
                    <h1>{!isNaN(id) ? 'Edit Post' : 'Create Post'}</h1>
                    <TextField value={titleText} onChange={onTitleChanged} style={{ width: '100%' }}
                        underlineFocusStyle={underlineStyle} hintStyle={textAreaStyle}
                        hintText="Enter your title here..." inputStyle={textAreaStyle} />
                    <TextField value={contentText} onChange={onContentChanged} style={{ width: '100%' }}
                    floatingLabelFixed multiLine rows={10} floatingLabelStyle={{ fontSize: '20px' }}
                        underlineFocusStyle={underlineStyle} floatingLabelText="Enter your content here..." />
                    <RaisedButton onTouchTap={() => onPostSubmit(id, titleText, contentText)}
                        overlayStyle={{ backgroundColor: green400 }}
                        labelStyle={{ color: 'white' }} label="SAVE POST"
                        icon={<FontIcon className="material-icons">create</FontIcon>} />
                </Paper>
            </div>
        );
    }
}

PostSection.propTypes = {
    id: PropTypes.number.isRequired,
    onEditorChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    onTitleClick: PropTypes.func.isRequired,
    onPostSubmit: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    isProgressActive: PropTypes.bool.isRequired,
    onClearForm: PropTypes.func.isRequired,
    onTitleChanged: PropTypes.func.isRequired,
    onContentChanged: PropTypes.func.isRequired,
    titleText: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired
};

export default PostSection;
