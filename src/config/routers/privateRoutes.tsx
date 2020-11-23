import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as ROUTES from './routerList'

import Home from '../../pages/Home';
import UserValidation from '../../pages/UserValidation';
import Profile from '../../pages/UserValidation/Profile';

const PrivateRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.USER} component={UserValidation} />
        <Route path={ROUTES.PROFILE} component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default PrivateRoutes
