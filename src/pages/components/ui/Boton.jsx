import React from 'react';
import { useDispatch } from 'react-redux';

const Boton = () => {
  const dispatch = useDispatch();

  const agregarElemento = () => {
    dispatch({ type: 'AGREGAR_ELEMENTO' });
  };

  return (
    <div id="AddToCart" quickbeam="add-to-cart" style={{cursor: 'pointer'}} onClick={agregarElemento}>
      <span>Agregar elemento</span> 
    </div>
  );
  };

export default Boton;