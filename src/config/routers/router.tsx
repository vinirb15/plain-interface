import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as ROUTES from './routerList'
import UserValidation from '../../pages/UserValidation';

export const Router: React.FC = () => (
  <Switch>
    <Route path={ROUTES.DEFAULT} component={UserValidation} exact />
  </Switch>
)
