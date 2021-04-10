import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../services/axios';
import jwt from 'jsonwebtoken';
import { FiTrash } from 'react-icons/fi';
import Formatter from '../Formatter';
import { useCookies } from 'react-cookie'

import './styles.css';

import Loader from '../../Loader';

const Announcements = (content: any) => {
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token
    const [loaded, setLoaded] = useState<boolean>(true);
    const [requestLoaded, setRequestLoaded] = useState<boolean>(false);
    const [modalDate, setModalDate] = useState<any>();
    const [confirmation, setConfirmation] = useState(false);
    const [permissions, setPermissions] = useState(false);

    const [announcements, setAnnouncements] = useState([
        {
            id: "",
            owner_id: "",
            location_id: "",
            subject: "",
            info: "",
            url_image: "",
            createdAt: "",
            updatedAt: "",
            location_name: "",
            full_name: "",
            viewd: false
        }
    ]);

    useEffect(() => {
        loadRequests()
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadRequests() {
        try {
            await axios.get(`api/v1/announcements/${content.type}`).then(response => {
                setAnnouncements(response.data.results);
                setLoaded(false)
            })
        } catch (error) {
            alert(error)
        }
    }

    async function handleDeleteAnnouncement(id: string) {
        try {
            setRequestLoaded(true)
            await axios.patch(`/api/v1/announcements/${id}`, {
                visibility: false
            })
            setAnnouncements(announcements.filter(e => e.id !== id));
            setConfirmation(false)
            alert('Announcement deleted')
            setRequestLoaded(false)
        } catch (error) {
            alert('Error')
            setRequestLoaded(false)
        }
    }

    function handlePermissions() {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    setPermissions(decoded.modules.announcements.delete)
                }
            })
        } else {
            jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    setPermissions(decoded.modules.announcements.delete)
                }
            })
        }
    }

    window.onclick = function (event: any) {
        if (["GeneralAnnouncement", "LocalAnnouncement", "GroupAnnouncement", "OthersAnnouncement"].includes(event.target.classList.value)) {
            setLoaded(true)
            loadRequests()
        }
        if (event.target.className === 'modal') {
            setConfirmation(false)
        }
    }

    return (
        (
            loaded ? 
            <div style={{marginTop: "5%", width: "100%", height: "100%"}}>
                <Loader /> 
            </div>
            :
                <div className="company-announcements">
                    {
                        announcements[0] ?
                            (
                                announcements.map(request => (
                                    <div style={{ background: request.viewd ? "" : "#f9f9f9" }} key={request.id} className="announcements-card">
                                        <div className="announcement-options">
                                            <Link to={`/announcements/company/${request.id}`}>
                                                <h1>{request.subject}</h1>
                                            </Link>
                                            <div style={{ display: permissions ? "" : "none" }}>
                                                <button title="Delete Announcement" disabled={permissions ? false : true} onClick={() => { setConfirmation(true); setModalDate(request.id) }}><FiTrash color='#808080' size={20} /></button>
                                            </div>
                                        </div>
                                        <p>{request.createdAt.split('').splice(0, 11).join('')} {Formatter(request.createdAt.split('').splice(12, 2).join(''), request.createdAt.split('').splice(14, 3).join(''))}</p>
                                        <p>author: <b>{request.full_name}</b></p>
                                    </div>
                                ))
                            )
                            :
                            <h1 style={{ marginTop: "1rem" }}>No {content.description} results</h1>
                    }
                    <div id="myModal" style={{ display: confirmation ? "block" : "none" }} className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span onClick={() => setConfirmation(false)} className="close">&times;</span>
                                <h2>Are you sure you would like to remove this announcement?
                                <br />
                                The announcement will be deleted for all users and it cannot be recovered.
                                <br />
                                The automatic emails generated at the time of the
                                announcement creation will still exist.
                                </h2>
                            </div>
                            <div className="modal-confirmation">
                                <form>
                                    {
                                        requestLoaded ?
                                            <Loader />
                                            :
                                            <>
                                                <button type="button" onClick={() => setConfirmation(false)} className="cancelbtn">No</button>
                                                <button type="button" onClick={() => handleDeleteAnnouncement(modalDate)} className="deletebtn">Yes</button>
                                            </>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    )
}

export default Announcements;