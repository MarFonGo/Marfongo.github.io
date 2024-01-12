import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Cantidad = () => {
    const [cant, setCantidad] = useState(0);
    const dispatch = useDispatch();
    const handleClick = () => {
        setCantidad(cant + 1);
        dispatch({ type: 'SET_CANTIDAD', payload: cant + 1});
    };
    const handleClick1 = () => {
        if (cant > 0) {
            setCantidad(cant - 1);
            dispatch({ type: 'SET_CANTIDAD', payload: cant - 1});
          }
    };
    return (
        <div className="spinner" style={{background: "white", display: 'flex', alignItems: 'center', padding: '0 20px'}}>
            <span className="btn minus" data-id="2721888517" style={{background: "white"}} onClick={() => handleClick1()}></span>
                <input type="text" id="updates_2721888517" name="quantity" value={cant} className="quantity-selector" readOnly/>
                <span className="q">Cant</span>
            <span className="btn plus" data-id="2721888517" style={{background: "white"}} onClick={() => handleClick()}></span>
        </ div>
    );
  };

export default Cantidad;