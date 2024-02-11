import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const CustomNotification = ({index}) => {
  const notifications = useSelector(state => state.sixth);
  const navigate = useNavigate();
  
  const handlePromo =(product) =>{
    navigate(`/product_details/${product}`)
  }
  return(
    <>
      <div className='container-fluid' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className='row'>
          <div className='col-4'>
            <img src={notifications[index].image} alt="Promoción" style={{ width: '100px', height: '100px', margin: '10px 0' }} />
          </div>
          <div className='col-8' style={{display: 'block'}}>
            <p style={{fontSize: '20px'}}>{notifications[index].info}</p>
            <button className='btn btn-outline-primary btn-sm mt-2' onClick={()=>{handlePromo(notifications[index].productSlug)}}> Ver promo</button>
          </div>            
        </div>
      </div>
    </> 
  )
  
};


export default CustomNotification;