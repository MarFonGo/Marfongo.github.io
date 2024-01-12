import React from 'react';
import { useSelector, useDispatch} from 'react-redux';

const Lista = () => {
    const items = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClick = (item) => {
      dispatch({ type: 'QUITAR_ELEMENTO', payload: item.id});
    };
    return (
      <ul>
        {items.map((item) => (
          <div key={item.id} className="container-fluid row" style={{padding:'20px'}}>
            <div className='col-8'>
              <li key={item.id}>
                {item.name}
              </li>
              <p style={{fontSize:'16px'}}>cantidad:{item.cantidad}</p>
              <button className='btn btn-danger' onClick={() => handleClick(item)}>Quitar del carrito</button>
            </div>
            <div className='col-4' style={{marginTop: 'auto'}}>
              <img src={item.image} alt={item.name} style={{ maxWidth: '-webkit-fill-available', display:"flex"}} />
            </div>
          </div>
        )) }
      </ul>
    );
};
  
export default Lista;