import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import './styles.css'

import LoginButton from '../LoginButton';
import Notifications from '../Notifications';

const Header = (props: any | 0) => {
    const [loaded, setLoaded] = useState<boolean>();
    const [impersonate, setImpersonate] = useState<boolean>();
    const [info, setInfo] = useState<string>();
    let firstName = ''
    let lastName = ''
    useEffect(() => {
        onLoaded()
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onLoaded() {
        setTimeout(() => {
            const firstName = localStorage.getItem('firstName')
            const lastName = localStorage.getItem('lastName')
            setInfo(`${firstName} ${lastName}`);
        }, props.timeout);
    }

    function handlePermissions() {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    if (decoded.impersonate && decoded.impersonate === true)
                        setImpersonate(decoded.impersonate)
                }
            })
            return
        }
    }

    function handleChange() {
        while ((firstName === undefined) || (lastName === undefined)) {
            setLoaded(true)
        }
    }

    function exitToUser() {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <header onLoad={handleChange}>
            {
                loaded ? <h2>Welcome</h2> : (
                    <div className="upper">
                        <h2>Welcome, <b> {info}</b></h2>
                        <button onClick={exitToUser} id="impersonateButton" style={{ display: impersonate ? "" : "none" }}>Exit to my user</button>
                    </div>
                )
            }


            <div className="icons">
                <Notifications color="var(--bg-color)" />
                <LoginButton color="var(--bg-color)" width='20%' />
            </div>
        </header>
    )
}

export default Header