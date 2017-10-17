import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import Main from './components/mainPanel/Main';

const App = () => (
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//ReactDOM.render(<Main />, document.getElementById('root'));
