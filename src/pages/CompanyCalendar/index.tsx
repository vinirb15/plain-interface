import React, {useEffect} from 'react';
import ReactGA from 'react-ga';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import Calendar from '../../components/CompanyCalendar';


const CompanyCalendar: React.FC = () => {

    useEffect(() => {
        ReactGA.initialize('UA-189380132-1')
        ReactGA.pageview(window.location.pathname + window.location.search)
      })

    return (
        <>
            <SideBar calendar="active" />
            <Header />
            <Calendar />
        </>
    )
}

export default CompanyCalendar;
