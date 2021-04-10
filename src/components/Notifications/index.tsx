import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

import axios from '../../services/axios';
import './styles.css';

const Notifications = (props: any) => {
    const [notifications, setNotifications] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        notify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function notify() {
        const notifications = sessionStorage.getItem('noti')
        if (!notifications) {
            await axios.get(`/api/v1/announcements/notify`).then(e => {
                setNotifications(e.data.results.total)
                sessionStorage.setItem('notifications', e.data.results.total)
            })
        } else if (notifications) {
            setNotifications(Number(notifications))
            await axios.get(`/api/v1/announcements/notify`).then(e => {
                sessionStorage.setItem('notifications', e.data.results.total)
                if (e.data.results.total !== notifications) {
                    setNotifications(e.data.results.total)
                }
            })
        }
    }

    window.onclick = function (event: any) {
        if (event.target.className === 'modal') {
            setModal(false)
        }
    }

    const myModal = (
        <div id="myModal" style={{ display: modal ? "block" : "none" }} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={() => setModal(false)} className="close">&times;</span>
                </div>
                <div className="modal-text">
                    {
                        (notifications <= 0) ?
                            <h2>You don't have new announcements</h2>
                            :
                            <h2 onClick={() => history.push('/announcements')}>You have {notifications} announcements to read</h2>
                    }
                </div>
            </div>
        </div>)

    return (
        <div className="notifications-button">
            <h1 style={{display: (notifications <= 0) ? "none" : ""}}>{notifications >= 1 ? "+" : ""}{notifications}</h1>
            <button onClick={() => setModal(true)} className={(notifications >= 1) ? 'image' : ''} title="Notifications"><FiBell color={props.color} size={25} /></button>

            {
                myModal
            }
        </div>
    )
}
export default Notifications;