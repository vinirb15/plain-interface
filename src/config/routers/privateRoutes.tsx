import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import * as ROUTES from './routerList'

import Home from '../../pages/Home'
import UserValidation from '../../pages/UserValidation'
import Profile from '../../pages/UserValidation/Profile'
import Announcements from '../../pages/Announcements'
import Management from '../../pages/UsersManagement'
import NewAnnouncement from '../../pages/NewAnnouncement'
import CompanyAnnouncement from '../../pages/CompanyAnnouncement'
import Calendar from '../../pages/CompanyCalendar'
import Analytics from '../../pages/Analytics/index';
import ReactGA from 'react-ga'

const PrivateRoutes: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize('UA-189380132-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  })
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.NEWHOME} component={Home} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.USER} component={UserValidation} />
        <Route exact path={ROUTES.PROFILE} component={Profile} />
        <Route exact path={ROUTES.ANNOUNCEMENTS} component={Announcements} />
        <Route exact path={ROUTES.NEWANNOUNCEMENT} component={NewAnnouncement} />
        <Route path={ROUTES.ANNOUNCEMENTCOMPANY} component={CompanyAnnouncement} />
        <Route path={ROUTES.ANNOUNCEMENTLOCAL} component={CompanyAnnouncement} />
        <Route path={ROUTES.ANNOUNCEMENTGROUP} component={CompanyAnnouncement} />
        <Route path={ROUTES.ANNOUNCEMENTOTHERS} component={CompanyAnnouncement} />
        <Route path={ROUTES.MANAGEMENT} component={Management} />
        <Route path={ROUTES.CALENDAR} component={Calendar} />
        <Route path={ROUTES.ANALYTICS} component={Analytics} />
      </Switch>
    </BrowserRouter>
  )
}

export default withRouter(PrivateRoutes)
