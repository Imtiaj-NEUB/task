import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




 
function AddPost(){

    const navigate = useNavigate();
        const [postInput,setPost] = useState({
           title:'',
           description:'',
           category:'',
           error_list: [],
        });
       
        const handleInput =(e) => {
            e.persist();
            setPost({...postInput,[e.target.name]: e.target.value });
        }
    
        const postSubmit = (e) => {
            e.preventDefault();
            const data ={
                title:postInput.title,
                description:postInput.description,
                category:postInput.category,
            }

            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`/api/addpost`,data).then(res =>{
                   if(res.data.status === 200){
                        swal("Success",res.data.message);
                        document.getElementById('ADD_POST').reset();
                        navigate('/post');

                   }else{
                     setPost({...postInput, error_list: res.data.validation_errors});
                   }
                });   
            });
        }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                
                <div className="card-header">
                    <h4>New Post
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={postSubmit} id="ADD_POST">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" name="title" onChange={handleInput} value={postInput.title} className="form-control"/>
                                <span id="error">{postInput.error_list.title}</span>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" onChange={handleInput} value={postInput.description} className="form-control"></textarea>
                                <span id="error">{postInput.error_list.description}</span>
                            </div>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input type="text" name="category" onChange={handleInput} value={postInput.category} className="form-control"/>
                                <span id="error">{postInput.error_list.category}</span>
                            </div>
                            <br/><br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
            
        );
}

export default AddPost;
