import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
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
        if(token == null){
            loggedIn = false
        }
        this.state = {
            modalShow: false,
            email:'',
            password:'',
            loggedIn,
            loading,
            invalidMsg
        }
        this.onChange = this.onChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm(e){
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
        // TESTING PURPOSE
        // logic 
        // if(email === "A" && password === "B"){
        //     localStorage.setItem("token", "uyiwsgdfeswdiuovgedfiouvhgew")
        //     this.setState({
        //         loggedIn:true
        //     })
        // }
    }
    
    render() {
        const { loading, invalidMsg } = this.state
        if(this.state.loggedIn){
            return <Redirect to="/Dashboard" />
        }
        return (
            <div>
                <div className="body"></div>
                <div className="content">
                <Button variant="success login" onClick={()=> {this.setState({modalShow:true})}}>Log In</Button>
                <Link to="/Dashboard"><Button variant="primary signup">Sign Up</Button></Link>
                </div>

                <Modal isOpen={this.state.modalShow} 
                       onRequestClose={() => {this.setState({modalShow:false})}} 
                       className="pop-content">
                        <form onSubmit={this.submitForm}>
                        <ul>
                            <li><input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} /></li>
                            <li> <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/></li>
                            <li><input type="submit" /></li>
                            {loading ? <h5>Loading...</h5> : null }
                            {invalidMsg ? <p id="invalid-msg">Invalid Email or Password</p> : null }
                        </ul>
                        </form>
                </Modal>
            </div>
        ); 
    }
}

export default Login;  