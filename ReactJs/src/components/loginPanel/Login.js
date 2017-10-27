import React from 'react';

import '../../lib/bootstrap-4.0.0-beta/dist/css/bootstrap.min.css';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var axios = require('axios');

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            snackError: false
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.startRequest = this.startRequest.bind(this);
    }

    handleCloseError = () => {
        this.setState({
            snackError: false
        });
    };

    handleChangePassword = (ev) => {
        this.setState({ password: ev.target.value });
    };

    handleChangeUsername = (ev) => {
        this.setState({ username: ev.target.value });
    };

    handleLogin = () => {
        if (this.state.username === undefined || this.state.username === '') {
            return;
        }
        if (this.state.password === undefined || this.state.password === '') {
            return;
        }

        var jsonLogin = {
            "login": this.state.username,
            "pwd": this.state.password
        }

        this.startRequest(jsonLogin, this.props.handleConnected);

    };

    startRequest = (jsonLogin, callback) => {
        axios.post('http://localhost:1337/auth', jsonLogin)
            .then(function (response) {
                console.log('test');
                response = response.data;
                console.log(response);
                if (response.validAuth !== true) {
                    console.log('test2');
                    //TODO
                    return;
                }
                else {
                    console.log('test3');
                    callback(response.role);
                    return;
                }
            })
            .catch(function (error) {
                console.log("catch");
                alert(error);
                return;
            });
    };

    render() {

        return (
            <div>
                <Paper zDepth={3} style={{ marginBottom: "3vh" }}>
                    <AppBar
                        title="Connection"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </Paper>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <CardTitle
                                    title="Login Form"
                                    subtitle="Please enter your username and password to access the service"
                                />
                                <CardText>
                                    <TextField
                                        hintText="Username"
                                        floatingLabelText="Username"
                                        onChange={this.handleChangeUsername}
                                    />
                                    <TextField
                                        style={{ marginLeft: "20px" }}
                                        hintText="Password"
                                        floatingLabelText="Password"
                                        type="password"
                                        onChange={this.handleChangePassword}
                                    />
                                </CardText>
                                <CardActions>
                                    <FlatButton
                                        label="Login"
                                        onClick={this.handleLogin}
                                    />
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.snackError}
                    message={this.state.errorMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleCloseError}
                />
            </div>
        );



    }


}

