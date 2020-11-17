import React from 'react';
import { Link } from 'react-router-dom';
import svg from '../../assets/illustrations/working.svg';

import './styles.css'

export default function DoubleImages() {
    return (
        <div className="images-content second">
            <Link to="/">
                <img src={svg} alt="prod4" />
            </Link>
            <Link to="/">
                <img src={svg} alt="prod4" />
            </Link>
        </div>
    )
}