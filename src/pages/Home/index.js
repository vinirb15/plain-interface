import React, { useState } from 'react';

import { FiEdit, FiExternalLink, FiHome } from 'react-icons/fi';

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
                    padding: '15px 20px 0 20px'
                }}
            >
                <Content className="content" />
            </div>
            <SideNav style={{
                backgroundColor: '#9557a9',
                height: '100%',
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
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <FiExternalLink />
                        </NavIcon>
                        <NavText>
                            Links
            </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                HR
                     </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Parts & Service
                     </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Merch
                     </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Marketing
                     </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Cord Systems
                     </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default HomePage;