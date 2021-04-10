import React, {useEffect} from 'react';
import ReactGA from 'react-ga';

import Management from '../../components/UsersManagement';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

const UsersManagement: React.FC = () => {

    useEffect(() => {
        ReactGA.initialize('UA-189380132-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      })

    return (
        <>
            <SideBar users="active" />
            <Header />
            <Management />
        </>
    )
}

export default UsersManagement;
