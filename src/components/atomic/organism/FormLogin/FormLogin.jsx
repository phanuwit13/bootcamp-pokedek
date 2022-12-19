import React, { useState } from 'react'
import styled from 'styled-components'
import { Logo, Search, Button } from '@atomic'
import pokemonLogo from '@/assets/images/pokedex.png'

const FormLogin = ({ onSetStatePage, onLogin, onClearError }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Form>
      <Logo src={pokemonLogo} width={200} />
      <Search
        label='username'
        placeholder='username'
        onChange={(v) => {
          setUserName(v)
          onClearError()
        }}
      />
      <Search
        label='password'
        placeholder='password'
        type='password'
        onChange={(v) => {
          setPassword(v)
          onClearError()
        }}
      />
      <Button
        size='small'
        onClick={() => {
          onLogin({
            userName,
            password,
          })
        }}
      >
        LOGIN
      </Button>
      <div>
        Not a member?{' '}
        <Link
          onClick={() => {
            onSetStatePage('register')
          }}
        >
          Register now
        </Link>
      </div>
    </Form>
  )
}

export default FormLogin

const Link = styled.span`
  color: blue;
  cursor: pointer;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
