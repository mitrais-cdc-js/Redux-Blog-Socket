import React from 'react';

import Main from './containers/sections';
import Posts from './containers/sections/posts';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

class App extends React.Component {
    render () {
        const { store } = this.props;
        const history = syncHistoryWithStore(browserHistory, store);
        return (<div >
            <Router history={history}>
                <Route path="/">
                    <IndexRoute component={Main} />
                    <Route path="/post" component={Posts} />
                </Route>
            </Router>
        </div>);
    }
}

App.propTypes = {
    store: React.PropTypes.object.isRequired
};

export default App;
