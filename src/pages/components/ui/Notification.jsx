import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

  const Notification = () =>{
    const CustomNotification = () => (
        <div className='container-fluid' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className='row'>
                <div className='col-4'>
                    <img src="promo-image.jpg" alt="Promoción" style={{ width: 'auto', height: 'auto', margin: '10px 0' }} />
                </div>
                <div className='col-8' style={{display: 'block'}}>
                    <p style={{fontSize: '20px'}}>Aprovecha nuestra promo por tiempo limitado!</p>
                    <button className='btn btn-outline-primary btn-sm mt-2'> Ver promo</button>
                </div>            
            </div>
        </div>
    );
    const notify = () => toast(<CustomNotification/>, {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });

    return (
      <div>
        <button className='btn btn-primary' onClick={notify}>Notify !</button>
        <ToastContainer style={{width:'500px'}}/>
      </div>
    );
  }

  export default Notification;