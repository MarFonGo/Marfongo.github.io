import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () =>{
  const reactApi = process.env.REACT_APP_NEST_API;
  const [image, setImage] = useState('');
  const [info, setInfo] = useState('');
  const [product, setProduct] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${reactApi}/notificaciones`)
      .then( response =>{
          setImage(response.data[0].image);
          setInfo(response.data[0].info);
          setProduct(response.data[0].productSlug);
        }
      )
  }, [])
  
  const handlePromo =() =>{
    navigate(`/product_details/${product}`)
  }
  const CustomNotification = () => (
    <div className='container-fluid' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className='row'>
        <div className='col-4'>
          <img src={image} alt="Promoción" style={{ width: '100px', height: '100px', margin: '10px 0' }} />
        </div>
        <div className='col-8' style={{display: 'block'}}>
          <p style={{fontSize: '20px'}}>{info}</p>
          <button className='btn btn-outline-primary btn-sm mt-2' onClick={handlePromo}> Ver promo</button>
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