import React, { useState } from 'react';
import googleIcon from './google.png';
import axios from 'axios';

const ModalForm = ({ onClose, handleisSignIn }) => {
  
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
    axios.post('http://localhost:3001/auth/login',data,{
      headers: {
        'Content-Type': 'application/json'
      }}).then(response =>{
      if(response.data.token){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('fullName', response.data.user.fullName);
        onClose();
        handleisSignIn();
      }
    })
  }
  
  const handleSignUp = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/auth/signUp',dataSignUp,{
      headers: {
        'Content-Type': 'application/json'
      }}).then(response =>{
      if(response.data.token){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('fullName', response.data.user.fullName);
        onClose();
        handleisSignIn();
      }
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-login fade-in" style={{left: '30%'}}>
        <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}}></button>
        <div className="tabs">
          <h2 onClick={() => handleTabChange('login')} style={{cursor: 'pointer', margin: '0 120px',fontSize: '16px', fontFamily: 'sans-serif'}}>Log In</h2>
          <h2 onClick={() => handleTabChange('register')} style={{cursor: 'pointer', fontSize: '16px', fontFamily: 'sans-serif'}}>Register</h2>
        </div>
        {showLogin ? (
          <form>
            <a className="rounded-button google-login-button" onClick={handleGoogleLogin}> 
              <span className="google-icon">
                <img src={googleIcon} alt="google-icon" width={'30px'} height={'30px'}/>
              </span>
              <span >Sign in with google</span>
            </a>
            <div className="login-form-group">
              <label htmlFor="email">Email <span className="required-star">*</span></label>
              <input type="text" placeholder="email@website.com" id="email"  name="email" value={data.email} onChange={handleInputChange}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">Password <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Minimum 8 characters" id="pwd" name="password" value={data.password} onChange={handleInputChange}/>
            </div>
            <a className="rounded-button login-cta" onClick={handleLogin}>Login</a>
          </form>
        ) : (
          <form>
            <div className="login-form-group">
              <label htmlFor="name">Name <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Name" id="pwdsignUp" name="fullName" value={dataSignUp.fullName} onChange={handleInputChangeSignUp}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="email">Email <span className="required-star">*</span></label>
              <input type="text" placeholder="email@website.com" id="emailSignUp" name="email" value={dataSignUp.email} onChange={handleInputChangeSignUp}/>
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">Password <span className="required-star">*</span></label>
              <input autoComplete="off" type="text" placeholder="Minimum 8 characters" id="pwdsignUp" name="password" value={dataSignUp.password} onChange={handleInputChangeSignUp}/>
            </div>
            <a className="rounded-button login-cta" onClick={handleSignUp}>Sign Up</a>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModalForm;
