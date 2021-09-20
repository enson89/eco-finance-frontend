import React from "react";
import logo from "./logo.svg"
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.emailChange = this.emailChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.loginCheck = this.loginCheck.bind(this)
  }

  emailChange (e) {
    const temp = {...this.state}
    temp.email = e.target.value
    this.setState(temp)
  }

  passwordChange (e) {
    const temp = {...this.state}
    temp.password = e.target.value
    this.setState(temp)
  }

  loginCheck (e) {
    //username field
    console.log(this.state.email)
    //password field
    console.log(this.state.password)
    //Add login authentication as fit
    window.location = "/App/Portfolio"
  }

  render() {
    return (
        <div className="container">
          <h1 className="login-app-name">Ecofinance</h1>
          <br/>  
          <img src={logo} alt="brand logo" className="login-logo"/>
          <br/>
          <input
            type="text"
            className="login-input-text"
            placeholder="Email"
            onBlur={this.emailChange}
          />
          <br/>
          <br/>
          <input
            type="text"
            className="login-input-text"
            placeholder="Password"
            onBlur={this.passwordChange}
          />
          <br/>
          <button
            className="login-button"
            onClick={this.loginCheck}
          >
          Login
          </button>
          
        </div>
    );
  }
}

export default Login;
