import React from 'react';
import { useSelector} from 'react-redux';

export const Precio = () => {
    const item = useSelector(state => state.first);
    const precio = item.price;
        return (
        <div className="price-shipping" id="Precio">
            <div className="price" id="price-preview" quickbeam="price" >
                ${precio}
            </div>
        </div>
        );
};

export const Nombre = () => {
    const item = useSelector(state => state.first);
    const nombre = item.title;
        return (
            <h1 itemProp="name"> 
                {nombre}
            </h1>
        );
};