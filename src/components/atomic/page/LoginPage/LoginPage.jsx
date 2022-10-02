import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import styled from 'styled-components';
import { FormLogin, FormRegister } from '@atomic';
import pokemonLogo from '@/assets/images/pokedex.png';
import { pokemonApiUserData } from '@utils';

const DEFAULT_ALERT = {
  data: '',
  type: 'info'
};

const LoginPage = ({ setToken, setUser }) => {
  // let navigate = useNavigate();
  const [pageState, setPageState] = useState('login');
  const [alertMsg, setAlertMsg] = useState(DEFAULT_ALERT);

  const onLoginSubmit = async (data) => {
    if (data.username && data.password) {
      setAlertMsg(DEFAULT_ALERT);
      let formData = {
        userName: data.username,
        password: data.password
      };
      let response = await pokemonApiUserData.post('login', formData);
      if (response.data.success) {
        setToken(response.data._token);
        setUser(response.data.data[0]);
      } else {
        setAlertMsg({
          data: response.data.data,
          type: 'error'
        });
      }
    } else {
      setAlertMsg({
        data: 'invalid data',
        type: 'warning'
      });
    }
  };

  const onRegisterSubmit = async (data) => {
    if (data.username && data.password && data.firstName && data.lastName) {
      setAlertMsg(DEFAULT_ALERT);
      let formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.username,
        password: data.password
      };
      let response = await pokemonApiUserData.post('register', formData);
      if (response.data.success) {
        setAlertMsg({
          data: 'Register Success',
          type: 'success'
        });
      } else {
        setAlertMsg({
          data: response.data.data,
          type: 'error'
        });
      }
    } else {
      setAlertMsg({
        data: 'invalid data',
        type: 'warning'
      });
    }
  };

  const onChangePage = (page) => {
    setPageState(page);
    setAlertMsg(DEFAULT_ALERT);
  };

  return (
    <Wrapper>
      {alertMsg.data && (
        <AlertMessage>
          <Alert message={alertMsg.data} type={alertMsg.type} banner />
        </AlertMessage>
      )}
      {pageState === 'login' && (
        <FormLogin
          pokemonLogo={pokemonLogo}
          onLoginSubmit={onLoginSubmit}
          onChangePage={onChangePage}
        />
      )}
      {pageState === 'register' && (
        <FormRegister
          pokemonLogo={pokemonLogo}
          onRegisterSubmit={onRegisterSubmit}
          onChangePage={onChangePage}
        />
      )}
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`;

const AlertMessage = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;
