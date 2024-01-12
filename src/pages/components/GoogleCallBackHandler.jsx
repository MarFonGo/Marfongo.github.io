import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleCallbackHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authorizationCode = urlParams.get('code');
    
    axios.post(`${REACT_APP_NEST_API}/auth/google`, { code: authorizationCode })
      .then((response) => {
        if(response.data.token){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('fullName', response.data.user.fullName);
          localStorage.setItem('image', response.data.image);
          window.location.href = '/';
        }
      })
      .catch((error) => {
      });
  }, [location.search]);

  return (
    <div>
      <p>Cargando...</p>
    </div>
  );
};

export default GoogleCallbackHandler;
