import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';


class Customer extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        let loading = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            customer: [],
            loggedIn,
            loading
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("x-auth-token")
        if(this.state.loggedIn === true){
        axios.get('https://vidly-unique.herokuapp.com/api/customers', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({loading: false, customer: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        }
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { customer, loading } = this.state
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
         }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    <Button variant="primary addButton" onClick={()=> {this.setState({addCustomerShow:true})}}>Add Customer</Button>
                    </div>
                    <div className="col-2 logOutButton">
                    <Link to="/"><Button variant="primary" onClick={()=> {this.logOut()} }>Log Out</Button></Link>
                    </div>
                </div><hr />
                <div className="container">
              
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <div className="row">
                    <div className="col-4 tb-header"><th>{this.props.name}</th></div>
                    <div className="col-4 tb-header"><th>{this.props.phone}</th></div>
                    <div className="col-4 tb-header"><th>{this.props.prime}</th></div>
                    </div>
                    </tr>
                </thead>
                </Table>
                <Modal isOpen={this.state.addCustomerShow} 
                       onRequestClose={() => {this.setState({addCustomerShow:false})}} 
                       className="pop-content">
                        <form onSubmit={this.submitSignupForm}>
                        <ul>
                            <li><input type="text" placeholder="Your name" minLength="5" required name="name" value={this.state.name} onChange={this.onSignup} /></li>
                            <li><input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onSignup} /></li>
                            <li><input type="password" placeholder="Password" name="password" minLength="8" required value={this.state.password} onChange={this.onSignup}/></li>
                            <li><input type="submit" /></li>
                            {/* {loading ? <h5>Loading...</h5> : null }
                            {createAccount ? <h4>You have created an account.</h4> : null }
                            <div id="invalid-msg">{msg}</div> */}
                        </ul>
                        </form>
                </Modal>
                {loading ? <div id="loading"><h4>Loading...</h4></div> : <div>
                {
                customer.length ?
                customer.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l">{post.name}</div>
                    <div className="col-4 col-style pd-l">{post.phone}</div> 
                    <div className="col-4 col-style pd-l" >
                    { (post.isGold === 'true' &&
                       <p>Gold</p>) || <p>Not Gold</p>
                    }</div>
                    </div>
                    </div>
                </div>) :
                null
                } 
               </div>
                } 
              </div>
            </div>
        );
    }
}


export default Customer;