import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter as Router,Redirect,Route } from "react-router-dom";

class Admin extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token')
        let verified = true;

        let verifiedToken = 'notVerified';
        if(this.props.location.state){
            verifiedToken = this.props.location.state.token;
        }

        if (token === null) {
          verified = false;
        }

        if(verifiedToken === 'notVerified') {
            verified = false;
        }

        this.state = {
            loggedIn: verified
        }
    }
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to="/" />
        }
        return ( 
            <React.Fragment>
                <Router>
                    <Header data={this.props.location.state.username} />
                    <Main />
                </Router>
            </React.Fragment>
         );
    }
}
 
export default Admin;