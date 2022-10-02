import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo, Search, Button } from '@atomic';

const FormLogin = ({ pokemonLogo, onLoginSubmit, onChangePage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        <div>
          <Button
            size="small"
            onClick={() =>
              onLoginSubmit({
                username,
                password
              })
            }
          >
            LOGIN
          </Button>
        </div>
        <div>
          Not a member ? {''}
          <Link
            onClick={() => {
              onChangePage('register');
            }}
          >
            Register now
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default FormLogin;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Link = styled.a`
  color: #396bba;
`;
