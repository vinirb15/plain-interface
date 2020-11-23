import React from 'react';
import { FiUser } from 'react-icons/fi';

import './styles.css';

import ProfileInfo from './ProfileInfo';

const LoginButton = () => {

    function openNav() {
       // document.getElementById("LogNav").style.width = "20%";
    }

    function closeNav() {
       // document.getElementById("LogNav").style.width = "0";
    }

    return (
        <>
            <div id="LogNav" className="sidenav">
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
