import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

const Subtag= () => {

    const [tags, setTag] = useState([]);
    let params = useParams(); 
    const tag = params.tag
    useEffect(() => {
        fetch(`${REACT_APP_NEST_API}/products/tag/${tag}`)
        .then(data => {
            return data.json()
        }).then(data => {
            setTag(data);
            setCurrentImageIndices(data.map(() => 0));
        }).catch(error => {
            console.log(error);
        })
    }, [tag])
    const [currentImageIndices, setCurrentImageIndices] = useState(tags.map(() => 0));
    
    useEffect(() => {
            const intervals = tags.map((tag, index) => {
                return setInterval(() => {
                setCurrentImageIndices((prevIndices) => {
                    const newIndices = [...prevIndices];
                    newIndices[index] = (newIndices[index] + 1) % tag.images.length;
                    return newIndices;
                })
            }, 5000);})
            return () => intervals.forEach(clearInterval);
        
    }, [tags]);
    
    return (
        <div className="row" style={{ display: 'flex', padding: '50px' }}>
             {tags && tags.map((tag,index) => (
                <div key={tag.subtag} className="col-lg-4 col-md-6 col-sm-6 catalogo">
                    <img src= {tag.images[currentImageIndices[index]].url} alt={tag.subtag} style={{ width: '100%', height: '50px' }} className="image-catalogo" />
                    <Link to={`/products/${tag.tag}/${tag.subtag}`} style={{textDecoration: 'none'}}>
                        <button type="button" style = {{textTransform: 'uppercase'}}className="btn btn-lg btnCenter my-button">{tag.subtag}</button>
                    </Link>               
                </div>
                ))}
        </div>
        );
}
export default Subtag;
