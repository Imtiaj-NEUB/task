import React from 'react';
import { Link } from 'react-router-dom';


function FrontNavbar(){

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
    
    return (
        
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
            </div>
        </nav>

    );

}

export default FrontNavbar;