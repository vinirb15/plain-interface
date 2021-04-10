import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash, FiToggleLeft, FiUser } from 'react-icons/fi';
import axios from '../../services/axios';
import { saveAs } from 'file-saver'

import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import { useCookies } from 'react-cookie'
import { locationsData, groupsData } from '../../data';
import jwt from 'jsonwebtoken'


import './styles.css';
import Loader from '../../components/Loader';

const Management = () => {
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token
    const [users, setUsers] = useState([
        {
            company_name: "",
            createdAt: "",
            email: "",
            first_name: "",
            full_name: "",
            group_id: "",
            group_name: "",
            id: "",
            ip: "",
            lastName: "",
            location_id: "",
            location_name: "",
            password: "",
            phone_number: "",
            profile_id: "",
            status: "",
            updatedAt: "",
            url_image: "",
        }
    ]);
    const [pages, setPages] = useState({
        limit: 5,
        nextPage: "limit=5&offset=5",
        offset: 1,
        pageCount: 5,
        prevPage: "",
        total: "0",
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const [modal, setModal] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [switchConfirmation, setSwitchConfirmation] = useState(false)
    const [modalDate, setModalDate] = useState<any>()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [group, setGroup] = useState('');
    const [permissions, setPermissions] = useState<boolean>()
    const [onSearch, setOnSearch] = useState<boolean>(false)
    const history = useHistory()
    useEffect(() => {
        // handleLoad()
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleLoad() {
        const response: any = await axios.get(`/api/v1/accounts/?limit=5&offset=0`)
        setUsers(response.data.results)
        setPages(response.data)
        setOnSearch(false)
        setLoading(false)
    }

    function handlePermissions() {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    if (decoded.modules.users.read === false) {
                        alert("Permission denied")
                        if (process.env.REACT_APP_URL) {
                            window.location.href = `${process.env.REACT_APP_URL}`
                        }
                    } else {
                        setPermissions(decoded.modules.users.write)
                        handleLoad()
                    }
                }
            })
        } else {
            jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    if (decoded.modules.users.read === false) {
                        alert("Permission denied")
                        if (process.env.REACT_APP_URL) {
                            window.location.href = `${process.env.REACT_APP_URL}`
                        }
                    } else {
                        setPermissions(decoded.modules.users.write)
                        handleLoad()
                    }
                }
            })
        }
    }

    async function handleSwitchPage(page: string) {
        setLoading(true)
        const response: any = await axios.get(`/api/v1/accounts/?${page}`)
        setUsers(response.data.results)
        setPages(response.data)
        setLoading(false)
    }

    async function handleDeleteUser(id: string) {
        try {
            setModalLoading(true)
            await axios.put(`/api/v1/accounts/${id}/blocker`);
            setUsers(users.filter(user => user.id !== id));
            setConfirmation(false)
            alert('User deleted')
            setModalLoading(false)
        } catch (error) {
            alert(error)
            setModalLoading(false)
        }
    }

    async function handleImpersonate(id: string, status: string) {
        if (['INACTIVE', 'BLOCKED'].includes(status)) {
            return alert('Cannot impersonate Inactives users')
        }
        try {
            setModalLoading(true)
            let response = await axios.get(`/api/v1/accounts/impersonate/${id}`);
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            history.push('/')
            window.location.reload()
        } catch (error) {
            alert(error)
            setModalLoading(false)
        }
    }

    async function exportCSV(e: any) {
        const data = new Date().toISOString().split("").splice(5, 5).join("")
        if (e === "excel") {
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/accounts/export/${e}`, {
                method: 'GET',
            }).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                saveAs(blob, `export${data}.xlsx`);
            }).catch(error => {
                alert(error)
            })
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/accounts/export/${e}`, {
                method: 'GET',
            }).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                saveAs(blob, `export${data}.csv`);
            }).catch(error => {
                alert(error)
            })
        }
    }

    async function handleUpdate(id: string) {
        if (firstName === "") {
            setFirstName(modalDate.first_name)
        }
        if (lastName === "") {
            setLastName(modalDate.last_name)
        }
        if (email === "") {
            setEmail(modalDate.email)
        }
        if (location === "") {
            setLocation(modalDate.location_id)
        }
        if (group === "") {
            setGroup(modalDate.group_id)
        }

        else if (group !== "" && location !== "" && email !== "" && firstName !== "" && lastName !== "") {
            const data = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "location_id": location,
                "group_id": group,
            }
            try {
                setModalLoading(true)
                await axios.put(`/api/v1/accounts/${id}`, data);
                alert(`User updated`);
                setLoading(true)
                handleLoad()
                setModal(false)
                setModalLoading(false)
            } catch (error) {
                alert('Error updating user');
                setModalLoading(false)
            }
        }
    }

    async function handleActived(actived: any, id: string) {
        if (actived === true) {
            try {
                await axios.put(`/api/v1/accounts/${id}/inactivate`);

                alert(`User inactivated`);
            } catch (error) {
                alert('Error inactivating user');
            }
            setLoading(true)
            handleLoad()
        } else {
            try {
                await axios.put(`/api/v1/accounts/${id}/activer`);

                alert(`User activated`);
                setLoading(true)
                handleLoad()
            } catch (error) {
                alert('Error activating user');
            }
        }
    }

    async function handleSearchUser(value: string) {
        if (value.length < 1) {
            handleLoad()
        } else {
            try {
                const response: any = await axios.get(`/api/v1/accounts?filter=${value}`)
                setOnSearch(true)
                setUsers(response.data.results)
            } catch (error) {
                console.log(error)
            }
        }
    }

    function actualPage() {
        if (pages.offset === 1) {
            return 1
        }
        if (pages.offset === pages.limit) {
            return 2
        }
        if (pages.offset / pages.limit === 2) {
            return 3
        }
        if (pages.offset !== pages.limit) {
            return (pages.offset / pages.limit) + 1
        }
    }

    function parser(actived: string) {
        if (actived === "ACTIVE") {
            return true
        }
        else if (actived === "INACTIVE") {
            return false
        }
    }

    const handleSelectGroup = (event: any) => {
        setGroup(event.value)
    };

    const handleSelectLocation = (event: any) => {
        setLocation(event.value)
    };

    window.onclick = function (event: any) {
        if (event.target.className === 'modal') {
            setModal(false)
            setConfirmation(false)
            setSwitchConfirmation(false)
        }
    }

    return (
        loading ?
            <Loader />
            :
            <div className="management-content">

                <div className="management-top">

                    <div className="top-left">
                        <h1>Users<b> {pages.total} total</b></h1>
                    </div>
                </div>

                <div className="users-management">
                    <div className="list-header">
                        <TextField
                            // id="standard-basic"
                            label="Search..."
                            onChange={e => handleSearchUser(e.target.value)}
                        />
                        <h2>User Management</h2>
                        <div className="export">
                            <select onChange={e => exportCSV(e.target.value)} name="">
                                <option value="">Export</option>
                                <option value="csv">CSV</option>
                                <option value="excel">Excel</option>
                                {/* <option value="">Print</option> */}
                            </select>
                            {/* <button>New Record</button> */}
                        </div>
                    </div>

                    <table className="users">
                        <thead>
                            <tr>
                                <th id="image"></th>
                                <th>USER</th>
                                <th>LOCATION</th>
                                <th>EMAIL</th>
                                <th>GROUP</th>
                                <th>STATUS</th>
                                <th style={{ display: permissions ? "" : "none" }} >ACTIONS</th>
                            </tr>
                        </thead>


                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td id="image">
                                        <img src={user.url_image} alt="user.png" />
                                    </td>
                                    <td><p className="label-mobile">USER:</p> {user.first_name} {user.lastName}</td>
                                    <td><p className="label-mobile">LOCATION:</p> {user.location_name}</td>
                                    <td><p className="label-mobile">EMAIL:</p> {user.email}</td>
                                    <td><p className="label-mobile">GROUP:</p> {user.group_name}</td>
                                    <td><p className="label-mobile">STATUS:</p> <b style={{ background: parser(user.status) ? "#25ab9f" : "#808080" }}>{parser(user.status) ? 'ACTIVATED' : 'DISABLED'}</b></td>
                                    <td style={{ display: permissions ? "" : "none", width: "15%" }}>
                                        <button title="Active/Disable User" onClick={() => { setSwitchConfirmation(true); setModalDate(user) }}><FiToggleLeft color='#808080' /></button>
                                        <button title="Edit User" onClick={() => { setModal(true); setModalDate(user) }} ><FiEdit color='#808080' /></button>
                                        <button title="Delete User" onClick={() => { setConfirmation(true); setModalDate(user.id) }}><FiTrash color='#808080' /></button>
                                        <button title="Impersonate" onClick={() => { handleImpersonate(user.id, user.status) }}><FiUser color='#808080' /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination" style={{ display: onSearch ? "none" : "" }}>
                        <button disabled={pages.prevPage === ""} onClick={() => { handleSwitchPage(pages.prevPage) }}>Prev Page</button>
                        <h2>Page: {actualPage()}</h2>
                        <button disabled={pages.nextPage === ""} onClick={() => { handleSwitchPage(pages.nextPage) }}>Next Page</button>
                    </div>
                    <div id="myModal" style={{ display: modal ? "block" : "none" }} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span onClick={() => setModal(false)} className="close">&times;</span>
                                <h2>Update User</h2>
                            </div>
                            <div className="modal-content">
                                <form onSubmit={() => handleDeleteUser}>
                                    <TextField
                                        // id="standard-basic"
                                        label={modalDate ? modalDate.first_name : ""}
                                        placeholder="New First Name:"
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                    <TextField
                                        // id="standard-basic"
                                        label={modalDate ? modalDate.last_name : ""}
                                        placeholder="New Last Name:"
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                    <div style={{ width: "100%" }}>
                                        <Select
                                            name="colors"
                                            options={locationsData}
                                            placeholder={modalDate ? modalDate.location_name : ""}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleSelectLocation}
                                        />
                                    </div>
                                    <TextField
                                        // id="standard-basic"
                                        type="email"
                                        label={modalDate ? modalDate.email : ""}
                                        placeholder="New Email:"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <div style={{ width: "100%" }}>
                                        <Select
                                            name="colors"
                                            options={groupsData}
                                            placeholder={modalDate ? modalDate.group_name : ""}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleSelectGroup}
                                        />
                                    </div>
                                    {
                                        modalLoading ?
                                            <Loader />
                                            :
                                            <button className="button" onClick={() => handleUpdate(modalDate.id)} type="button">Update</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="myModal" style={{ display: confirmation ? "block" : "none" }} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <span onClick={() => setConfirmation(false)} className="close">&times;</span> */}
                                <h2>The user will be blocked from the system and his information will be deleted. Do you want to proceed?</h2>
                            </div>
                            <div className="modal-confirmation">
                                <form>
                                    {
                                        modalLoading ?
                                            <Loader />
                                            :
                                            <>
                                                <button type="button" onClick={() => setConfirmation(false)} className="cancelbtn">No</button>
                                                <button type="button" onClick={() => handleDeleteUser(modalDate)} className="deletebtn">Yes</button>
                                            </>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="myModal" style={{ display: switchConfirmation ? "block" : "none" }} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* <span onClick={() => setSwitchConfirmation(false)} className="close">&times;</span> */}
                                <h2>Are you sure you want to activate/disable the user?</h2>
                            </div>
                            <div className="modal-confirmation">
                                <form>
                                    <button type="button" onClick={() => { setSwitchConfirmation(false) }} className="cancelbtn">No</button>
                                    <button type="button" onClick={() => { handleActived(parser(modalDate.status), modalDate.id); setSwitchConfirmation(false) }} className="deletebtn">Yes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default Management;