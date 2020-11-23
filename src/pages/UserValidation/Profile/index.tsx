import React from 'react';

import SideBar from '../../../components/SideBar';
import Header from '../../../components/Header';
import Profile from '../../../components/UserValidation/Profile';

const UserProfile: React.FC = () => {


    return (
        <>
            <SideBar validate="active"/>
            <Header />
            <Profile />
        </>
    )
}

export default UserProfile;
