import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import * as ROUTES from './routerList'
import DefaultPage from '../../pages/DefaultPage';

const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.DEFAULT} component={DefaultPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default SignRoutes
