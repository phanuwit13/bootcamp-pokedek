import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo, Search, Button } from '@atomic';

const FormRegister = ({ pokemonLogo, onRegisterSubmit, onChangePage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <Form>
        <Logo src={pokemonLogo} width={300} />
        <Search
          label="USERNAME"
          placeholder="username"
          onChange={(v) => setUsername(v)}
        />
        <Search
          label="PASSWORD"
          placeholder="password"
          type="password"
          onChange={(v) => setPassword(v)}
        />
        <Search
          label="FIRST NAME"
          placeholder="first name"
          onChange={(v) => setFirstName(v)}
        />
        <Search
          label="LAST NAME"
          placeholder="last name"
          onChange={(v) => setLastName(v)}
        />
        <div>
          <Button
            size="small"
            onClick={() =>
              onRegisterSubmit({ username, password, firstName, lastName })
            }
          >
            REGISTER
          </Button>
        </div>
        <div>
          Have a member ?{' '}
          <Link
            onClick={() => {
              onChangePage('login');
            }}
          >
            Login now
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default FormRegister;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Link = styled.a`
  color: #396bba;
`;
