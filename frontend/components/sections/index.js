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
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

class MainSection extends Component {
    render () {
        const { onDeleteClick, isProgressActive, posts } = this.props;
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
                    <RaisedButton style={{ float: 'right', display: 'relative', marginTop: '-40px' }}
                        overlayStyle={{ backgroundColor: green400 }}
                        labelStyle={{ color: 'white' }} label="CREATE POST"
                        containerElement={<Link style={{ color: '#FFFFFF', textDecoration: 'none' }}
                        to="/post">CREATE POST</Link>} icon={<FontIcon className="material-icons">create</FontIcon>} />
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <CircularProgress color={blue400} size={80} thickness={7}
                            style={isProgressActive ? { display: 'inline-block' } : { display: 'none' }} />
                    </div>
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            {posts.map(post =>
                                <TableRow key={post.id}>
                                    <TableRowColumn colSpan="1">
                                        <Link to={{ pathname: '/post', query: { id: post.id } }}>
                                        <IconButton iconClassName="material-icons">edit</IconButton></Link>
                                        <IconButton onTouchTap={() => onDeleteClick(post.id)}
                                        iconClassName="material-icons">delete</IconButton>
                                    </TableRowColumn>
                                    <TableRowColumn colSpan="3">
                                        <h2 style={titleStyle}><Link style={linkstyle}
                                            to={{ pathname: '/post', query: { id: post.id } }}>{post.title}</Link></h2>
                                        <p>{post.content}</p>
                                    </TableRowColumn>
                                    <TableRowColumn colSpan="1">
                                        <p>{post.time}</p>
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Paper zDepth={1}>
                        <BottomNavigation>
                            <BottomNavigationItem
                                label={<span style={linkstyle}>Refresh</span>}
                                icon={<FontIcon style={linkstyle} className="material-icons">refresh</FontIcon>}
                                />
                        </BottomNavigation>
                    </Paper>
                </Paper>
            </div>
        );
    }
}

MainSection.propTypes = {
    isProgressActive: PropTypes.bool.isRequired,
    onTitleClick: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string,
        media: PropTypes.string,
        tags: PropTypes.string
    }).isRequired).isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default MainSection;
