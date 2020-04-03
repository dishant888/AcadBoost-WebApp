import React, { Component } from 'react';
import './login.css';
import Joi from 'joi';
import { Redirect } from "react-router-dom";
import UUIDv4 from 'uuid/v4';

class Login extends Component {
  constructor(props) {
    super(props);
    localStorage.clear()
    this.state = {
      username: "",
      password: "",
      error: "",
      loggedIn: false,
      loading: false,
      token: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const url = "http://localhost:3030/admin/authenticate/" + username + "/" + password;

    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required()
    };

    const body = {
      username: username,
      password: password
    };

    const { error } = Joi.validate(body, schema);

    if (error) {
      this.setState({
        username: username,
        password: password,
        error: error.details[0].message,
        loggedIn: false,
        loading: false,
        token:null
      });
    } else {
      this.setState({
        username: username,
        password: password,
        error: "",
        loggedIn: false,
        loading: true,
        token: null
      });

      fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data === 0) {
                    this.setState({
                            username:'',
                            password:'',
                            error: 'Invalid Credentials',
                            loggedIn: false,
                            loading: false,
                            token: null
                    })
                }else {
                    const token = UUIDv4()
                    localStorage.setItem('token',token)
                    this.setState({
                            username:username,
                            password:'',
                            error: '',
                            loggedIn: true,
                            loading: false,
                            token : token
                    })
                }
            })
        }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  logIn = () => {
    const { username, password, error,loading } = this.state;
    let btn = '';
    if(loading) {
        btn = (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
    }else {
        btn = (
          <button className="btn btn-sm rounded-0 btn-outline-secondary">
            LOGIN
          </button>
        );
    }

    return (
      <form onSubmit={this.handleSubmit} role="form" method="post">
        <fieldset className="fieldset">
          <legend className="legend">LOGIN</legend>
          <div className="form-group">
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              value={username}
              className="form-control input-lg"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
              className="form-control input-lg"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
              {btn}
          </div>
          <div className={error ? "alert alert-danger" : ""}>{error}</div>
        </fieldset>
      </form>
    );
  };

  render() {
      if(this.state.loggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/app",
                state: {
                  token: this.state.token,
                  username:this.state.username
                }
              }}
            />
          );
      }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <h2 className="text-center" id="title">
              AcadBoost
            </h2>
            <p className="text-center">
              <small id="passwordHelpInline" className="text-muted">
                {" "}
                Your mentor for Lifetime ;)
              </small>
            </p>
            <hr />
          </div>
          <div className="offset-md-3 col-md-6 col-12">{this.logIn()}</div>
        </div>
      </div>
    );
  }
}
 
export default Login;