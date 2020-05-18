import React, {Component} from 'react';
import axios from "axios";
import * as Config from "../../../config"
import "./Account.scss"
import SimpleConfirmModal from "../../../components/Modals/SimpleConfirmModal";
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.finishLogin = this.finishLogin.bind(this);
        this.finishRegister = this.finishRegister.bind(this);
        this.state = {
            username: "",
            password: "",
            userNameErrorMessage: "",
            showUserError: false,
            passwordErrorMessage: "",
            showPasswordError: false,
            showLoginConfirmModal: false,
            showRegisterConfirmModal: false
        };
    }
    render() {
        return (
            <div>
                <SimpleConfirmModal hidden={!this.state.showLoginConfirmModal} title="Login Success!"
                                    closeModal={this.finishLogin}/>
                <SimpleConfirmModal hidden={!this.state.showRegisterConfirmModal} title="Register Success!"
                                    closeModal={this.finishRegister}/>
                <div className="loginContainer">
                    <h1>Log in</h1>
                    <h4>User Name:</h4>
                    <input type="text" value={this.state.username} onChange={this.changeUsername}/>
                    <span style={{"color": "red"}} hidden={!this.state.showUserError}>{this.state.userNameErrorMessage}</span>
                    <h4>Password:</h4>
                    <input type="password" value={this.state.password} onChange={this.changePassword}/>
                    <span style={{"color": "red"}} hidden={!this.state.showPasswordError}>{this.state.passwordErrorMessage}</span>
                    <button onClick={this.login}>Log in</button>
                    <button onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }

    async login() {
        let loginUrl = Config.API_ROOT + '/login';
        try {
            const response =
                await axios.post(loginUrl,
                    {username: this.state.username, password: this.state.password})
        } catch (e) {
            console.log(e)
        }
        this.setState({
            hideLoginConfirmModal: true
        })
    }

    async register() {
        let registerUrl = Config.API_ROOT + '/register';
        if (this.state.password.length < 6) {
            this.setState({
                ...this.state,
                passwordErrorMessage: "Password length must be longer than 5",
                showPasswordError: true
            });
            return;
        }
        try {
            const response =
                await axios.post(registerUrl,
                    { username: this.state.username, password: this.state.password})
        } catch (e) {
            switch (e.response.status) {
                case 409:
                    this.setState({
                        ...this.state,
                        userNameErrorMessage: "User Already Exists!",
                        showUserError: true
                    })
                    break;
                default:
                    console.log(e)
            }
        }
        this.setState({
            showRegisterConfirmModal: true
        })
    }

    changePassword(password) {
        this.setState({
            ...this.state,
            password:password.target.value
        })
    }

    changeUsername(username) {
        this.setState({
            ...this.state,
            username:username.target.value,
            userNameErrorMessage: "",
            showUserError: false
        })
    }

    finishLogin() {
        this.setState({
            ...this.state,
            showLoginConfirmModal: false
        })
    }

    finishRegister() {
        this.setState({
            ...this.state,
            showRegisterConfirmModal: false
        })
    }
}
