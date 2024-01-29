import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const GoogleCallbackHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authorizationCode = urlParams.get('code');
    const reactApi = process.env.REACT_APP_NEST_API;
    
    axios.post(`${reactApi}/auth/google`, { code: authorizationCode })
      .then((response) => {
        if(response.data.token){
          const credentials = {
            token: response.data.token,
            email: response.data.user.email,
            fullName: response.data.user.fullName,
            image: null
          }
          dispatch({ type: 'SET_CREDENTIALS', payload: credentials });
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
