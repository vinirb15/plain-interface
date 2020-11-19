import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiExternalLink, FiBox, FiList, FiFolderPlus } from 'react-icons/fi';

import './styles.css';

export default function SideBar() {
    return (
        <div class="sidebar">
            <Link><FiBox size={40} /></Link>
            <Link className="active"><FiHome size={20} /></Link>
            <Link><FiList size={20} /></Link>
            <Link><FiFolderPlus size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
            <Link><FiExternalLink size={20} /></Link>
        </div>
    )
}