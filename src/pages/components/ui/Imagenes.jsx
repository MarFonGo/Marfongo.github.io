import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';


const Imagenes = (props) => {

  const dispatch = useDispatch();
  const {product} = props;
  const [related, setRelated] = useState(null);
  const navigate = useNavigate();
  const reactApi = process.env.REACT_APP_NEST_API;

  useEffect(() => {
    fetch(`${reactApi}/products/bytag/${product.subtag}?limit=4`)
    .then(data => {
        return data.json()
    }).then(data => {
        setRelated(data)
    }).catch(error => {
        console.log(error);
    })
  }, [product])

  const handleClick = (producto) => {
    dispatch({ type: 'SET_IMAGEN', payload: producto });
    navigate(`/product_details/${producto.slug}`);
  };

  return (
    <div>
      <div className="big">
        <span id="big-image" className="img" style={{backgroundImage: `url(${product.images[0].url})`}}></span>
        <div style={{ position: 'relative', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '5px 10px', fontSize: '12px', width: 'fit-content' }}>
          En venta: {product.stock}
        </div>
        <div id="banner-gallery" className="swipe">
        {related && related.map((product) => (
          <div key={product.id} className="swipe-wrap container-fluid" style={{width: "100vw"}}>
            <div style={{backgroundImage: `url(${product.images[0].url})`}}></div>
          </div>
        ))}
        </div>
        <div className="detail-socials">
          <div className="social-sharing">
          <a target="_blank" title="share">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" style={{fontSize: "20px", color: 'blue'}} />
          </a>
          <a target="_blank" title="share">
              <FontAwesomeIcon icon={faInstagram} className="social-icon instagram-icon" style={{fontSize: "20px"}} />
          </a>
          <a target="_blank" title="share" >
              <FontAwesomeIcon icon={faWhatsapp} className="social-icon" style={{fontSize: "20px", color: 'green'}} />
          </a>
          </div>
        </div>
      </div>
      <div className="thumbs container-fluid" style={{ margin: 'auto', padding: '0'}}>
        {related && related.map( (producto) => ( producto.title !== product.title &&
          <a key={producto.id} className="thumb-image" onClick={() => handleClick(producto)}>
            <span><img src={producto.images[0].url} alt={producto.title} /></span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Imagenes;
