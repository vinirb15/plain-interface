import React, { useState, useEffect } from 'react';

import './styles.css';

import Company from './GeneralList';

import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie'

const Announcements: React.FC = () => {
    const [permissions, setPermissions] = useState(false);
    const [btn, setBtn] = useState(
        {
            content: 1,
            btnCompany: '#fff',
            btnLocal: '',
            btnGroup: '',
            btnOthers: ''
        },
    );
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token

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
                    setPermissions(decoded.modules.announcements.write)
                }
            })
        } else {
            jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    setPermissions(decoded.modules.announcements.write)
                }
            })
        }
    }

    function changeContent() {
        if (btn.content === 1) {
            return <Company type="companies" description="General" />
        }
        if (btn.content === 2) {
            return <Company type="locations" description="Local" />
        }
        if (btn.content === 3) {
            return <Company type="groups" description="Group" />
        }
        if (btn.content === 4) {
            return <Company type="others" description="Others" />
        }
    }

    return (
        <div className="announcements">
            <div className="announcements-sidebar">
                <button className="GeneralAnnouncement" style={{ color: btn.btnCompany }} onClick={() => setBtn({ content: 1, btnCompany: '#fff', btnLocal: '', btnGroup: '', btnOthers: '' })}>General Announcements</button>
                <button className="LocalAnnouncement" style={{ display: permissions ? "" : "none", color: btn.btnLocal }} onClick={() => setBtn({ content: 2, btnCompany: '', btnLocal: '#fff', btnGroup: '', btnOthers: '' })}>Local Announcements</button>
                <button className="GroupAnnouncement" style={{ display: permissions ? "" : "none", color: btn.btnGroup }} onClick={() => setBtn({ content: 3, btnCompany: '', btnLocal: '', btnGroup: '#fff', btnOthers: '' })}>Group Announcements</button>
                <button className="OthersAnnouncement" style={{ display: permissions ? "" : "none", color: btn.btnOthers }} onClick={() => setBtn({ content: 4, btnCompany: '', btnLocal: '', btnGroup: '', btnOthers: '#fff' })}>Others Announcements</button>
            </div>
            <div className="announcements-content">
                {
                    changeContent()
                }
            </div>
        </div>
    )
}

export default Announcements;
