import React, { Component } from 'react';
import Joi from 'joi';
import './auth.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Login:{
                email: '',
                password: '',
                error:''
            },
            Signup:{
                name: '',
                email: '',
                password: ''
            }
         }
    }

    handleLoginChange = e => {
        const {name,value} = e.target
        const currentState = {...this.state.Login}
        currentState[name] = value
        this.setState({
            Login: currentState
        })
    }

    handleLoginSubmit = e => {
        e.preventDefault()
        const {email,password} = this.state.Login
        const url = "http://localhost:3030/user/authenticate/" + email + "/" + password

        const schema ={
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }

        const body = {
            email: email,
            password: password
        }
        const { error } = Joi.validate(body, schema);

        if(error) {
            this.setState({
              Login: {
                email: email,
                password: password,
                error: error.details[0].message
              }
            })
        } else {
        // console.log(error.details[0].message)
        this.setState({
          Login: {
            email: email,
            password: password,
            error: ''
          }
        })

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data === 0) {
                    this.setState({
                        Login:{
                            email:email,
                            password:'',
                            error: 'Invalid Credentials'
                        }
                    })
                }else {
                    localStorage.setItem('user',JSON.stringify(data[0]))
                    // console.log(data)
                }
            })
        }
    }

    logIn = () => {
        const {Login: login} = this.state
        console.log(localStorage.getItem('user'))
        return (
            <form onSubmit={this.handleLoginSubmit} role="form" method="post">
                <fieldset className="fieldset">
                    <legend className="legend">LOGIN</legend>
                    <div className="form-group">
                        <input type="text" name="email" onChange={this.handleLoginChange} value={login.email}  className="form-control input-lg" placeholder="Email" />
					</div>
                    <div className="form-group">
                        <input type="password" name="password" onChange={this.handleLoginChange} value={login.password} className="form-control input-lg" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm rounded-0 btn-outline-secondary">
                            LOGIN
                        </button>
                    </div>
                    <div className={this.state.Login.error ? 'alert alert-danger': ''}>
                            {this.state.Login.error}
                    </div>
                </fieldset>
            </form>
        )
    }

    signUp = () => {
        return (
            <form role="form" method="post">
                <fieldset className="fieldset">
                    <legend className="legend">SIGN UP</legend>
                    <div className="form-group">
                        <input type="text" name="name" className="form-control input-lg" placeholder="Full Name " />
                    </div>
                    <div className="form-group">
                        <input type="text" name="email" className="form-control input-lg" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="text" name="password" className="form-control input-lg" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm rounded-0 btn-outline-secondary">
                            SIGNUP
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }


    render() { 
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center" id="title">AcadBoost</h2>
                        <p className="text-center">
                            <small id="passwordHelpInline" className="text-muted"> Your mentor for Lifetime ;)</small>
                        </p>
                        <hr/>
                    </div>
                    <div className="col-md-6 col-12">
                        {this.logIn()}
                    </div>
                    <div className="col-md-6 col-12">
                        {this.signUp()}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Auth;