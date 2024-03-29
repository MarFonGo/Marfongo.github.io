import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Productos = (props) => {

    const {product} = props;
    const [suggest, setSuggest] = useState(null);
    const navigate = useNavigate();
    const reactApi = process.env.REACT_APP_NEST_API;

    useEffect(() => {
        fetch(`${reactApi}/products/suggest/${product.slug}?limit=4`)
        .then(data => {
            return data.json()
        }).then(data => {
            setSuggest(data)
        }).catch(error => {
            console.log(error);
        })
    }, [product])
    
    const dispatch = useDispatch();
    const handleClick = (item) => {
        dispatch({ type: 'SET_IMAGEN', payload: item });
        navigate(`/product_details/${item.slug}`);
    };
    
    return(
        <div className="_cont">
            {suggest && <div className="collection-list cols-4" id="collection-list" data-products-per-page="4">
            {suggest.map((item) => (
                <a key={item.id} className="product-box" onClick={() => handleClick(item)}>
                    <span className="img">
                        <span style={{backgroundImage: `url(${item.images[0].url})`}} className="i first"></span>
                        <span className="i second" ></span>
                    </span>
                    <span className="text">
                        <strong>{item.title}</strong>
                        <span>
                            Precio ${item.price}
                        </span>
                        <div className="variants">
                        </div>
                    </span>
                </a>
                ))}
            </div>}    
        </div>      
    );
};

export default Productos;