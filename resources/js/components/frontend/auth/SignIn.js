import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import AuthService from '../../../services/AuthService';


function SignIn(){

    const navigate = useNavigate();
    const [signInInput,setSignIn] = useState({
        email:'',
        password:'',
        error_list: [],
    });
       
    const handleInput =(e) => {
        e.persist();
        setSignIn({...signInInput,[e.target.name]: e.target.value });
    }

    const signInSubmit = (e) => {
        e.preventDefault();
        const data ={
            email:signInInput.email,
            password:signInInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            AuthService.signIn(data).then(res =>{
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token);
                    swal("Success",res.data.message,"success");
                    navigate('/userdashboard');

                }else if(res.data.status === 401){
                    swal("Warning",res.data.message);
                    
                }else{
                    setSignIn({...signInInput, error_list: res.data.validation_errors});
                }
            });   
        });
    }
     
    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={signInSubmit}>
                        <div className="form-group">
                                <label>Enter Email address</label>
                                <input type="" name="email" onChange={handleInput} value={signInInput.email} className="form-control"/>
                                <span id="error">{signInInput.error_list.email}</span>
                        </div>
                        <div className="form-group">
                            <label>Enter Password</label>
                            <input type="" name="password" onChange={handleInput} value={signInInput.password} className="form-control"/>
                            <span id="error">{signInInput.error_list.password}</span>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
}
export default SignIn;