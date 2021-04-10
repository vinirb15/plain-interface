import React, {useEffect} from 'react';
import ReactGA from 'react-ga';

import User from '../../components/UserValidation';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

const UserValidation: React.FC = () => {
    
    useEffect(() => {
        ReactGA.initialize('UA-189380132-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      })

    return (
        <>
            <SideBar validate="active" />
            <Header />
            <User />
        </>
    )
}

export default UserValidation;
