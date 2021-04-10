import React, { useState, useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Emoji } from 'emoji-mart'

import './styles.css'

import axios from '../../../../services/axios'
import Loader from '../../../Loader'
import Formatter from '../../Formatter'

const Announcements: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(true)
  const [opinionEmoji, setOpinionEmoji] = useState<string>()
  const [announcements, setAnnouncements] = useState({
    id: '',
    owner_id: '',
    location_id: '',
    subject: '',
    info: '',
    url_image: '',
    createdAt: '',
    created_by: {
      id: '',
      location_id: '',
      profile_id: '',
      first_name: '',
      last_name: '',
      createdAt: ''
    }
  })

  const history = useHistory()

  useEffect(() => {
    loadUsersValidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const router = useRouteMatch()
  const match: any = useRouteMatch(`/announcements/${router.url.split('/')[2]}/:id`)
  const id: any = match?.params?.id || ''

  async function loadUsersValidate() {
    try {
      await axios.get(`/api/v1/announcements/${id}`).then((response) => {
        setAnnouncements(response.data.results)
        setOpinionEmoji(response.data.results?.opinion?.emoji)
        setLoaded(true)
      })
    } catch (error) {
      history.push(`/announcements`)
    }
  }

  const sendInteraction = (opinion: string) => {
    axios.put(`/api/v1/announcements/${id}/interaction`, { opinion })
    setOpinionEmoji(opinion)
  }

  return (
    <>
      <div className='company-announcement'>
        <p style={{ display: loaded ? 'none' : 'block', marginBottom: '1rem' }}>
          {announcements.createdAt.split('').splice(0, 11).join('')}{' '}
          {Formatter(
            announcements.createdAt.split('').splice(12, 2).join(''),
            announcements.createdAt.split('').splice(14, 3).join('')
          )}
        </p>
        <div className='content'>
          <img
            style={{ display: loaded ? 'none' : 'block' }}
            src={announcements.url_image}
            onLoad={() => setLoaded(false)}
            alt='Announcement'
          />
          {loaded ? <Loader /> : <>

            <p style={{ display: loaded ? 'none' : 'block', marginTop: '.5rem' }}>Author: {announcements.created_by.first_name} {announcements.created_by.last_name}</p>
            <h1>{announcements.subject}</h1>
            <div dangerouslySetInnerHTML={{ __html: `${announcements.info}` }} />

            {!opinionEmoji ? (
              <div className='rate-container'>
                <hr />
                <h3>Was this helpful?</h3>
                <div className='center-emoji'>
                  <span onClick={() => sendInteraction('white_frowning_face')}>
                    <Emoji emoji='white_frowning_face' set='apple' size={30} />
                  </span>
                  <span onClick={() => sendInteraction('neutral_face')}>
                    <Emoji emoji='neutral_face' set='apple' size={30} />
                  </span>
                  <span onClick={() => sendInteraction('grinning')}>
                    <Emoji emoji='grinning' set='apple' size={30} />
                  </span>
                </div>
                <hr />
              </div>
            ) : (
                <div style={{paddingTop: '1rem'}}></div>
              )}
          </>}
        </div>
      </div>
    </>
  )
}

export default Announcements
