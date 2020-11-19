import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Content() {

    return (
        <div className="company">
            <Link to="/">
                <h1>Company Announcements</h1>
            </Link>
        </div>
    );
}