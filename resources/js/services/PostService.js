import axios from 'axios';

export default {
    
    getAllPosts: () =>
      axios.get(`/api/post`),
    fetchPost: (categoryname) =>
      axios.get(`/api/fetchpost/${categoryname}`),
    fetchPostDetails: (id) =>  
      axios.get(`/api/srchpost/${id}`),
    addPost: (data) => 
      axios.post(`/api/addpost`,data),
    findPost: (id) =>
      axios.get(`/api/srchpost/${id}`),
    updatePost: (id,data) =>
      axios.put(`/api/update/${id}`,data),
    deletePost: (id) =>  
      axios.delete(`/api/deletepost/${id}`)  
}