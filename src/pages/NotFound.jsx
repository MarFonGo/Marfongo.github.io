import React from 'react';
import ParticlesComponent from './Particulas';

function ErrorPage() {
    
  return (
    <>
    <div className="error-page">
      <div>
        <h1 data-h1="404">404</h1>
        <p data-p="NOT FOUND">NOT FOUND</p>
      </div>
    </div>
    <div className="particles-js">
      <ParticlesComponent />
    </div>
    </>
  );
}

export default ErrorPage;
