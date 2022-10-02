import { useState } from 'react';
import jwt_decode from 'jwt-decode';

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const userToken = JSON.parse(tokenString);
    const userData = JSON.parse(userString);

    if (userToken) {
      let decoded = jwt_decode(userToken);
      let current = Math.floor(new Date().getTime() / 1000);
      console.log(decoded.exp - current);
      if (decoded.exp - current <= 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return '';
      }
    }
    return { userToken, userData };
  };

  const [token, setToken] = useState(getToken().userToken);
  const [user, setUser] = useState(getToken().userData);

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const saveUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser({});
  };

  return {
    setToken: saveToken,
    setUser: saveUser,
    token,
    user,
    clearToken
  };
}

export { useToken };
