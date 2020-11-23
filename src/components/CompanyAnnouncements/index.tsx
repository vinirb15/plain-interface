import React, { useState } from 'react';

import './styles.css';

import Company from './Company';
import Local from './Local';


const Announcements: React.FC = () => {

    const [btn, setBtn] = useState([
        {
            content: true,
            btnCompany: '#7F43F5',
            btnLocal: '',
        },
    ]);

    function companyContent() {
        setBtn([
            {
                content: true,
                btnCompany: '#7F43F5',
                btnLocal: '',
            }
        ]);
    }

    function localContent() {
        setBtn([
            {
                content: false,
                btnCompany: '',
                btnLocal: '#7F43F5',
            }
        ]);
    }

    return (
        <div className="announcements">
            <div className="announcements-sidebar">
                <button style={{ color: btn[0].btnCompany }} onClick={companyContent}>Company Announcements</button>
                <button style={{ color: btn[0].btnLocal }} onClick={localContent}>Local Announcements</button>
            </div>
            <div className="announcements-content">
                {
                    (btn[0].content ? <Company /> : <Local />)
                }
            </div>
        </div>
    )
}

export default Announcements;
