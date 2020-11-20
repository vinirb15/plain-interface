import React from 'react';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import Content from '../Content';
import SideBar from '../../components/SideBar';

function HomePage() {


    return (
    <>
        <SideBar />
        <Content />
    </>
    )
}

export default HomePage;