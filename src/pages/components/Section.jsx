import React, { useMemo } from 'react';
import Imagenes from './ui/Imagenes';
import Boton from './ui/Boton';
import { Precio, Nombre } from './ui/Precio';
import Cantidad from './ui/Cantidad';
import Info from './ui/Info';
import Productos from './ui/Productos';
import { Provider} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store } from '../../store';

const ProductDetail =(props)=> {
  const {product} = props;
  const navigate = useNavigate();
  const getOtrosProductos =()=>{
    navigate(`/products/${product.tag}/${product.subtag}`);
  }

  const memoizedProducts = useMemo(() => {
    return <Productos product={product}/>
  },[product])

  const memoizedImages = useMemo(() => {
    return <Imagenes product={product}/>
  },[product])
  return (
    <>
    <section aria-label="Main content" role="main" className="product-detail">
      <div itemScope itemType="http://schema.org/Product">
        <meta itemProp="url" />
        <meta itemProp="image" />
        <div className="shadow">
          <div className="_cont detail-top">
            <div className="cols">
              <div className="left-col" style={{ justifyContent: 'center' }}>
                {memoizedImages}
              </div>
              <div className="right-col">
                <Nombre />
                <div itemScope itemType="http://schema.org/Offer" itemProp="offers">
                  <meta itemProp="priceCurrency" content="USD" />
                  <link itemProp="availability" href="http://schema.org/InStock" />
                  <Precio />
                  <form id="AddToCartForm">
                    <div className="btn-and-quantity-wrap">
                      <div className="btn-and-quantity" >
                        <Cantidad />
                          <React.StrictMode>
                            <Provider store={store}>
                              <Boton />
                            </Provider>
                          </React.StrictMode>
                      </div>
                    </div>
                  </form>
                  <div className="tabs">
                    <div className="tab-labels" style={{ width: 'fit-content' }}>
                      <span data-id="1" className="active">Info</span>
                    </div>
                    <Info />
                  </div>
                  <div className="social-sharing-btn-wrapper">
                    <span id="social_sharing_btn">Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="related">
          <div className="_cont">
            <h2>Podría interesarle</h2>
              {memoizedProducts}
            <div className="more-products" id="more-products-wrap">
              <span id="more-products" data-rows_per_page="1" onClick={getOtrosProductos}>Otros productos</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
    </>
  );
}

export default ProductDetail;
