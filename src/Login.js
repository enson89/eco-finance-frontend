import React from "react";
import logo from "./logo.svg"
import "./App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: ""};
    this.emailChange = this.emailChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.loginCheck = this.loginCheck.bind(this)
  }

  emailChange (e) {
    const temp = {...this.state}
    temp.username = e.target.value
    this.setState(temp)
  }

  passwordChange (e) {
    const temp = {...this.state}
    temp.password = e.target.value
    this.setState(temp)
  }

  async loginCheck (e) {
    //user and pw data
    fetch('https://eco-finance-backend.herokuapp.com/api/login', {
      method: 'POST',
      headers: {"Content-Type" :'application/json'},
      body: JSON.stringify({...this.state})
    })
    .then(response => response.status === 200 ? 
      window.location = "/App/Portfolio" : console.log('Invalid Credentials'))
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
            type="password"
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
