import React from 'react';

import './styles.css';

import { Grid } from '@material-ui/core'

import Header from '../../components/Header';
import Power from '../../components/Home/PowerBI';
import Display from '../../components/Home/ERP';
import ZendeskManager from '../../components/Home/Zendesk';
import Knowledge from '../../components/Home/Knowledge';
import CreateTicket from '../../components/Home/CreateTicket';
import CompanyAnnoun from '../../components/Home/CompanyAnnoun';

import SideBar from '../../components/SideBar';


const HomePage: React.FC = () => {

    return (
        <>
            <SideBar home="active" />

            <div className="full">

                <Header />

                <div className="HomeContent">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Power />
                        </Grid>

                        <Grid item xs={4}>
                            <Display />
                        </Grid>

                        <Grid item xs={4}>
                            <ZendeskManager />
                        </Grid>

                        <Grid item xs={4}>
                            <Knowledge />
                        </Grid>

                        <Grid item xs={4}>
                            <CreateTicket />
                        </Grid>

                        <Grid item xs={4}>
                            <CompanyAnnoun />
                        </Grid>
                    </Grid>
                </div>

            </div >
        </>
    );
}

export default HomePage;
