import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiList } from 'react-icons/fi';

import './styles.css';

import Monograma from '../../assets/Monograma.png';

export default function SideBar() {
    return (
        <div class="sidebar">
            <img src={Monograma} alt="FEG LOGO" />
            <Link className="active"><FiHome size={15} /></Link>
            <Link title="Company Announcements"><FiList size={15} /></Link>
        </div>
    )
}