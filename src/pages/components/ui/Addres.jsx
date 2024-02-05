import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSale } from '../../functions';

const Address = ({onClose, email, credentials, setResultadoFetch}) => {

    const inputRef = useRef(null);
    const selectCityRef = useRef(null);
    const selectStateRef = useRef(null);
    const dispatch = useDispatch();
    const productos = useSelector(state => state);
    let product;
    let producto;
    let products = [];
    let venta;
    let cantidad = [];
    for (producto of productos){
        product ={
            slug: producto.name,
            id: producto.id,
        }
        cantidad.push(producto.cantidad);
        products.push(product);
    }
    venta = {
        cantidad,
        products,
        emailInfo: email
    }

    const handleClick = () => {
        const label = document.querySelector('#address');
        const labelCity = document.querySelector('#city');
        const labelState = document.querySelector('#state');
        const formAddress = document.querySelector('#formAddress');

        if (inputRef.current.value === '') {
        label.classList.add('shake'); 
        setTimeout(() => {
           label.classList.remove('shake');
        }, 500);
        }

        if (selectCityRef.current.value === '') {
        labelCity.classList.add('shake'); 
        setTimeout(() => {
            labelCity.classList.remove('shake');
        }, 500);
        }

        if (selectStateRef.current.value === '') {
            labelState.classList.add('shake'); 
            setTimeout(() => {
                labelState.classList.remove('shake');
            }, 500);
        }
        if(selectCityRef.current.value !== '' && selectStateRef.current.value !== '' && inputRef.current.value !== '' ){
            const address = {
                direccion: inputRef.current.value,
                state: selectStateRef.current.value,
                city: selectCityRef.current.value
            }
            dispatch({ type: 'SET_ADDRESS', payload: address });
            createSale(credentials, address, productos, venta, setResultadoFetch, product, products, dispatch)
            formAddress.classList.add('continue');
            setTimeout(() => {
                onClose();
            }, 500); 
        }
    };
    return(
        <div className="modal-overlay">
            <div className="modal-address fade-in" id='formAddress'>
                <div className='container-fluid' style={{display: 'flex'}}>
                    <h1>Compra</h1>
                    <button onClick={onClose} type="button" className="btn-close" aria-label="Close" style={{background: "white var(--bs-btn-close-bg) center/1em auto no-repeat"}}></button>
                </div>
                <p style={{fontSize: '20px'}}>Por favor ingrese los detalles pedidos a continuacion</p>
                <hr />
                <div className="form">
                    <div className="fields fields--2">
                    </div>
                    <label className="field" id="address">
                        <span className="field__label" htmlFor="address">Direccion</span>
                        <input ref={inputRef} className="field__input" type="text"  />
                    </label>
                    <div className="fields fields--3">
                    <label className="field" id="city">
                        <span className="field__label" htmlFor="city">Provincia</span>
                        <select ref={selectCityRef} className="field__input" >
                        <option value=""style={{color: 'black', background:'blue'}}></option>
                        <option value="La Habana" style={{color: 'black', background:'white'}}>La Habana</option>
                        <option value="Matanzas" style={{color: 'black', background:'white'}}>Matanzas</option>
                        </select>
                    </label>
                    <label className="field" id="state">
                        <span className="field__label" htmlFor="state">Municipio</span>
                        <select ref={selectStateRef} className="field__input" >
                        <option value="" style={{color: 'black', background:'blue'}}></option>
                        <option value="Playa" style={{color: 'black', background:'white'}}>Playa</option>
                        <option value="cardenas" style={{color: 'black', background:'white'}}>Cardenas</option>
                        </select>
                    </label>
                    </div>
                </div>
                <hr />
                <button className="btn btn-dark" onClick={handleClick}>Continue</button>
            </ div>
        </div>
    )   

}

export default Address;
