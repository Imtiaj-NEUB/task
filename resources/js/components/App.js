import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import axios from 'axios';

//layouts
import FrontLayout from './layouts/frontend/FrontLayout';
import UserLayout from './layouts/userpanel/UserLayout';

//pages
const Home = lazy(() => import('./frontend/Home'));
const PostDetails = lazy(() => import('./frontend/PostDetails'));
const SignIn = lazy(() => import('./frontend/auth/SignIn'));
const SignUp = lazy(() => import('./frontend/auth/SignUp'));
const Category = lazy(() => import('./frontend/Category'));

const Dashboard = lazy(() => import('./userpanel/Dashboard'));
const AddPost = lazy(() => import('./userpanel/AddPost'));
const Post = lazy(() => import('./userpanel/Post'));
const UpdatePost = lazy(() => import('./userpanel/UpdatePost'));

const NotFound = lazy(() => import('./frontend/NotFound'));

import Authentication from '../components/Authentication';

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

    
    return (
        <>
            <Router>
                <Suspense fallback={<div>Please Wait......</div>}>
                    <Routes>
                        <Route path="/" element={<FrontLayout />} >
                            <Route path="/" element={<Home />} />
                            <Route path=":id" element={<PostDetails />} />
                            <Route path="category/:categoryname" element={<Category/>} />
                            <Route path="/signin" element={<SignIn/>} />
                            <Route path="/signup" element={<SignUp/>} />
                        </Route>
                    
                        <Route exact path='/' element={<Authentication/>}>
                            <Route path="/" element={<UserLayout />} >
                                <Route path="/userdashboard" element= {<Dashboard />}/>
                                <Route path='/addpost' element={<AddPost/>}/>
                                <Route path='/post' element={<Post/>}/>
                                <Route path="post/:id" element={<UpdatePost/>} />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </Suspense>
            </Router>
            
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
