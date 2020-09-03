import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


class Customer extends Component {
    constructor(props) {
        super(props);

        let loadingCreateCustomer = false
        let createCustomer = false
        let errorMsg = false

        this.state = {
            loadingCreateCustomer, 
            createCustomer, 
            errorMsg, 
            name: '', 
            phoneNo: '', 
            subscribe: ''
        }
        this.addCustomer = this.addCustomer.bind(this)
        this.submitAddCustomerForm = this.submitAddCustomerForm.bind(this)
    }


    addCustomer(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitAddCustomerForm(e){
        e.preventDefault()
        const { name, phoneNo, subscribe} =this.state
        this.setState({
            loadingCreateCustomer: true
        })
        axios.post('https://vidly-unique.herokuapp.com/api/customers', {name, phoneNo, subscribe})
        .then( response => {
            console.log(response)
            this.setState({ loadingCreateCustomer: false, createCustomer: true })
        })
        .catch( error => {
            console.log(error)
            this.setState({ loadingCreateCustomer: false, errorMsg: true })
        })
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { loadingCreateCustomer, errorMsg, createCustomer } = this.state
        const { customer, loadingCustomerList, movies } = this.props
        const movieNameList = movies.map(name => {
            return(
                <div key={name._id}>
                <Button variant="light" size="sm" 
                onClick={() => document.getElementById('selectedBook').innerHTML = name.title } >{name.title} </Button>
                </div>
            )
        })
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    <Button variant="primary addButton" onClick={()=> {this.setState({addCustomerShow:true})}}>Add Customer</Button>
                    </div>
                    <div className="col-2 logOutButton">
                    <Link to="/"><Button variant="primary" onClick={()=> this.logOut()}>Log Out</Button></Link>
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
                    <div className="col-4 col-style pd-l">
                    <Button onClick={() => {this.setState({addMovieName:true, selectedCustomer: post.name})}}>{post.name}</Button></div>
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
                            {loadingCreateCustomer ? <h5>Loading...</h5> : null }
                            {createCustomer ? <h4>You have created a new Customer.</h4> : null }
                            {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null }
                        </ul>
                        </form>
                </Modal>

                <Modal isOpen={this.state.addMovieName} 
                    onRequestClose={() => {this.setState({addMovieName:false})}} 
                    ariaHideApp={false}
                    className="pop-content">
                    <form onSubmit={this.submitAddCustomerForm}>

                       <div className="selectedItem">
                       <h3>Selected customer</h3> 
                       <div className="selected">{this.state.selectedCustomer}</div>
                       <h3>Selected movie</h3> 
                       <div className="selected" id="selectedBook"></div>
                       </div>
                        
                        <div className="selection">
                        <h3 >Choose movie</h3>
                        <div className="list">{movieNameList}</div>
                        <input type="submit" />
                        </div>
            
                        
                        {/* {loading ? <h5>Loading...</h5> : null }
                        {createCustomer ? <h4>You have created a new Customer.</h4> : null }
                        {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null } */}
                    
                    </form>
                </Modal>
            </div>
        );
    }
}


export default Customer;      