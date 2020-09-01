import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';


class Customer extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        let loadingCustomerList = true
        let loading = false
        let createCustomer = false
        let errorMsg = false
        if(token == null){
            loggedIn = false
        }

        this.state = {
            customer: [], loggedIn, loadingCustomerList, loading, createCustomer, errorMsg, name: '', phoneNo: '', subscribe: ''
        }
        this.addCustomer = this.addCustomer.bind(this)
        this.submitAddCustomerForm = this.submitAddCustomerForm.bind(this)
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
            this.setState({loadingCustomerList: false, customer: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        }
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    addCustomer(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitAddCustomerForm(e){
        e.preventDefault()
        const { name, phoneNo, subscribe} =this.state
        console.log(name, phoneNo, subscribe)
        this.setState({
            loading: true
        })
        axios.post('https://vidly-unique.herokuapp.com/api/customers', {name, phoneNo, subscribe})
        .then( response => {
            console.log(response)
            this.setState({ loading: false, createCustomer: true })
        })
        .catch( error => {
            console.log(error)
            this.setState({ loading: false, errorMsg: true })
        })
    }

    render(){
        const { customer, loading, loadingCustomerList, errorMsg, createCustomer } = this.state
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
                    <div className="container list-header">
                    <div className="row">
                    <div className="col-4 header-component">{this.props.name}</div>
                    <div className="col-4 header-component">{this.props.phone}</div>
                    <div className="col-4 header-component">{this.props.prime}</div>
                    </div>
                    </div>
            
                {loadingCustomerList ? <div id="loading"><h4>Loading...</h4></div> : <div className="data">
                {
                customer.length ?
                customer.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l"><Button onClick={() => alert(post._id)}>{post.name}</Button></div>
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

              <Modal isOpen={this.state.addCustomerShow} 
                       onRequestClose={() => {this.setState({addCustomerShow:false})}} 
                       ariaHideApp={false}
                       className="pop-content">
                        <form onSubmit={this.submitAddCustomerForm}>
                        <ul>
                            <li><input type="text" placeholder="Name" required name="name" value={this.state.name} onChange={this.addCustomer} /></li>     
                            <li><input type="number" placeholder="Phone No" name="phoneNo" value={this.state.phoneNo} onChange={this.addCustomer} /></li>
                            <label htmlFor="subscribe" style={{color: "white", margin: "0px 10px 20px 0px"}}>Subscription:</label>
                            <select id="subscribe" name="subscribe" onChange={this.addCustomer} required>
                                    <option value="" >---</option>
                                    <option value="true" >Gold</option>
                                    <option value="false">Not Gold</option>
                            </select>
                            <li><input type="submit" /></li>
                            {loading ? <h5>Loading...</h5> : null }
                            {createCustomer ? <h4>You have created a new Customer.</h4> : null }
                            {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null }
                        </ul>
                        </form>
                </Modal>

            </div>
        );
    }
}


export default Customer;      