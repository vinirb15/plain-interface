import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

import './styles.css';

import ProfileInfo from './ProfileInfo';

const LoginButton = (props: any) => {

const [ extended, setExtended ] = useState(false);

    function openNav() {
       setExtended(true);
    }

    function closeNav() {
        setExtended(false);
    }

    return (
        <>
            <div id="LogNav" className="sidenav" style={{ width: extended ? props.width : '0'}}>
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <h1>User Profile</h1>
                <ProfileInfo />
            </div>


            <button onClick={openNav} type="button">
                <FiSettings size={25} color={props.color} />
            </button>
        </>

    )


}

export default LoginButton;
