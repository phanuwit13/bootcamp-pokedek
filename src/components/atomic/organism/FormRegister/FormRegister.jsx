import React, { useState } from 'react'
import styled from 'styled-components'
import { Logo, Search, Button } from '@atomic'
import pokemonLogo from '@/assets/images/pokedex.png'

const FormRegister = ({ onSetStatePage, onRegister, onClearError }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <Form>
      <Logo src={pokemonLogo} width={200} />
      <Search
        label='first name'
        placeholder='first name'
        onChange={(v) => {
          setFirstName(v)
          onClearError()
        }}
      />
      <Search
        label='last name'
        placeholder='last name'
        onChange={(v) => {
          setLastName(v)
          onClearError()
        }}
      />
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
          onRegister({
            firstName,
            lastName,
            userName,
            password,
          })
        }}
      >
        REGISTER
      </Button>
      <div>
        HAave a member?{' '}
        <Link
          onClick={() => {
            onSetStatePage('login')
          }}
        >
          Login now
        </Link>
      </div>
    </Form>
  )
}

export default FormRegister

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
