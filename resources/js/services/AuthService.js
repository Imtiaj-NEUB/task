import axios from 'axios';

export default {
    
    signIn: (data) =>
       axios.post(`/api/signin`,data),
    signUp: (data) =>
       axios.post(`/api/signup`,data)
       
}