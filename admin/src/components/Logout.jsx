import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        localStorage.clear()
    }
    render() { 
        return ( 
            <React.Fragment>
                <h1>You have Been Logged out</h1>
                <Link to="/">
                    Login back
                </Link>
            </React.Fragment>
         );
    }
}
 
export default Logout;