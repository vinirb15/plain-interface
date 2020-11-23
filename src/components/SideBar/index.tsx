import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiList } from 'react-icons/fi';

import './styles.css';

import Monograma from '../../assets/Monograma.png';

const SideBar = (props: any) => {
    return (
        <div className="sidebar">
            <img src={Monograma} alt="FEG LOGO" />
            <Link  to="/" className={props.home} title="Home"><FiHome size={20} /></Link>
            <Link to="/user" className={props.company} title="Company Announcements"><FiList size={20} /></Link>
        </div>
    )
}

export default SideBar;
