import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import Main from './components/mainPanel/Main';
import Login from './components/loginPanel/Login';

const AppLogin = () => (
    <MuiThemeProvider>
        <Login handleConnected={handleConnected} />
    </MuiThemeProvider>
);
const App = () => (
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>
);

var handleConnected = (role) => {
    if(role === 'ADMIN')
        ReactDOM.render(
            <App 
            />,
            document.getElementById('root')
        );
};

ReactDOM.render(
    <AppLogin />,
    document.getElementById('root')
);


//ReactDOM.render(<Main />, document.getElementById('root'));
