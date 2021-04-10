import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Loader from '../../components/Loader';
import axios from '../../services/axios';
import './styles.css';
import jwt from 'jsonwebtoken';
// import PieChart from './Graphs/PieChart';
import Formatter from '../CompanyAnnouncements/Formatter';
import { useHistory } from 'react-router-dom';
// import LineChart from './Graphs/LineChart';
// import BarChart from './Graphs/BarChart';
const token = localStorage.getItem('token');

const Analytics = () => {
    const [loading, setLoading] = useState<boolean>(true)
    // const [analytics, setAnalytics] = useState<boolean>(true)
    const [searchAnnouncement, setSearchAnnouncement] = useState<boolean>(false)
    const [searchUser, setSearchUser] = useState<boolean>(false)
    const [announcements, setAnnouncements] = useState(
        [
            {
                title: "",
                amount_emails_sent: 0,
                announcement_id: "",
                createdAt: "",
                dateEmailSent: "",
                open_rate: "",
                open_rate_email: "",
                report_announcement_id: "",
                total_clicks: 0,
                total_opens: 0,
                updatedAt: null,
            }
        ]
    )
    const [users, setUsers] = useState([
        {
            daily_ago: 0,
            email: "",
            full_name: "",
            lastLogin: "",
            group_name: "",
            location_name: "",
            id: "",
            amount_login_in_week: "",
        }
    ])
    // const [userStatus, setUserStatus] = useState({
    //     ACTIVE: 0,
    //     INACTIVE: 0,
    //     BLOCKED: 0,
    // })
    const [userPage, setUserPage] = useState({
        limit: 10,
        nextPage: "limit=10&offset=10",
        offset: 1,
        pageCount: 10,
        prevPage: "",
        total: "0",
    })
    const [announcementPage, setAnnouncementPage] = useState({
        limit: 5,
        nextPage: "",
        offset: 1,
        pageCount: 5,
        prevPage: "",
        total: "0",
    })

    const history = useHistory();

    useEffect(() => {
        handleLoadAnnouncements()
        handleLoadUsers()
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // async function handleLoadStatus() {
    //     await axios.get(`/api/v1/analytics/users/status`).then(response => {
    //         setUserStatus(response.data.results)
    //     })
    // }

    function handlePermissions() {
        if (localStorage.getItem('token')) {
            jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
                if (err) {
                    alert(err)
                } else {
                    if (decoded.modules.analytics.write === false) {
                        setLoading(true);
                        alert("Insufficient Permissions");
                        history.push("/")
                    }
                }
            })
            return
        }
        jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
            if (err) {
                alert(err)
            } else {
                if (decoded.modules.analytics.write === false) {
                    setLoading(true);
                    alert("Insufficient Permissions");
                    history.push("/")
                }
            }
        })
    }

    async function handleLoadAnnouncements() {
        try {
            await axios.get(`/api/v1/analytics/announcements?limit=5&offset=0`).then(response => {
                setAnnouncements(response.data.results)
                setAnnouncementPage(response.data)
                setSearchAnnouncement(false)
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    async function handleLoadUsers() {
        try {
            await axios.get(`/api/v1/analytics/users?limit=5&offset=0`).then(response => {
                setUsers(response.data.results)
                setUserPage(response.data)
                setSearchUser(false)
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    async function handleSwitchPage(page: string, table: string) {
        setLoading(true)
        if (table === "user") {
            const response: any = await axios.get(`/api/v1/analytics/users/?${page}`)
            setUsers(response.data.results)
            setUserPage(response.data)
            setLoading(false)
        }
        if (table === "announcement") {
            const response = await axios.get(`/api/v1/analytics/announcements/?${page}`)
            setAnnouncements(response.data.results)
            setAnnouncementPage(response.data)
            setLoading(false)
        }
    }

    async function handleSearchAnnouncement(value: string) {
        if (value.length < 1) {
            handleLoadAnnouncements()
        } else {
            try {
                const response: any = await axios.get(`/api/v1/analytics/announcements?filter=${value}`)
                setAnnouncements(response.data.results)
                setSearchAnnouncement(true)
            } catch (error) {
                console.log(error)
                setSearchAnnouncement(false)
            }
        }
    }

    async function handleSearchUser(value: string) {
        if (value.length < 1) {
            handleLoadUsers()
        } else {
            try {
                const response: any = await axios.get(`/api/v1/analytics/users?filter=${value}`)
                setUsers(response.data.results)
                setSearchUser(true)
            } catch (error) {
                console.log(error)
                setSearchUser(false)
            }
        }
    }

    function lastLoginConverter(date: number) {
        if (date === 0) {
            return "today"
        }
        if (date >= 30) {
            const daysAgo = `${Math.floor(date / 30)} months ago`
            return daysAgo
        }
        else {
            return `${date} days ago`
        }
    }

    function actualPage(offset: number, limit: number) {
        if (offset === 1) {
            return 1
        }
        if (offset === limit) {
            return 2
        }
        if (offset / limit === 2) {
            return 3
        }
        if (offset !== limit) {
            return (offset / limit) + 1
        }
    }

    async function exportCSV(e: any, id: string) {
        const data = new Date().toISOString().split("").splice(5, 5).join("")
        if (e === "excel") {
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/analytics/announcements/export/excel/${id}`, {
                method: 'GET',
            }).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                saveAs(blob, `export${data}.xlsx`);
            }).catch(error => {
                alert(error)
            })
        }
        if (e === "csv") {
            fetch(`${process.env.REACT_APP_API_URL}/api/v1/analytics/announcements/export/csv/${id}`, {
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

    const tables = (
        <div className="tables">
            <div style={{ display: (Number(announcementPage.total) === 0) ? "none" : "" }} >
                <div className="list-header">
                    <h2>Announcement Report</h2>
                    <TextField
                        label="Search..."
                        onChange={e => handleSearchAnnouncement(e.target.value)}
                    />
                    {/* <div className="export">
                    <select
                        // onChange={e => exportCSV(e.target.value)} 
                        name="">
                        <option value="">Export</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                </div> */}
                </div>

                <table className="users">
                    <thead>
                        <tr>
                            <th style={{ width: "16%!important", textAlign: "center" }}>TITLE</th>
                            <th style={{ width: "16%!important", textAlign: "center", fontSize: "1.1rem" }}>FEG HOME TOTAL OPEN</th>
                            <th style={{ width: "16%!important", textAlign: "center", fontSize: "1.1rem" }}>FEG HOME OPEN RATE</th>
                            <th style={{ width: "16%!important", textAlign: "center" }}>EMAIL SENT</th>
                            <th style={{ width: "16%!important", textAlign: "center" }}>EMAIL OPEN RATE</th>
                            <th style={{ width: "16%!important", textAlign: "center" }}>EMAIL STATUS</th>
                            <th style={{ width: "16%!important", textAlign: "center" }}>EXPORT</th>
                        </tr>
                    </thead>

                    <tbody>
                        {announcements.map(data => (
                            <tr key={data.announcement_id}>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">TITLE:</p>{data.title}</td>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">FEG HOME TOTAL OPEN:</p>{data.total_opens}</td>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">FEG HOME OPEN RATE:</p>{Number(data.open_rate).toFixed(1)}%</td>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">EMAIL SENT:</p>{data.amount_emails_sent}</td>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">EMAIL OPEN RATE:</p>{Number(data.open_rate_email).toFixed(1)}%</td>
                                <td style={{ width: "16%!important", textAlign: "center" }}><p className="label-mobile">EMAIL STATUS:</p>
                                    <b> {(data.dateEmailSent !== "") ? "Sent on" : "Error."}</b>
                                    {
                                        (data.dateEmailSent !== "") ?
                                            `${data.dateEmailSent.split("T")[0] + " " + Formatter(data.dateEmailSent.split('').splice(11, 2).join(''), data.dateEmailSent.toString().split('').splice(13, 3).join(''))}`
                                            :
                                            "Email not triggered"
                                    }
                                </td>
                                <td style={{ width: "16%!important", textAlign: "center" }}>
                                    <select onChange={e => exportCSV(e.target.value, data.announcement_id)} name="">
                                        <option value="">Export</option>
                                        <option value="csv">CSV</option>
                                        <option value="excel">Excel</option>
                                        {/* <option value="">Print</option> */}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    searchAnnouncement ?
                        (<div style={{ marginBottom: "2rem" }}>
                        </div>)
                        :
                        (<div className="pagination" style={{ display: searchAnnouncement ? "none" : "" }}>
                            <button disabled={announcementPage.prevPage === ""} onClick={() => handleSwitchPage(announcementPage.prevPage, "announcement")}>Prev Page</button>
                            <h2>Page: {actualPage(announcementPage.offset, announcementPage.limit)}</h2>
                            <button disabled={announcementPage.nextPage === ""} onClick={() => handleSwitchPage(announcementPage.nextPage, "announcement")}>Next Page</button>
                        </div>)
                }
            </div>

            <div style={{ display: (Number(userPage.total) === 0) ? "none" : "" }}>
                <div className="list-header">
                    <h2>User Activity</h2>
                    <TextField
                        label="Search..."
                        onChange={e => handleSearchUser(e.target.value)}
                    />
                    {/* <div className="export">
                    <select
                        // onChange={e => exportCSV(e.target.value)} 
                        name="">
                        <option value="">Export</option>
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                </div> */}
                </div>
                <table className="users">
                    <thead>
                        <tr>
                            <th style={{ width: "15%!important", textAlign: "center" }}>USER</th>
                            <th style={{ width: "15%!important", textAlign: "center" }}>LOCATION</th>
                            <th style={{ width: "15%!important", textAlign: "center" }}>EMAIL</th>
                            <th style={{ width: "15%!important", textAlign: "center" }}>GROUP</th>
                            <th style={{ width: "15%!important", textAlign: "center", fontSize: "1rem" }}>DAILY LOGIN (LAST 7 DAYS)</th>
                            <th style={{ width: "15%!important", textAlign: "center" }}>LAST LOGIN</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">USER:</p>{user.full_name}</td>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">LOCATION:</p>{user.location_name}</td>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">EMAIL:</p>{user.email}</td>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">GROUP:</p>{user.group_name}</td>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">DAILY LOGIN:</p>{Number(user.amount_login_in_week).toFixed(0)}</td>
                                <td style={{ width: "15%!important", textAlign: "center" }}><p className="label-mobile">LAST LOGIN:</p>{lastLoginConverter(user.daily_ago)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    searchUser ?
                        (<div style={{ marginBottom: "2rem" }}>
                        </div>)
                        :
                        (
                            <div className="pagination" style={{ display: searchUser ? 'none' : '' }}>
                                <button disabled={userPage.prevPage === ""} onClick={() => handleSwitchPage(userPage.prevPage, "user")}>Prev Page</button>
                                <h2>Page: {actualPage(userPage.offset, userPage.limit)}</h2>
                                <button disabled={userPage.nextPage === ""} onClick={() => handleSwitchPage(userPage.nextPage, "user")}>Next Page</button>
                            </div>
                        )
                }
            </div>
        </div>
    )

    // const graphs = (
    //     <>
    //         <div className="chart">

    //             {/* <BarChart title={"User Activity"} /> */}

    //             {/* <LineChart title={"User Activity"} /> */}

    //             <PieChart
    //                 labels={announcements.map((tmp: any) => tmp.title)}
    //                 data={announcements.map((tmp: any) => Math.floor(tmp.open_rate))}
    //                 title={'Email Open Rating'}
    //                 colors={['#3B93AC', '#C191D9', '#9071CE', '#C2C5F0', '#D0E5FF']}
    //             />

    //             <PieChart
    //                 labels={["ACTIVED", "INACTIVED", "BLOCKED"]}
    //                 data={[userStatus.ACTIVE, userStatus.INACTIVE, userStatus.BLOCKED]}
    //                 title={'User Status'}
    //                 colors={['#3B93AC', '#C191D9', '#D0E5FF']}
    //             />

    //         </div>
    //     </>
    // )

    return (
        loading ?
            <Loader />
            :
            <div className="management-content">
                {/*/ <div className="Analytics">
                     <button style={{ borderRadius: "1rem 0 0 0" }} onClick={() => setAnalytics(true)} disabled={analytics ? true : false}>Tables</button>
                     <button style={{ borderRadius: "0 1rem 0 0" }} onClick={() => setAnalytics(false)} disabled={analytics ? false : true}>Graphics</button>
                 </div>/*/}
                <div className="users-management" id="analytics-management">
                    {
                        tables
                    }
                </div>
            </div>
    )
}
export default Analytics;