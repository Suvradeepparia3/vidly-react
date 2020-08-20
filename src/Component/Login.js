import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Login.css';


class Login extends Component {
    
    render() {
        return (
            <div>
                <div className="body"></div>
                <div className="content">
                <Button variant="success login">Log In</Button>
                <Button variant="primary signup">Sign Up</Button>
                </div>
            </div>
        ); 
    }
}

export default Login;  