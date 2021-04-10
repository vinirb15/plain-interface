import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUserCheck, FiUsers, FiPlusSquare, FiCalendar, FiBookOpen, FiPieChart } from 'react-icons/fi';
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie'

import './styles.css';

import Monograma from '../../assets/Monograma.png';
import Loginbutton from '../LoginButton';
import Notifications from '../Notifications';

const SideBar = (props: any) => {
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token
    const [permissions, setPermissions] = useState({
        announcements: { list: false, read: false, write: false },
        events: { list: false, read: false, write: false },
        groups: { list: false, read: false, write: false },
        locations: { list: false, read: false, write: false },
        users: { list: false, read: false, write: false },
        analytics: { list: false, read: false, write: false },
    })
    useEffect(() => {
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handlePermissions() {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    setPermissions(decoded.modules)
                }
            })
            return
        }
        jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
            if (err) {
                alert(err)
            } else {
                setPermissions(decoded.modules)
            }
        })
    }
    return (
        <div className="sidebar">
            <img id="monograma" src={Monograma} alt="FEG LOGO" />
            <Link to="/" className={props.home} title="Home"><FiHome size={20} /></Link>
            <div
            // style={{ display: permissions.announcements.list ? "block" : "none" }}
            >
                <Link to="/announcements" className={props.announcements} title="Company Announcements"><FiBookOpen size={20} /></Link>
            </div>
            <div style={{ display: permissions.users.write ? "block" : "none" }}>
                <Link to="/user" className={props.validate} title="Users Validations"><FiUserCheck size={20} /></Link>
            </div>
            <div style={{ display: permissions.users.list ? "block" : "none" }}>
                <Link to="/management" className={props.users} title="Users Management"><FiUsers size={20} /></Link>
            </div>
            <div style={{ display: permissions.announcements.write ? "block" : "none" }}>
                <Link to="/announcements/new" className={props.newAnnouncement} title="New Announcement"><FiPlusSquare size={20} /></Link>
            </div>
            <Link to="/calendar" className={props.calendar} title="Company Calendar"><FiCalendar size={20} /></Link>
            <div style={{ display: permissions.analytics.write ? "block" : "none" }}>
                <Link to="/analytics" className={props.analytics} title="Analytics"><FiPieChart size={20} /></Link>
            </div>
            <div id="config">
                <Notifications color="#f5f5f5" size={20} title="Notifications" />
            </div>
            <div id="config">
                <Loginbutton color="#f5f5f5" size={20} title="Configuration" width='100%' />
            </div>
        </div>
    )
}

export default SideBar;
