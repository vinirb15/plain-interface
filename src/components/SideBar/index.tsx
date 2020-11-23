import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiList, FiUserCheck } from 'react-icons/fi';

import './styles.css';

import Monograma from '../../assets/Monograma.png';

const SideBar = (props: any) => {
    return (
        <div className="sidebar">
            <img src={Monograma} alt="FEG LOGO" />
            <Link  to="/" className={props.home} title="Home"><FiHome size={20} /></Link>
            <Link to="/user" className={props.validate} title="Users Validations"><FiUserCheck size={20} /></Link>
            <Link to="/announcements" className={props.announcements} title="Company Announcements"><FiList size={20} /></Link>
            {/* <Link to="/management" className={props.users} title="Users Management"><FiUsers size={20} /></Link> */}
        </div>
    )
}

export default SideBar;
