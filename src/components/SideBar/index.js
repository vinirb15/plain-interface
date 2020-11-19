import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiExternalLink, FiBox, FiList, FiFolderPlus } from 'react-icons/fi';

import './styles.css';

import Monograma from '../../assets/Monograma.png';

export default function SideBar() {
    return (
        <div class="sidebar">
            <img src={Monograma} alt="FEG LOGO" />
            <Link className="active"><FiHome size={15} /></Link>
            <Link><FiList size={15} /></Link>
            <Link><FiFolderPlus size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
            <Link><FiExternalLink size={15} /></Link>
        </div>
    )
}