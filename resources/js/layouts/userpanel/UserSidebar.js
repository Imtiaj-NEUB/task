import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function UserSidebar(){

    const navigate = useNavigate();

    const signOut = (e) =>{
       e.preventDefault();
       axios.post(`/api/signout`).then(res =>{
           if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                swal("Success",res.data.message,"success");
                navigate('/');
           }
       });
    }
    
    return (

        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">User Panel</div>
                    <Link className="nav-link" to="/userdashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link collapsed" to="/post">
                        Post
                    </Link>
                    <Link className="nav-link" to="">
                        <button type="button" className="btn btn-danger btn-sm text-white" onClick={signOut}>Sign Out</button>
                    </Link>
                </div>
            </div>
        </nav>

    );



}

export default UserSidebar;