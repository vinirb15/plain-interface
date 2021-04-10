import React, {useEffect, useState} from 'react';
import ReactGA from 'react-ga';

import './styles.css';

import { Grid } from '@material-ui/core'

import Header from '../../components/Header';
import Power from '../../components/Home/PowerBI';
import Display from '../../components/Home/ERP';
import ZendeskManager from '../../components/Home/Zendesk';
import Knowledge from '../../components/Home/Knowledge';
import CreateTicket from '../../components/Home/CreateTicket';
import CompanyAnnoun from '../../components/Home/CompanyAnnoun';
import Forum from '../../components/Home/Forum';
import Paylocity from '../../components/Home/Paylocity';
import Calendar from '../../components/Home/Calendar';
import Website from '../../components/Home/Website';
import DebitCard from '../../components/Home/DebitCard';
import Netsuite from '../../components/Home/Netsuite';
import Schoox from '../../components/Home/Schoox';
import Guardian from '../../components/Home/GuardianLife';
import Voya from '../../components/Home/VoyaFinancial';
import BlueCross from '../../components/Home/BlueCross';

import options from './search'

import SideBar from '../../components/SideBar';

const HomePage: React.FC = () => {
    const [results, setResults] = useState("");

    useEffect(() => {
        ReactGA.initialize('UA-189380132-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      })

    const fullPage = (
        <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
                <Power />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Display />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Website />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Knowledge />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <DebitCard />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Calendar />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Forum />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Paylocity />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <CompanyAnnoun />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Netsuite />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Schoox />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <ZendeskManager />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Voya />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <BlueCross />
            </Grid>

            <Grid item lg={4} md={6} xs={12}>
                <Guardian />
            </Grid>
        </Grid>
    )

    function searchIn() {
        if (results === "" || options.find(tree => tree.startsWith(results)) === "feg") {
            return fullPage
        }
        if (options.find(tree => tree.startsWith(results)) === "powerbi" || options.find(tree => tree.startsWith(results)) === "bipower") {
            return (
                <div className="wanted">
                    <Power />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "erp" || options.find(tree => tree.startsWith(results)) === "fegerp" || options.find(tree => tree.startsWith(results)) === "old") {
            return (
                <div className="wanted">Ï
                    <Display />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "zendeskmanager" || options.find(tree => tree.startsWith(results)) === "managerzendesk") {
            return (
                <div className="wanted">
                    <ZendeskManager />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "knowledgebase" || options.find(tree => tree.startsWith(results)) === "baseknowledge") {
            return (
                <div className="wanted">
                    <Knowledge />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "createticket" || options.find(tree => tree.startsWith(results)) === "ticketcreate") {
            return (
                <div className="wanted">
                    <CreateTicket />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "calendar" || options.find(tree => tree.startsWith(results)) === "company calendar") {
            return (
                <div className="wanted">
                    <Calendar />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "forum" || options.find(tree => tree.startsWith(results)) === "fegbook") {
            return (
                <div className="wanted">
                    <Forum />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "paylocity" || options.find(tree => tree.startsWith(results)) === "locity") {
            return (
                <div className="wanted">
                    <Paylocity />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "announcement") {
            return (
                <div className="wanted">
                    <CompanyAnnoun />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "company") {
            return (<div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
            }}>
                <Calendar />
                <div className="wanted">
                    <CompanyAnnoun />
                </div>
            </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "website" || options.find(tree => tree.startsWith(results)) === "plataforms") {
            return (
                <div className="wanted">
                    <Website />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "debitcard" || options.find(tree => tree.startsWith(results)) === "card") {
            return (
                <div className="wanted">
                    <DebitCard />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "oracle" || options.find(tree => tree.startsWith(results)) === "netsuite") {
            return (
                <div className="wanted">
                    <Netsuite />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "schoox") {
            return (
                <div className="wanted">
                    <Schoox />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "voya" || options.find(tree => tree.startsWith(results)) === "financial") {
            return (
                <div className="wanted">
                    <Voya />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "blue" || options.find(tree => tree.startsWith(results)) === "cross" || options.find(tree => tree.startsWith(results)) === "shield" || options.find(tree => tree.startsWith(results)) === "shield" || options.find(tree => tree.startsWith(results)) === "bluecross" || options.find(tree => tree.startsWith(results)) === "blueshield") {
            return (
                <div className="wanted">
                    <BlueCross />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) === "guardian" || options.find(tree => tree.startsWith(results)) === "life" || options.find(tree => tree.startsWith(results)) === "insurance") {
            return (
                <div className="wanted">
                    <Guardian />
                </div>
            )
        }
        if (options.find(tree => tree.startsWith(results)) !== "") {
            return fullPage
        }
    }

    function onSearching(e: string) {
        setResults(e.toLowerCase())
    }

    return (
        <>
            <SideBar home="active" />
            <Header timeout="1000" />

            <div className="HomeContent">
                <div className="full">
                    <div className="search">
                        <input type="text" name="search" placeholder="Search.." onChange={e => onSearching(e.target.value)} />
                    </div>
                    {
                        searchIn()
                    }
                </div>

            </div >
        </>
    );
}

export default HomePage;
