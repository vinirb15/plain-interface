import React from 'react';
import { FiMail, FiFile } from 'react-icons/fi';

import './styles.css';

import Monograma from '../../../assets/Monograma.png';

const ProfileInfo = () => {

    return (
        <div className="profile-box">
            <img src={Monograma} alt="FEG LOGO" />
            <div className="about">
                <h2>Lisa Price</h2>
                <div className="container">
                    <FiMail color="#478fc8" size={20} />
                    <p>lisa.price@fegllc.com</p>
                </div>
                <button>Sign Out</button>
            </div>

            <hr />

            <div className="my-profile">
                <FiFile style={{
                    background: '#c8c8d3',
                    borderRadius: '8px',
                    padding: '0.7rem',
                    color: '#1eb6b0'
                }} size={45} />
                <div className="container">
                    <h3>My Profile</h3>
                    <div className="update-profile">
                        <h4>Account settings and more</h4>
                        <button>update</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileInfo;
