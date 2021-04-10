import React, { useEffect, useState } from 'react'

import Loader from '../../components/Loader'
import { useCookies } from 'react-cookie'

import './styles.css'

const HomePage: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(true)
  const [cookies, ,] = useCookies(["token"]);
  const token: any = cookies.token
  useEffect(() => {
    if (token !== undefined || token !== null) {
      setLoaded(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    loaded ?
      <div style={{ marginTop: "40vh" }}>
        <Loader />
      </div>
      :
      <div className="notfound">
        <h1>Oops!</h1>
        <h2>You are not allowed to access this area of the system.
                        Please login again or contact your system administrator.</h2>
        <a href={`${process.env.REACT_APP_ACCOUNT_URL}/logout`}>Go To Login</a>
      </div>
  );
}

export default HomePage
