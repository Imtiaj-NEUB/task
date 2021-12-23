import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import PostService from '../../services/PostService';


function Post(){

    let data="";
    const userId = localStorage.getItem('userid');
    const [loading, setLoading] = useState(true);
    const [post,setPost] = useState([]);
    
    useEffect(() => {
        PostService.getUserPosts(userId).then(res=>{
            if(res.data.status === 200){
                setPost(res.data.post)
            }
            setLoading(false);
        });
    },[]);

    const deletePost = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"; 

        PostService.deletePost(id).then(res=>{

            if(res.data.status === 200){
                swal("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 404){
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete"; 
            }

        });

    }

    if(loading){
        return <h4>loading...</h4>
    }else{
        data=
        post.map( (item)=>{
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>
                        <Link to={`${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                         &nbsp;&nbsp;
                        <button type="button" className="btn btn-danger btn-sm" onClick={ (e) => deletePost(e, item.id) }>Delete</button>
                    </td>
                </tr>
            )
        });
    }
        

    return (
        
        <div className="container px-4">
            <div className="card mt-4">
                
                <div className="card-header">
                    <h4>Post List
                        <Link to="/addpost" className="btn btn-primary btn-sm float-end">Add Post</Link>
                    </h4>
                </div>

                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        
            
    );
}

export default Post;
