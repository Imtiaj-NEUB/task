import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PostService from '../../services/PostService';

function Home(){

    let data="";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [post,setPost] = useState([]);

    useEffect(() => {
        
        try{
            PostService.getAllPosts().then(res=>{
                if(res.data.status === 200){
                    setPost(res.data.post)
                }
                setLoading(false);
            });
        }catch(error){
            console.log(error);
        }
        
    },[]);

    if(loading){
        return <h4>loading...</h4>
    }else{
        data=post.map( (item)=>{
            return (
                <div className="post-preview" key={item.id}>
                    <Link to={`/${item.id}`} >
                        <h2 className="post-title">{item.title}</h2>
                        <h3 className="post-subtitle">{item.description}</h3>
                    </Link>
                    <p className="post-meta">
                        Category: {item.category}<br/>
                        Posted at: {item.created_at}
                    </p>
                </div>
            )
        });
    }
    
    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {data}
                </div>
            </div>
        </div>
    );
    
}

export default Home;