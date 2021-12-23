import axios from 'axios';

export default {
    
    getAllPosts: () =>
      axios.get(`/api/post`),
    getUserPosts: (userid) =>
      axios.get(`/api/userpost/${userid}`),  
    fetchPost: (categoryname) =>
      axios.get(`/api/fetchpost/${categoryname}`),
    fetchPostDetails: (id) =>  
      axios.get(`/api/srchpost/${id}`),
    addPost: (data,userid) => 
      axios.post(`/api/addpost/${userid}`,data),
    findPost: (id) =>
      axios.get(`/api/srchpost/${id}`),
    updatePost: (id,data) =>
      axios.put(`/api/update/${id}`,data),
    deletePost: (id) =>  
      axios.delete(`/api/deletepost/${id}`)  
}