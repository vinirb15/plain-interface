import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import * as ROUTES from './routerList'
import UserValidation from '../../pages/UserValidation';

const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.USER} component={UserValidation} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default SignRoutes
