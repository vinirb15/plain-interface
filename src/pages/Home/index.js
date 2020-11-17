import React, { useState } from 'react';

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
                <Content />
            </div>
            <SideNav>
                <SideNav.Toggle onClick={() => sideBar()} />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
            </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
            </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default HomePage;