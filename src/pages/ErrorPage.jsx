import React from 'react';
import ParticlesComponent from './Particulas';

function ErrorPage(props) {
  
  const {error} = props;
  const {message} = props;

  return (
    <>
    <div className="error-page">
      <div>
        <h1 data-h1={error}>{error}</h1>
        <p data-p={message}>{message}</p>
      </div>
    </div>
    <div className="particles-js">
      <ParticlesComponent />
    </div>
    </>
  );
}

export default ErrorPage;
