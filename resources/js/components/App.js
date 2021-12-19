import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import axios from 'axios';

import FrontHeader from '../layouts/frontend/FrontHeader';
import FrontNavbar from '../layouts/frontend/FrontNavbar';
import FrontFooter from '../layouts/frontend/FrontFooter';
import Home from './frontend/Home';
import PostDetails from './frontend/PostDetails';
import SignIn from './frontend/auth/SignIn';
import SignUp from './frontend/auth/SignUp';

import UserNavbar from '../layouts/userpanel/UserNavbar';
import UserSidebar from '../layouts/userpanel/UserSidebar';
import UserFooter from '../layouts/userpanel/UserFooter';
import Dashboard from './userpanel/Dashboard';
import AddPost from './userpanel/AddPost';
import Post from './userpanel/Post';
import UpdatePost from './userpanel/UpdatePost';

import Authentication from '../routes/Authentication';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})




function App() {

    const FrontLayout = () => (
        <>
          <FrontNavbar />
          <FrontHeader />
          <main >
             <Outlet /> 
          </main>
          <FrontFooter />
        </>
    );

    const UserLayout = () => (
        <>
            <div className="sb-nav-fixed">
                <UserNavbar/>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <UserSidebar/>
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <Outlet /> 
                        </main>
                        <UserFooter/>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<FrontLayout />} >
                        <Route path="/" element={<Home />} />
                        <Route path=":id" element={<PostDetails />} />
                        <Route path="/signin" element={<SignIn/>} />
                        <Route path="/signup" element={<SignUp/>} />
                    </Route>
                   
                    <Route exact path='/' element={<Authentication/>}>
                        <Route path="/" element={<UserLayout />} >
                            <Route path="/userdashboard" element= {<Dashboard />}/>
                            <Route exact path='/addpost' element={<AddPost/>}/>
                            <Route exact path='/post' element={<Post/>}/>
                            <Route path="/post/:id" element={<UpdatePost/>} />
                        </Route>
                    </Route>

                    <Route path="*" element={<SignIn />} />

                </Routes>
            </Router>
            
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
