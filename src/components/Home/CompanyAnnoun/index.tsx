import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import Loader from '../../Loader';
import axios from '../../../services/axios';
import Formatter from '../../CompanyAnnouncements/Formatter';

const Content = () => {

    const [loaded, setLoaded] = useState<boolean>(true);
    const [have, setHave] = useState<boolean>(false);
    const [announcements, setAnnouncements] = useState(
        {
            id: "",
            subject: "",
            info: "",
            url_image: "",
            createdAt: "",
        }
    );

    useEffect(() => {
        loadUsersValidate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadUsersValidate() {
        try {
            await axios.get(`/api/v1/announcements/last`).then(response => {
                if (response.data.results.length !== 1) {
                    setAnnouncements(response.data.results);
                    setHave(true)
                    setLoaded(true)
                }
            })
        } catch (error) {
            // history.push(`/announcements`)
            console.log(error)
        }
    }

    const history = useHistory();

    function handleRedirect(e: any) {
        e.preventDefault()
        history.push(`/announcements`)
    }

    return (
        <div className="company">
            <Link to="/announcements">
                <h1>Company Announcements</h1>
            </Link>
            {
                have ?
                    (<div className="home-announcement">
                        <p className="text" style={{ display: loaded ? "none" : "block" }}>{announcements.createdAt.split('').splice(0, 11).join('')} {Formatter(announcements.createdAt.split('').splice(12, 2).join(''), announcements.createdAt.split('').splice(14, 3).join(''))}</p>
                        <div className="content">
                            <img style={{ display: loaded ? "none" : "block" }} src={announcements.url_image} onLoad={() => setLoaded(false)} alt="Announcement" />
                            {
                                (loaded ? <Loader /> : <></>)
                            }
                        </div>
                        <h1>{announcements.subject}</h1>
                        {/* <h2 className="text">{announcements.info}</h2> */}
                        <div className="description" dangerouslySetInnerHTML={{ __html: `${announcements.info}` }} />
                        <button onClick={handleRedirect}>See more...</button>
                    </div>)
                    :
                    <>
                        <br />
                        <h1>No have last general results</h1>
                    </>
            }
        </div>
    );
}

export default Content;
