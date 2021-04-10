import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accepted: 'appication/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
