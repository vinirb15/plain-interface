import React, { useState } from 'react';

import { FiHome, FiExternalLink } from 'react-icons/fi';

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import Content from '../Content';

function HomePage() {
    const [expanded, setExpanded] = useState('');

    function sideBar() {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }


    return (
        <div>
            <div
                style={{
                    marginLeft: expanded ? 240 : 64,
                    padding: '15px 20px 0 20px',
                }}
            >
                <Content className="content" />
            </div>
            <SideNav style={{
                backgroundColor: '#9557a9',
                height: '100%!important',
            }}>
                <SideNav.Toggle onClick={() => sideBar()} />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <FiHome />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavIcon>
                            <FiExternalLink />
                        </NavIcon>
                        <NavText>
                            Power BI
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavIcon>
                            <FiExternalLink />
                        </NavIcon>
                        <NavText>
                            Zendesk Management
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavIcon>
                            <FiExternalLink />
                        </NavIcon>
                        <NavText>
                            Knowledge Base
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavIcon>
                            <FiExternalLink />
                        </NavIcon>
                        <NavText>
                            Create Your Ticket
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default HomePage;