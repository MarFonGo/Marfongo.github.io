import React, { useState } from 'react';
import googleIcon from './google.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { handleisSignIn } from '../../functions';


const ModalForm = ({ onClose, setfullName, setEmail, setImage }) => {

  const dispatch =useDispatch();
  const reactApi = process.env.REACT_APP_NEST_API;
  
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [dataSignUp, setDataSignUp] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleInputChangeSignUp = (e) => {
    const { name, value } = e.target;
    setDataSignUp({
      ...dataSignUp,
      [name]: value
    });
  };
  const handleGoogleLogin = () => {
    
    const redirect_url = process.env.REACT_APP_REDIRECT_URL;
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const scopes = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const responseType = 'code';
    const accessType = 'offline';
    const includeGrantedScopes = true;

    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=${responseType}&scope=${scopes}&access_type=${accessType}&include_granted_scopes=${includeGrantedScopes}&redirect_uri=${redirect_url}&prompt=select_account`;
    onClose();
    window.location.href = authorizationUrl;
  };  
  const [showLogin, setShowLogin] = useState(true);
  const handleTabChange = (tab) => {
    if (tab === 'login') {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  };

  const handleLogin = (e) =>{
    e.preventDefault();
    try {
      axios.post(`${reactApi}/auth/login`,data,{
        headers: {
          'Content-Type': 'application/json'
        }}).then(response => {
        if (response.data.token) {
          const credentials = {
            token: response.data.token,
            email: response.data.user.email,
            fullName: response.data.user.fullName,
            image: null
          }
          dispatch({ type: 'SET_CREDENTIALS', payload: credentials });
          handleisSignIn(setEmail, setImage, setfullName, credentials);
          onClose();
        } else {
          alert(response.data.message);
        }
      }).catch(error => {
        if (error.response) {
          alert( `Status Error: ${error.response.status}\nMessage: ${error.response.data.message}` );
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSignUp = (e) =>{
    e.preventDefault();
    try {
      axios.post(`${reactApi}/auth/signup`, dataSignUp, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.token) {
          const credentials = {
            token: response.data.token,
            email: response.data.user.email,
            fullName: response.data.user.fullName,
            image: null
          }
          dispatch({ type: 'SET_CREDENTIALS', payload: credentials });
          handleisSignIn(setEmail, setImage, setfullName, credentials);
          onClose();
        } else {
          alert(response.data.message);
        }
      }).catch(error => {
        if (error.response) {
          alert( `Status Error: ${error.response.status}\nMessage: ${error.response.data.message}` );
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="modal-overlay">
      <div className="modal-login fade-in">
        <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}}></button>
        <div className="tabs">
          <h2 onClick={() => handleTabChange('login')} style={{cursor: 'pointer', margin: '0 120px',fontSize: 'x-large', fontFamily: 'sans-serif'}}>Log In</h2>
          <h2 onClick={() => handleTabChange('register')} style={{cursor: 'pointer', fontSize: 'x-large', fontFamily: 'sans-serif'}}>Register</h2>
        </div>
        {showLogin ? (
          <form>
            <a className="rounded-button google-login-button" onClick={handleGoogleLogin}> 
              <span className="google-icon">
                <img src={googleIcon} alt="google-icon" width={'40px'} height={'40px'}/>
              </span>
              <span style={{fontSize: 'x-large'}}>Sign in with google</span>
            </a>
            <div className="login-form-group">
              <label htmlFor="email" style={{fontSize: 'x-large'}}>Email <span className="required-star">*</span></label>
              <input type="text" placeholder="email@website.com" id="email"  name="email" value={data.email} onChange={handleInputChange}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd" style={{fontSize: 'x-large'}}>Password <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Minimum 6 characters, an uppercase, a lowercase and a number" id="pwd" name="password" value={data.password} onChange={handleInputChange}/>
            </div>
            <a className="rounded-button login-cta" onClick={handleLogin}>Login</a>
          </form>
        ) : (
          <form>
            <div className="login-form-group">
              <label htmlFor="name" style={{fontSize: 'x-large'}}>Name <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Name" id="nameSignUp" name="fullName" value={dataSignUp.fullName} onChange={handleInputChangeSignUp}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="email" style={{fontSize: 'x-large'}}>Email <span className="required-star">*</span></label>
              <input type="text" placeholder="email@website.com" id="emailSignUp" name="email" value={dataSignUp.email} onChange={handleInputChangeSignUp}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd" style={{fontSize: 'x-large'}}>Password <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Minimum 6 characters, an uppercase, a lowercase and a number" id="pwdSignUp" name="password" value={dataSignUp.password} onChange={handleInputChangeSignUp}/>
            </div>
            <a className="rounded-button login-cta" onClick={handleSignUp}>Sign Up</a>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalForm;
