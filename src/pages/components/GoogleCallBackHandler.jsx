import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GoogleCallbackHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            image: response.data.user.image
          }
          dispatch({ type: 'SET_CREDENTIALS', payload: credentials });
          navigate('/');
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
