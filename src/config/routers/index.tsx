import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useCookies } from 'react-cookie'
import SignRoutes from './signRoutes'
import PrivateRoutes from './privateRoutes'
// import socketIOClient from 'socket.io-client'

const Routes: React.FC = () => {
  const [token2, setToken] = useState<any>(null)
  const [cookies, , removeCookie] = useCookies(["token"])
  const token: any = cookies.token

  useEffect(() => {
    handleLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleLogin() {
    if (localStorage.getItem('token')) {
      try {
        jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
          if (err) {
            localStorage.clear()
            if (process.env.REACT_APP_ACCOUNT_URL) {
              window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
            }
            console.log(err)
          } else {
            setToken(token)
            localStorage.setItem('id', decoded.id)
            localStorage.setItem('firstName', decoded.first_name)
            localStorage.setItem('lastName', decoded.last_name)
            localStorage.setItem('email', decoded.email)
            localStorage.setItem('image_url', decoded.url_image)

            // const socket = socketIOClient(process.env.REACT_APP_API_URL || '', {
            //   query: {token}, transports: ['websocket', 'polling', 'flashsocket']
            // })

            // socket.on("FromAPI", (data: any) => {})
          }
        })
      } catch (error) {
        console.log(error)
        removeCookie("token")
        localStorage.clear()
        if (process.env.REACT_APP_ACCOUNT_URL) {
          window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
        }
      }
      return
    }
    else if (token !== undefined && token !== null) {
      try {
        jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
          if (err) {
            localStorage.clear()
            if (process.env.REACT_APP_ACCOUNT_URL) {
              window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
            }
            console.log(err)
          } else {
            setToken(token)
            localStorage.setItem('token', token)
            localStorage.setItem('id', decoded.id)
            localStorage.setItem('firstName', decoded.first_name)
            localStorage.setItem('lastName', decoded.last_name)
            localStorage.setItem('email', decoded.email)
            localStorage.setItem('image_url', decoded.url_image)

            // const socket = socketIOClient(process.env.REACT_APP_API_URL || '', {
            //   query: {token}, transports: ['websocket', 'polling', 'flashsocket']
            // })
            // socket.on("FromAPI", (data: any) => {})
          }
        })
      } catch (error) {
        console.log(error)
        removeCookie("token")
        localStorage.clear()
        if (process.env.REACT_APP_ACCOUNT_URL) {
          window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
        }
      }
    } else {
      removeCookie("token")
      localStorage.clear()
      if (process.env.REACT_APP_ACCOUNT_URL) {
        window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
      }
    }
  }

  if (token2) {
    return <PrivateRoutes />
  }

  return <SignRoutes />
}

export default Routes