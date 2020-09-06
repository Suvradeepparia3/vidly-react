import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
class Customer extends Component {
    constructor(props) {
        super(props);
        
        let loadingCreateMovie = false
        let createMovie = false
        let errorMsg = false
        // let addCustomerName = false
        this.state = {
            // addCustomerName
            genre: [], title:'', numberInStock:'', genreId:'', dailyRentalRate:'', loadingCreateMovie, createMovie, errorMsg
        }
        this.addMovie = this.addMovie.bind(this)
        this.submitAddMovieForm = this.submitAddMovieForm.bind(this)
    }

    addMovie(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitAddMovieForm(e){
        e.preventDefault()
        const { title, numberInStock, genreId, dailyRentalRate } = this.state
        console.log(title, genreId, numberInStock, dailyRentalRate )
        this.setState({
            loadingCreateMovie: true
        })
        axios.post('https://vidly-unique.herokuapp.com/api/movies', {title, genreId, numberInStock, dailyRentalRate })
        .then( response => {
            this.setState({loadingCreateMovie : false, createMovie: true, addMovieShow:false })
        })
        .catch ( error => {
            this.setState({loadingCreateMovie : false, errorMsg: true })
        })
    }

    componentDidMount(){
        axios.get('https://vidly-unique.herokuapp.com/api/genres')
        .then( response => {
            console.log(response)
            this.setState({ genre: response.data })
        })
        .catch( error => {
            console.log( error )
        })
    }

    selectedGenre(name){
        document.getElementById('selectedGenre').innerHTML = ':Movie type: ' + name
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { movies, loading } = this.props
        const { genre, loadingCreateMovie, createMovie, errorMsg } = this.state
      

            const genreNameList = genre.map(name => {
                return(
                    <div key={name._id}>
                        <Button variant="light" size="sm" 
                        onClick={() =>  {this.setState({genreId: name._id}, this.selectedGenre(name.name) )}}>
                        {name.name} </Button>
                    </div>
                )
            })
    
            return (
                <div className="container-fluid">
                <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    <Button variant="primary addButton" onClick={()=> {this.setState({addMovieShow:true})}}>Add Movie</Button>
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
                    {post.title}</div>
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

              <Modal isOpen={this.state.addMovieShow} 
                       onRequestClose={() => {this.setState({addMovieShow:false})}} 
                       ariaHideApp={false}
                       className="pop-content">
                        <form onSubmit={this.submitAddMovieForm}>
                        <div className="selectedItem">
                            <li><input type="text" placeholder="Name" required name="title" value={this.state.title} onChange={this.addMovie} /></li>     
                            <li><input type="number" placeholder="Stock" name="numberInStock" value={this.state.numberInStock} onChange={this.addMovie} /></li>
                            <li><input type="number" placeholder="Rental rate" name="dailyRentalRate" value={this.state.dailyRentalRate} onChange={this.addMovie} /></li>
                            <div className="selected" id="selectedGenre"></div>
                            {loadingCreateMovie ? <h5>Loading...</h5> : null }
                            {createMovie ? <h5>You have created a new Movie.</h5> : null }
                            {errorMsg ? <p id="invalid-msg">Something is wrong.</p> : null }
                        </div>
                        
                        <div className="selection">
                            <h3 >Choose type</h3>
                            <div className="list">{genreNameList}</div>
                            <input type="submit" />
                        </div>
                    
                        </form>

                </Modal>

                            
                            
            </div>
            );
    }
}


export default Customer;