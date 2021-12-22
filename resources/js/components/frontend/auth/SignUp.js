import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import AuthService from '../../../services/AuthService';


function SignUp(){
         
        const navigate = useNavigate();
        const [signUpInput,setSignUp] = useState({
           name:'',
           email:'',
           password:'',
           error_list: [],
        });
       
        const handleInput =(e) => {
            e.persist();
            setSignUp({...signUpInput,[e.target.name]: e.target.value });
        }
    
        const signUpSubmit = (e) => {
            e.preventDefault();
            const data ={
                name:signUpInput.name,
                email:signUpInput.email,
                password:signUpInput.password,
            }

            axios.get('/sanctum/csrf-cookie').then(response => {
                AuthService.signUp(data).then(res =>{
                   if(res.data.status === 200){
                        localStorage.setItem('auth_token',res.data.token);
                        swal("Success",res.data.message,"success");
                        navigate('/userdashboard');

                   }else{
                        setSignUp({...signUpInput, error_list: res.data.validation_errors});

                   }
                });   
            });
        }
   
        return(
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={signUpSubmit}>
                            <div className="form-group">
                                <label>Enter Name</label>
                                <input type="" name="name" onChange={handleInput} value={signUpInput.name} className="form-control"/>
                                <span id="error">{signUpInput.error_list.name}</span>
                            </div>
                            <div className="form-group">
                                <label>Enter Email address</label>
                                <input type="" name="email" onChange={handleInput} value={signUpInput.email} className="form-control"/>
                                <span id="error">{signUpInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <label>Enter Password</label>
                                <input type="" name="password" onChange={handleInput} value={signUpInput.password} className="form-control"/>
                                <span id="error">{signUpInput.error_list.password}</span>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    
}

export default SignUp;