import { Outlet } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import UserNavbar from '../../../components/layouts/userpanel/UserNavbar';
import UserSidebar from '../../../components/layouts/userpanel/UserSidebar';
import UserFooter from '../../../components/layouts/userpanel/UserFooter';

import '../../../assets/userpanel/css/styles.css';
import '../../../assets/userpanel/js/scripts.js';


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

export default UserLayout;