import React from 'react';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Announcement from '../../components/CompanyAnnouncements';


const Announcements: React.FC = () => {


    return (
        <>
            <SideBar announcements="active" />
            <Header />
            <Announcement />
        </>
    )
}

export default Announcements;
