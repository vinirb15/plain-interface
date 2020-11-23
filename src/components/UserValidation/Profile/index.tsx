import React from 'react';

import Monograma from '../../../assets/Monograma.png'

import './styles.css';

const Profile: React.FC = () => {


    return (
        <>
            <div className="user-validation">
                <img src={Monograma} alt="FEG LOGO" />

                <div className="description">
                    <h2>First Name <b>Michael</b></h2>
                    <h2>Last Name <b>Jeffrey Jordan</b></h2>
                    <h2>Email <b>michaeljordan@fegllc.com</b></h2>
                    <h2>Personal Address <b>1901 west madison street, chicago, 1L 60612</b></h2>
                    <h2>Phone Number <b>+1 321 222 1212</b></h2>
                    <h2>Main Location <b>FEG Headquarters Itasca</b></h2>
                    <h2>Position <b>CBO (Chief Basketball Officer)</b></h2>
                </div>

                <div className="actions">
                    <button style={{background: "#25ab9f"}}>Confirm User</button>
                    <button style={{background: "#e0001b"}}>Block User</button>
                </div>

            </div>
        </>
    )
}

export default Profile;
