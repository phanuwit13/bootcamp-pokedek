import { useState } from 'react'
import jwt_decode from 'jwt-decode'

function useToken() {
  const savaToken = (tokenData) => {
    window.localStorage.setItem('token', JSON.stringify(tokenData))
    setToken(tokenData)
  }

  const savaUser = (userData) => {
    window.localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const getToken = () => {
    let tokeString = window.localStorage.getItem('token')
    let userString = window.localStorage.getItem('user')

    let userToken = JSON.parse(tokeString)
    let userData = JSON.parse(userString)

    if (userToken) {
      let decoded = jwt_decode(userToken)
      let currentTime = Math.floor(new Date().getTime() / 1000)
      console.log(decoded.exp - currentTime)
      if (decoded.exp - currentTime <= 0) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        return { userToken: '', userData: '' }
      }
      return { userToken, userData }
    } else {
      return { userToken: '', userData: '' }
    }
  }

  const clearToken = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    setToken('')
    setUser('')
  }

  const [token, setToken] = useState(getToken().userToken)
  const [user, setUser] = useState(getToken().userData)

  return {
    token,
    savaToken,
    user,
    savaUser,
    clearToken,
  }
}

export { useToken }
