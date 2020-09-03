import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Modal from 'react-modal';

class Customer extends Component {
    // constructor(props) {
    //     super(props);
        
    //     let addCustomerName = false
    //     this.state = {
    //         addCustomerName
    //     }

    // }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { movies, loading, customer } = this.props
        // const customerNameList = customer.map(name => {
        //     return(
        //         <div key={name._id}>
        //         <Button variant="light" size="sm" 
        //         onClick={() => document.getElementById('selectedCustomer').innerHTML = name.name } >{name.name} </Button>
        //         </div>
        //     )
        // })
    
            return (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    <Button variant="primary addButton" onClick={()=> {this.setState({addCustomerShow:true})}}>Add Movie</Button>
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
                    <Button >{/*onClick={()=> {this.setState({addCustomerName:true, selectedBook: post.title})}} */} {post.title}</Button></div>
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

              {/* <Modal isOpen={this.state.addCustomerName} 
                    onRequestClose={() => {this.setState({addCustomerName:false})}} 
                    ariaHideApp={false}
                    className="pop-content">
                    <form onSubmit={this.submitAddCustomerForm}>

                       <div className="selectedItem">
                       <h3>Selected movie</h3> 
                       <div className="selected">{this.state.selectedBook}</div>
                       <h3>Selected customer</h3> 
                       <div className="selected" id="selectedCustomer"></div>
                       </div>
                        
                        <div className="selection">
                        <h3 >Choose customer</h3>
                        <div className="list">{customerNameList}</div>
                        <input type="submit" />
                        </div>
            
                        
                        {loading ? <h5>Loading...</h5> : null }
                        {createCustomer ? <h4>You have created a new Customer.</h4> : null }
                        {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null }
                    
                    </form>
                </Modal> */}

            </div>
            );
    }
}


export default Customer;