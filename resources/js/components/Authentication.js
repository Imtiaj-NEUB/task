import React from "react";
import {Route, Navigate,Outlet} from 'react-router-dom';
import SignIn from "../components/frontend/auth/SignIn";


const Authentication = () => {
    const auth = localStorage.getItem('auth_token');
    return auth ? <Outlet /> : <Navigate to="/signin" />;
}


export default Authentication;
