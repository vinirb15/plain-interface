import React, {useEffect} from 'react';
import ReactGA from 'react-ga';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Announcement from '../../components/CompanyAnnouncements/GeneralList/GeneralAnnouncement';


const Announcements: React.FC = () => {

    useEffect(() => {
        ReactGA.initialize('UA-189380132-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      })

    return (
        <>
            <SideBar announcements="active" />
            <Header />
            <Announcement />
        </>
    )
}

export default Announcements;
