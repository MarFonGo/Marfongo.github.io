import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Popover} from 'react-bootstrap';
import { Link} from "react-router-dom";

const ProductsFavorite= (props) => {
    
    const {products} = props;

    return (
        <div className="row" style={{ display: 'flex', padding: '50px' }}>
            {products && products.map((product) => (
                <OverlayTrigger key={product.id} trigger={['hover', 'focus']} placement="auto" overlay={<Popover id={`popover-${product.id}`}>
                    <Popover.Header as="h3">{product.title}</Popover.Header>
                        <Popover.Body>
                        {product.info}
                        </Popover.Body>
                    </Popover>}>
                    <div className="col-lg-4 col-md-6 col-sm-6 catalogo">
                        <img
                        key={product.id}
                        id={product.id}
                        src={product.images[0].url}
                        alt={product.slug}
                        style={{ width: '100%', height: '50px' }}
                        className="image-catalogo"
                        />
                        <div style={{ position: 'relative', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '5px 10px', fontSize: '12px', width: 'fit-content' }}>
                        Compras: {product.cantidad}
                        </div>
                        <Link to={`/product_details/${product.slug}`} style={{ textDecoration: 'none' }}>
                        <button type="button" style={{ textTransform: 'uppercase' }} className="btn btn-lg btnCenter my-button">VER PRODUCTO</button>
                        </Link>
                    </div>
                </OverlayTrigger>
            ))}
    </div>
        );
}
export default ProductsFavorite;
