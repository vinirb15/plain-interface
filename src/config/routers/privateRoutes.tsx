import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as ROUTES from './routerList'

import Home from '../../pages/Home';
import UserValidation from '../../pages/UserValidation';

const PrivateRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.USER} component={UserValidation} />
      </Switch>
    </BrowserRouter>
  )
}

export default PrivateRoutes
