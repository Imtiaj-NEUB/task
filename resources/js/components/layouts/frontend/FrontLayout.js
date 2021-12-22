import { Outlet } from 'react-router-dom';

import FrontHeader from '../../../components/layouts/frontend/FrontHeader';
import FrontFooter from '../../../components/layouts/frontend/FrontFooter';

import '../../../assets/frontend/css/styles.css';
import '../../../assets/frontend/js/scripts.js';


const FrontLayout = () => (
    <>
      <FrontHeader />
      <main >
         <Outlet /> 
      </main>
      <FrontFooter />
    </>
);

export default FrontLayout;