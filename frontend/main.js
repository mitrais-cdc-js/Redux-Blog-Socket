import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducers from './reducers';
import App from './App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey200, grey700 } from 'material-ui/styles/colors';

injectTapEventPlugin(); //for Material-UI Tap Event

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

const muiTheme = getMuiTheme({
    fontFamily: 'Source Sans Pro, sans-serif',
    palette: {
        primary1Color: grey200,
        textColor: grey700,
        alternateTextColor: grey700
    },
    appBar: {
        height: 50
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <App store={store} />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('app'));


