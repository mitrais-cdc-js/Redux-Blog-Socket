import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { blue300, green400 } from 'material-ui/styles/colors';
import Header from '../../containers/header';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

class PostSection extends Component {
    render () {
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
                 <h1>Edit Posts - [Your Title]</h1>
                 <TextField style={{ width: '100%' }} underlineFocusStyle={underlineStyle}
                 hintStyle={textAreaStyle} hintText="Enter your title here..." inputStyle={textAreaStyle}/>
                 <TextField style={{ width: '100%' }} floatingLabelFixed
                 multiLine rows={10} floatingLabelStyle={{ fontSize: '20px' }}
                 underlineFocusStyle={underlineStyle} floatingLabelText="Enter your content here..."/>
                  <RaisedButton overlayStyle={{ backgroundColor: green400 }}
                  labelStyle={{ color: 'white' }} label="SAVE POST"
                  icon={<FontIcon className="material-icons">create</FontIcon>} />
            </Paper>
            </div>
        );
    }
}

PostSection.propTypes = {
    onEditorChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    onTitleClick: PropTypes.func.isRequired
};

export default PostSection;
