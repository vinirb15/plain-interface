import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"

import SignRoutes from './signRoutes'
import PrivateRoutes from './privateRoutes'

const Routes: React.FC = () => {
  const [token, setToken] = useState<any>(null)

  useEffect(() => { 
    if (sessionStorage.getItem('@App:token')?.length) {
      const jwt: any = jwt_decode(sessionStorage.getItem('@App:token') || '')
      const currentTime = Date.now() / 1000

      if (jwt.length || jwt?.exp < currentTime) {
        setToken(null)
      } else {
        setToken(jwt)
      }
    }
  }, [])
  
  if (token && token?.exp) {
    return <PrivateRoutes />
  }
  return <PrivateRoutes />
  // return <SignRoutes />
}

export default Routes
