import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import './Login.css';

class Login extends Component {
   
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }
        this.state = {
            modalShow: false,
            username:'',
            password:'',
            loggedIn
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
        const { username, password } = this.state
        // logic 
        if(username === "A" && password === "B"){
            localStorage.setItem("token", "uyiwsgdfeswdiuovgedfiouvhgew")
            this.setState({
                loggedIn:true
            })
        }
    }
    
    render() {
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
                            <li><input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} /></li>
                            <li> <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/></li>
                            <li><input type="submit" /></li>
                        </ul>
                        </form>
                </Modal>
            </div>
        ); 
    }
}

export default Login;  