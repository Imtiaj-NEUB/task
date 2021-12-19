import React, { useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate,useParams } from 'react-router-dom';



 
function UpdatePost(){

    let {id} = useParams();
    id=parseInt(id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [postUpdate,setEditPost] = useState([]);
    const [error,setError] = useState([]);
    

    useEffect(() => {
        
        axios.get(`/api/srchpost/${id}`).then(res=>{
            if(res.data.status === 200){
                setEditPost(res.data.post);
            }else if(res.data.status === 504){
                swal("Error",res.data.message,"error");
            }
            setLoading(false)
            
        });

    },[id]);
 

       
    const handleInput =(e) => {
        e.persist();
        setEditPost({...postUpdate,[e.target.name]: e.target.value });
    }

        
    
    const updatePost = (e) => {
        e.preventDefault();

        const data =postUpdate;
        axios.put(`/api/update/${id}`,data).then(res =>{
            if(res.data.status === 200){
                setError([]);
                swal("Success",res.data.message,"success");
                navigate('/post');

            }else if(res.data.status === 400){
                setError(res.data.validation_errors);
            }else if(res.data.status === 404){
                swal("Error",res.data.message,"error");
            }
        });   
        
    }
          
    if(loading){
        return <h4>loading Edit Post...</h4>
    }
    return (
        
        <div className="container px-4">
            <div className="card mt-4">
                
                <div className="card-header">
                    <h4>Update</h4>
                </div>

                <div className="card-body">
                    <form onSubmit={updatePost} >
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" onChange={handleInput} value={postUpdate.title} className="form-control"/>
                            <span id="error">{error.title}</span>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={postUpdate.description} className="form-control"></textarea>
                            <span id="error">{error.description}</span>
                        </div>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" name="category" onChange={handleInput} value={postUpdate.category} className="form-control"/>
                            <span id="error">{error.category}</span>
                        </div>
                        <br/><br/>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
            
    );
}

export default UpdatePost;
