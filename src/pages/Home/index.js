import React from 'react';

import './styles.css';

import Header from '../../components/Header';
import Power from '../../components/Home/PowerBI';
import Display from '../../components/Home/ERP';
import ZendeskManager from '../../components/Home/Zendesk';
import Knowledge from '../../components/Home/Knowledge';
import CreateTicket from '../../components/Home/CreateTicket';
import CompanyAnnoun from '../../components/Home/CompanyAnnoun';


import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import SideBar from '../../components/SideBar';


export default function HomePage() {

    return (
        <>
            <SideBar home="active"/>

            <div className="full">

                <Header />

                <div className="HomeContent">

                    <Power />

                    <Display />

                    <ZendeskManager />

                    <Knowledge />

                    <CreateTicket />

                    <CompanyAnnoun />

                </div>

            </div >
        </>
    );
}