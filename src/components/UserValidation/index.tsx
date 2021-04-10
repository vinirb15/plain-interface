import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader'

import axios from '../../services/axios';
import { useCookies } from 'react-cookie'
import jwt from 'jsonwebtoken';

import './styles.css';

const Register = () => {
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token
    const [loaded, setLoaded] = useState<boolean>(true)
    const [requests, setRequests] = useState(
        {
            Employee: [{
                id: "",
                firstName: "",
                lastName: "",
                location_name: "",
                location_id: "",
                email: "",
                group_name: "",
            }],
            Partner: [{
                id: "",
                firstName: "",
                lastName: "",
                location_name: "",
                location_id: "",
                email: "",
                group_name: "",
            }]
        }
    );

    const history = useHistory();

    useEffect(() => {
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadRequests() {
        await axios.get('/api/v1/accounts?status=INACTIVE&group=profile').then(response => {
            setRequests(response.data.results);
            setLoaded(false)
        })
    }

    function handlePermissions() {
        jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
            if (err) {
                alert(err)
            } else {
                if (decoded.modules.announcements.write === false) {
                    alert("Permission denied")
                    window.location.href = `${process.env.REACT_APP_URL}`                
                } else {
                    loadRequests()
                }
            }
        })
    }

    function handleValidate(id: string) {
        history.push(`/user/${id}`);
    }

    return (

        (
            loaded ? <Loader />
                :
                <div className="requests-container">

                    <div className="thiscontent">

                        <h3>FEG Employees</h3>
                        {
                            requests.Employee ?
                                <ul>
                                    {requests.Employee.map(request => (
                                        <li key={request.id}>
                                            <h1>{request.email}<button onClick={() => handleValidate(request.id)}>Validate user</button></h1>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <h1>0 Employee to confirm</h1>
                        }

                        <h3>FEG Partners</h3>
                        {
                            requests.Partner ?
                                <ul>
                                    {requests.Partner.map(request => (
                                        <li key={request.id}>
                                            <h1>{request.email}<button onClick={() => handleValidate(request.id)}>Validate user</button></h1>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <h1>0 Partner to confirm</h1>
                        }

                    </div>

                </div>
        )

    );
}

export default Register;
