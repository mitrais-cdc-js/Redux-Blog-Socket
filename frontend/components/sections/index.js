import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import { green400, blue400, grey700 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import Header from '../../containers/header';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

class MainSection extends Component {
    render () {
        const { isProgressActive } = this.props;
        const style = {
            width: 'auto',
            margin: '200px',
            marginTop: '50px',
            padding: '50px'
        };
        const linkstyle = {
            color: grey700,
            textDecoration: 'none'
        };
        const titleStyle = {
            fontFamily: 'Georgia, Source Sans Pro',
            fontSize: '22px'
        };
        return (
            <div>
            <Header />
            <Paper style={style} zDepth={1}>
                 <h1>Posts</h1>
                   <RaisedButton style={{ float: 'right', display: 'relative', marginTop: '-40px' }} overlayStyle={{ backgroundColor: green400 }} labelStyle={{ color: 'white' }} label="CREATE POST" icon={<FontIcon className="material-icons">create</FontIcon>} />
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                <CircularProgress color={blue400} size={80} thickness={7}
                style={isProgressActive ? { display: 'inline-block' } : { display: 'none' }} />
            </div>
              <Table>
                    <TableBody displayRowCheckbox={false}>
                         <TableRow>
                          <TableRowColumn colSpan="1">
                            <IconButton iconClassName="material-icons">edit</IconButton>
                             <IconButton iconClassName="material-icons">delete</IconButton>
                          </TableRowColumn>
                            <TableRowColumn colSpan="3">
                                <h2 style={titleStyle}><Link style={linkstyle} to={{ pathname: '/posts', query: { id: 1 } }}>This is Post Title</Link></h2>
                                <p>This is post description and content</p>
                            </TableRowColumn>
                            <TableRowColumn colSpan="1">
                                <p>17 November 2016 10:00:01</p>
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                          <TableRowColumn colSpan="1">
                            <IconButton iconClassName="material-icons">edit</IconButton>
                             <IconButton iconClassName="material-icons">delete</IconButton>
                          </TableRowColumn>
                            <TableRowColumn colSpan="3">
                                <h2 style={titleStyle}><Link style={linkstyle} to={{ pathname: '/posts', query: { id: 2 } }}>This is Post Title</Link></h2>
                                <p>This is post description and content</p>
                            </TableRowColumn>
                            <TableRowColumn colSpan="1">
                                <p>17 November 2016 10:00:01</p>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
}

MainSection.propTypes = {
    isProgressActive: PropTypes.bool.isRequired,
    onTitleClick: PropTypes.func.isRequired
};

export default MainSection;
