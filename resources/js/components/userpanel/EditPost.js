import React, { useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



 
function EditPost(props){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [postUpdate, setEditPost] = useState([]);

    useEffect(() => {

        const postId = props.match.params.id; 
        axios.get(`/api/srchpost/${postId}`).then(res=>{
            if(res.data.status === 200){
                console.log(res.data.post);
                setEditPost(res.data.post)
            }
            setLoading(false)
            
        });
    },[props.match.params.id]);

    
       
    const handleInput =(e) => {
        e.persist();
        setEditPost({...postUpdate,[e.target.name]: e.target.value });
    }

    if(loading){
        return <h4>loading...</h4>
    }
    
    return (
        <div> 
            <h5>Add Post</h5>
            <div className="card">
                <div className="card-body">
                <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" onChange={handleInput} value={postUpdate.title} className="form-control"/>
                            
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={postUpdate.description} className="form-control"></textarea>
                            
                        </div>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" name="category" onChange={handleInput} value={postUpdate.category} className="form-control"/>
                            
                        </div>
                        <br/><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>                   
            
        );
}

export default EditPost;
