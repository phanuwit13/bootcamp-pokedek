import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert } from 'antd'
import { FormLogin, FormRegister } from '@atomic'
import { pokemonUser } from '@utils'

const DEFAULT_ALERT = {
  data: '',
  type: 'info',
}

const LoginPage = ({ setToken, setUser }) => {
  const [state, setState] = useState('login')
  const [alertData, setAlertData] = useState(DEFAULT_ALERT)

  const onSetStatePage = (page) => {
    onClearError()
    setState(page)
  }

  const onRegister = async (data) => {
    console.log(data)
    const response = await pokemonUser.post(`register`, data)
    console.log('response', response)
    if (response.data.success) {
      onClearError()
      setAlertData({
        data: 'REGISTER SUCCESSFUL',
        type: 'success',
      })
    } else {
      setAlertData({
        data: response.data.data,
        type: 'error',
      })
    }
  }

  const onLogin = async (data) => {
    console.log(data)
    const response = await pokemonUser.post(`login`, data)
    console.log('response', response)
    if (response.data.success) {
      onClearError()
      setToken(response.data._token)
      setUser(response.data.data[0])
    } else {
      setAlertData({
        data: response.data.data,
        type: 'error',
      })
    }
  }

  const onClearError = () => {
    setAlertData(DEFAULT_ALERT)
  }

  return (
    <Wrapper>
      {alertData.data && (
        <AlertWrapper>
          <Alert message={alertData.data} type={alertData.type} />
        </AlertWrapper>
      )}

      {state === 'login' && (
        <FormLogin
          onSetStatePage={onSetStatePage}
          onLogin={onLogin}
          onClearError={onClearError}
        />
      )}
      {state === 'register' && (
        <FormRegister
          onSetStatePage={onSetStatePage}
          onRegister={onRegister}
          onClearError={onClearError}
        />
      )}
    </Wrapper>
  )
}

export default LoginPage

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`

const AlertWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
`
