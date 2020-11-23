import React from 'react';

import User from '../../components/UserValidation';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

const UserValidation: React.FC = () => {


    return (
        <>
            <SideBar validate="active" />
            <Header />
            <User />
        </>
    )
}

export default UserValidation;
