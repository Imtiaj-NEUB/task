import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetails(){

    let {id} = useParams();
    let data="";

    const [loading, setLoading] = useState(true);
    const [post,setPost] = useState([]);

    useEffect(() => {
        axios.get(`/api/srchpost/${id}`).then(res=>{
            if(res.data.status === 200){
                setPost(res.data.post)
            }
            setLoading(false);
        });
    },[id]);

    if(loading){
        return <h4>loading...</h4>
    }
    
    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    <h2 className="post-title">{post.title}</h2>
                    <h3 className="post-subtitle">{post.description}</h3>
                    <p className="post-meta">
                        Category: {post.category}<br/>
                        Posted at: {post.created_at }
                        ;
                    </p>
                </div>
            </div>
        </div>
    );
    
}

export default PostDetails;