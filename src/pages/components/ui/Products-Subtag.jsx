import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsSubtag= (props) => {

    const [products, setProduct] = useState([]);
    let params = useParams(); 
    const subtag = params.subtag;
    const {hidepopOver} = props;
    const {setShowPopOver} = props;
    const reactApi = process.env.REACT_APP_NEST_API;

    useEffect(() => {
        fetch(`${reactApi}/products/bytag/${subtag}`)
        .then(data => {
            return data.json()
        }).then(data => {
            setProduct(data);
            setCurrentImageIndices(data.map(() => 0));
            setShowPopOver(true);
        }).catch(error => {
            console.log(error);
        })
    }, [subtag])
    const [currentImageIndices, setCurrentImageIndices] = useState(products.map(() => 0));
    
    useEffect(() => {
        const intervals = products.map((product, index) => {
            return setInterval(() => {
            setCurrentImageIndices((prevIndices) => {
                const newIndices = [...prevIndices];
                newIndices[index] = (newIndices[index] + 1) % product.images.length;
                return newIndices;
            })
        }, 5000);})
        return () => intervals.forEach(clearInterval);
    }, [products]);
    

    return (
        <div className="row" style={{ display: 'flex', padding: '50px' }}>
             {products && products.map((product,index) => (
                <div key={product.id} id={product.slug} className="col-lg-4 col-md-6 col-sm-6 catalogo" onClick={hidepopOver}>
                    <img id={product.id} src= {product.images[currentImageIndices[index]].url} alt={product.slug} style={{ width: '100%', height:'50px'}} className="image-catalogo" 
                    data-bs-toggle="popover" title={product.title} data-bs-content={product.info} data-bs-original-title= {product.title}/>
                    <Link to={`/product_details/${product.slug}`} style={{textDecoration: 'none'}}>
                        <button type="button" style = {{textTransform: 'uppercase'}}className="btn btn-lg btnCenter my-button" >VER PRODUCTO</button>
                    </Link>
                </div>
                ))}
        </div>
        );
}
export default ProductsSubtag;
