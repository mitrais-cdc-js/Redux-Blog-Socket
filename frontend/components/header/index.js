import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { grey700 } from 'material-ui/styles/colors';
import { blue300, blue400, blue800, red300 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

var username;
var password;

class Headerbar extends Component {
    componentWillMount () {
        const { onLoad } = this.props;
        onLoad();
    }
    render () {
        const { snackbarActive, message, onSnackbarClose, isProgressActive,
            isDialogOpen, onDialogClose, onDialogSubmit, onLogout } = this.props;
        const style = {
            cursor: 'pointer',
            marginLeft: '20px',
            fontSize: '20px',
            fontWeight: '600',
            color: grey700,
            textDecoration: 'none'
        };
        const underlineStyle = {
            color: blue300
        };
        const actions = [
            <FlatButton label="Login" primary style={{ backgroundColor: blue400 }}
                onTouchTap={() => onDialogSubmit(username, password)} />,
            <FlatButton label="Cancel" disabled primary style={{ backgroundColor: red300 }} onTouchTap={onDialogClose} />
        ];
        return (
            <div>
                <Snackbar bodyStyle={{ backgroundColor: blue800 }} contentStyle={{ color: '#FFFFFF' }} open={snackbarActive} onRequestClose={onSnackbarClose} message={message} autoHideDuration={4000} />
                <Dialog contentStyle={{ textAlign: 'center' }} actions={actions}
                    title="Login to Redux Blog" open={isDialogOpen}>
                    <CircularProgress style={isProgressActive ? { display: 'inline-block' } : { display: 'none' }}
                        color={blue400} size={50} thickness={5} />
                    <TextField style={{ width: '100%' }} ref={(node) => (username = node)}
                        underlineFocusStyle={underlineStyle} hintText="Enter your username" /><br />
                    <TextField type="password" style={{ width: '100%' }} ref={(node) => (password = node)}
                        underlineFocusStyle={underlineStyle}
                        hintText="Enter your password" />
                </Dialog>
                <AppBar title={<Link to="/" style={style}>REDUX BLOG FRAMEWORK</Link>}
                    iconElementLeft={<div />}
                    iconElementRight={
                        <div>
                            <IconButton iconClassName="material-icons">assignment</IconButton>
                            <IconButton iconClassName="material-icons">people</IconButton>
                            <IconButton iconClassName="material-icons">pageview</IconButton>
                            <IconMenu iconButtonElement={
                                <IconButton iconClassName="material-icons">more_vert</IconButton>
                            }>
                                <MenuItem primaryText="Settings" />
                                <MenuItem onTouchTap={() => onLogout()} primaryText="Log Out" />
                            </IconMenu>

                        </div>
                    } />
            </div>
        );
    }
}

Headerbar.propTypes = {
    snackbarActive: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    onSnackbarClose: PropTypes.func.isRequired,
    isProgressActive: PropTypes.bool.isRequired,
    onLoad: PropTypes.func.isRequired,
    isDialogOpen: PropTypes.bool.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    onDialogSubmit: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default Headerbar;
