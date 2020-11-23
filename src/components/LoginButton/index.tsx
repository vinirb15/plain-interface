import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';

import './styles.css';

import ProfileInfo from './ProfileInfo';

const LoginButton = () => {

const [ extended, setExtended ] = useState(false);

    function openNav() {
       setExtended(true);
    }

    function closeNav() {
        setExtended(false);
    }

    return (
        <>
            <div id="LogNav" className="sidenav" style={{ width: extended ? '20%' : '0'}}>
                <a href="#/" className="closebtn" onClick={closeNav}>&times;</a>
                <h1>User Profile</h1>
                <ProfileInfo />
            </div>


            <button onClick={openNav} type="button">
                <FiUser size={25} color="#7F43F5" />
            </button>
        </>

    )


}

export default LoginButton;
