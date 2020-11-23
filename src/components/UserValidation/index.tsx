import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiUser, FiUserPlus } from 'react-icons/fi'

import axios from 'axios';

import './styles.css';

const Register = () => {
    const [requests, setRequests] = useState();

    const history = useHistory();

    useEffect(() => {
        // loadRequests()
    }, []);

    async function loadRequests() {
        await axios.get('/user').then(response => {
            setRequests(response.data);
            console.log(requests)
        })
    }

    function handleValidate() {
        localStorage.clear();

        history.push(`/`);
    }

    return (
        <div className="requests-container">
            <div>
                <button><FiUserPlus /> New Member</button>
                <h2>You have <b>06</b> new account requests</h2>
            </div>

            <div className="content">
                <h3>FEG Employees</h3>
                <ul>
                    <li>
                        <h1><FiUser /> michaeljordan@fegllc.com<button onClick={handleValidate}>Validate user</button></h1>
                        <h1><FiUser /> michaeljordan@fegllc.com<button onClick={handleValidate}>Validate user</button></h1>
                    </li>

                </ul>

                <h3>FEG Partners</h3>
                <ul>
                    <li>
                        <h1><FiUser /> joe@company.com<button onClick={handleValidate}>Validate user</button></h1>
                        <h1><FiUser /> joe@company.com<button onClick={handleValidate}>Validate user</button></h1>
                    </li>
                </ul>
            </div>

            {/* <ul>
                {requests.map(request => (
                    <li key={request.employees.id}>
                        <h1>{request.employees.email}<button onClick={handleValidate}></button></h1>
                    </li>
                ))}
            </ul>
            <ul>
                {requests.map(request => (
                    <li key={request.partners.id}>
                        <h1>{request.partners.email}<button onClick={handleValidate}></button></h1>
                    </li>
                ))}
            </ul> */}


        </div>
    );
}

export default Register;
