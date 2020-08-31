import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './Login.css';

class Login extends Component {
   
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        let loading = false
        let invalidMsg = false
        let createAccount = false
        if(token == null){
            loggedIn = false
        }
        this.state = {
            name: '',
            email:'',
            password:'',
            loggedIn,
            loading,
            invalidMsg,
            createAccount
        }
        this.onLogin = this.onLogin.bind(this)
        this.onSignup = this.onSignup.bind(this)
        this.submitLoginForm = this.submitLoginForm.bind(this)
        this.submitSignupForm = this.submitSignupForm.bind(this)
    }

    onLogin(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitLoginForm(e){
        e.preventDefault()
        this.setState({
            loading: true,
            invalidMsg: false
        })
        const { email, password } = this.state
        axios.post('https://vidly-unique.herokuapp.com/api/auth', {email, password})
        .then( respone => {
            localStorage.setItem("x-auth-token", respone.headers['x-auth-token'])
            this.setState({
                loggedIn:true
            })
        })
        .catch ( error => {
            console.log(error)
            this.setState({
                loading: false,
                invalidMsg: true
            })
        })
    }

    onSignup(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitSignupForm(e){
        e.preventDefault()
        this.setState({
            loading: true,
            createAccount: false
        })
        const { name, email, password } = this.state
        console.log(email, password)
        axios.post('https://vidly-unique.herokuapp.com/api/users', {name, email, password})
        .then( response => {
            console.log(response)
            this.setState({
                loading: false,
                createAccount: true
            })
        })
        .catch ( error => {
            console.log('response: ', error.response.data);
            this.setState({
                loading: false,
                msg: error.response.data
            })
        })
    }
    
    render() {
        const { loading, invalidMsg, createAccount, msg } = this.state
        if(this.state.loggedIn){
            return <Redirect to="/Dashboard" />
        }
        return (
            <div>
                <div className="body"></div>
                <div className="content">
                <Button variant="success login" onClick={()=> {this.setState({loginModalShow:true})}}>Log In</Button>
                <Button variant="primary signup" onClick={()=> {this.setState({signupModalShow:true})}}>Sign Up</Button>
                </div>

                {/* ********** For Login Modal ********* */}
                <Modal isOpen={this.state.loginModalShow} 
                       onRequestClose={() => {this.setState({loginModalShow:false})}} 
                       className="pop-content">
                        <form onSubmit={this.submitLoginForm}>
                        <ul>
                            <li><input type="text" placeholder="Email" required name="email" value={this.state.email} onChange={this.onLogin} /></li>
                            <li> <input type="password" placeholder="Password" minLength="8" required name="password" value={this.state.password} onChange={this.onLogin}/></li>
                            <li><input type="submit" /></li>
                            {loading ? <h5>Loading...</h5> : null }
                            {invalidMsg ? <p id="invalid-msg">Invalid Email or Password</p> : null }
                        </ul>
                        </form>
                </Modal>

                  {/* ********** For Signup Modal ********* */}
                <Modal isOpen={this.state.signupModalShow} 
                       onRequestClose={() => {this.setState({signupModalShow:false})}} 
                       className="pop-content">
                        <form onSubmit={this.submitSignupForm}>
                        <ul>
                            <li><input type="text" placeholder="Your name" minLength="5" required name="name" value={this.state.name} onChange={this.onSignup} /></li>
                            <li><input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onSignup} /></li>
                            <li><input type="password" placeholder="Password" name="password" minLength="8" required value={this.state.password} onChange={this.onSignup}/></li>
                            <li><input type="submit" /></li>
                            {loading ? <h5>Loading...</h5> : null }
                            {createAccount ? <h4>You have created an account.</h4> : null }
                            <div id="invalid-msg">{msg}</div>
                        </ul>
                        </form>
                </Modal>
            </div>
        ); 
    }
}

export default Login;          