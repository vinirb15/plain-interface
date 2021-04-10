import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import axios from '../../../services/axios';
import Loader from '../../Loader';

import Select from 'react-select';
import { groupsData } from '../../../data';

import './styles.css';

const Profile: React.FC = () => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const [group, setGroup] = useState<string>('')
    const [requests, setRequests] = useState(
        {
            addresses: {
                full: "",
            },
            email: "",
            first_name: "",
            last_name: "",
            location_name: "",
            phone_number: "",
            url_image: "",
        }
    );

    useEffect(() => {
        loadUsersValidate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const match: any = useRouteMatch('/user/:id');
    const id: any = (match?.params?.id || '')

    async function loadUsersValidate() {
        try {
            await axios.get(`/api/v1/accounts/${id}`).then(response => {
                setRequests(response.data.results);
                setLoaded(true)
            })
        } catch (error) {
            history.push(`/home/${userID}`)
        }
    }

    const userID = localStorage.getItem('id')

    async function activeUser() {
        const data = {
            group_id: group,
            status: "ACTIVE",
        }
        try {
            setModalLoading(true)
            await axios.put(`/api/v1/accounts/${id}`, data)
            alert("User activated")
            history.push(`/user`)
        } catch (error) {
            setModalLoading(false)
            alert(error)
        }
    }


    async function blockUser() {
        try {
            setModalLoading(true)
            await axios.put(`/api/v1/accounts/${id}/blocker`)
            alert("User blocked")
            history.push(`/user`)
        } catch (error) {
            setModalLoading(false)
            alert(error)
        }
    }

    const history = useHistory();

    const handleChange = (event: any) => {
        setGroup(event.value)
    };

    return (
        (loaded ?
            <>
                <div className="user-validation">
                    <img src={requests.url_image} alt="FEG LOGO" />

                    <div className="description">
                        <h2>Name: <b>{requests.first_name}</b></h2>
                        <h2>Last Name: <b>{requests.last_name}</b></h2>
                        <h2>Email: <b>{requests.email}</b></h2>
                        <h2>Personal Address: <b>{requests.addresses.full}</b></h2>
                        <h2>Phone Number: <b>{requests.phone_number}</b></h2>
                        <h2>Main Location: <b>{requests.location_name}</b></h2>
                        <Select
                            id="demo-simple-select"
                            name="colors"
                            options={groupsData}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleChange}
                            placeholder="Select Group..."
                        />
                        <p>Select which group the user will belong within the system.</p>
                    </div>

                    {(modalLoading ? <Loader /> :
                        <div className="actions">
                            <button style={{ background: "#25ab9f" }} onClick={activeUser}>Confirm User</button>
                            <button style={{ background: "#e0001b" }} onClick={blockUser}>Block User</button>
                        </div>
                    )}

                </div>
            </>
            :
            <Loader />
        )
    )
}

export default Profile;
