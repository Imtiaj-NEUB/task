import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function FrontHeader(){

    let data="";

    let checkAuth = '';

    if(!localStorage.getItem('auth_token')){

        checkAuth = (
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
                <li className="nav-link px-lg-3 py-3 py-lg-4"> 
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-link px-lg-3 py-3 py-lg-4">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            </ul>
        );
        
    }

    
    const [post,setPost] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/post`).then(res=>{
            if(res.data.status === 200){
                setPost(res.data.post)
            }
        });
    },[]);

    
    data = post.map( (item)=>{
        return (
            
            <ul className="navbar-nav ms-auto py-4 py-lg-0" key={item.id}>
                <li className="nav-link px-lg-3 py-3 py-lg-4"> 
                    <Link className="nav-link" to={`category/${item.category}`}>{item.category}</Link>
                </li>
                
            </ul>
        )
    });
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        {checkAuth}
                    </div>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        {data}
                    </div>
                    
                </div>
            </nav>
            <header className="masthead">
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>BANGLADESH</h1>
                                <span className="subheading">Bangladesh is a paradise of scenic beauty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );



}

export default FrontHeader;