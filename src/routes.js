import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import UserValidation from './pages/UserValidation';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/user" exact component={UserValidation} />
            </Switch>
        </BrowserRouter>
    )
}