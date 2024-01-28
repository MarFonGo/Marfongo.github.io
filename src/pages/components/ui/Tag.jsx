import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tag= (props) => {

    const [tags, setTag] = useState([]);
    const {hidepopOver} = props;
    const {setShowPopOver} = props;
    const reactApi = process.env.REACT_APP_NEST_API;

    useEffect(() => {
        fetch(`${reactApi}/products/tag`)
        .then(data => {
            return data.json()
        }).then(data => {
            setTag(data);
            setCurrentImageIndices(data.map(() => 0));
            setShowPopOver(true)
        }).catch(error => {
            console.log(error);
        })
    }, [])
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
                <div key={tag.tag} id={tag.tag} className="col-lg-4 col-md-6 col-sm-6 catalogo image-slider">
                    <div id={tag.id}  style={{ width: '100%', height:'50px', backgroundImage: `url(${tag.images[currentImageIndices[index]]})`, backgroundSize: 'cover', backgroundPosition: 'center', 
                    transition: 'all 1s ease-out 0s'}} className="image-catalogo" data-bs-toggle="popover" title={tag.tag} data-bs-content={tag.subtag} onClick={hidepopOver}/>
                    <Link to={`/products/${tag.tag}`} style={{textDecoration: 'none'}}>
                        <button type="button" style = {{textTransform: 'uppercase'}}className="btn btn-lg btnCenter my-button">{tag.tag}</button>
                    </ Link>
                </div>
                ))}
        </div>
        );
}
export default Tag;
