import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

class Customer extends Component {
    constructor(props) {
        super(props);
        
        let loading = true
        this.state = {
            loading,
            movies: [],
            customer: []
        }

    }

    componentDidMount() {
        const token = localStorage.getItem("x-auth-token")
        if(this.props.loggedIn === true){
        axios.get('https://vidly-unique.herokuapp.com/api/movies', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({loading: false, movies: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        axios.get('https://vidly-unique.herokuapp.com/api/customers', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({customer: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        }
    
    }
   
    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    // customerName(){
    //     this.setState({addCustomerName:true, selectedBook: post.title})
    // }

    render(){
        const { movies, loading, customer } = this.state
        const customerNameList = customer.map(name => {
            return(
                <div className="row" key={name._id}>
                <Button onClick={() => alert(name.name + " wants to buy " + this.state.selectedBook)} >{name.name} </Button></div>
            )
        })
    
            return (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    </div>
                    <div className="col-2 logOutButton">
                    <Link to="/"><Button variant="primary" onClick={()=> {this.logOut()}}>Log Out</Button></Link>
                    </div>
                </div><hr />
                <div className="container">
                <div className="container list-header">
                    <div className="row">
                    <div className="col-4 header-component">{this.props.name}</div>
                    <div className="col-3 header-component">{this.props.type}</div>
                    <div className="col-3 header-component">{this.props.rate}</div>
                    <div className="col-2 header-component">{this.props.stock}</div>
                    </div>
                </div>
                { loading ? <div id="loading"><h4>Loading...</h4></div>
                : <div className="data">
                {
                movies.length ?
                movies.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l">
                    <Button onClick={()=> {this.setState({addCustomerName:true, selectedBook: post.title})}}>{post.title}</Button></div>
                    <div className="col-4 col-style pd-l">{post.genre.name}</div> 
                    <div className="col-2 col-style">{post.dailyRentalRate}$</div>
                    <div className="col-2 col-style pd-l">{post.numberInStock}</div> 
                    </div>
                    </div>
                </div>) :
                null
                } 
               </div>
                } 
              </div>

              <Modal isOpen={this.state.addCustomerName} 
                    onRequestClose={() => {this.setState({addCustomerName:false})}} 
                    ariaHideApp={false}
                    className="pop-content">
                    <form onSubmit={this.submitAddCustomerForm}>
                    <ul>
                        Choose customer : {customerNameList}
                        <li><input type="submit" /></li>
                        {/* {loading ? <h5>Loading...</h5> : null }
                        {createCustomer ? <h4>You have created a new Customer.</h4> : null }
                        {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null } */}
                    </ul>
                    </form>
                </Modal>

            </div>
            );
    }
}


export default Customer;