import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePage, handleSearchChange, useSearchProducts, useSearchTags } from '../../functions';

const Search =()=>{

    const location = useLocation();
    const pathname = location.pathname;
    const levelsToGoBack = (pathname.match(/\//g) || []).length - 1;
    const relativePath = Array(levelsToGoBack).fill('..').join('/');
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [options, setOptions] = useState(null);
    
    const products = useSearchProducts(navigate);
    const tags = useSearchTags(navigate);
    useEffect(() => {
        handleSearchChange(tags, products, setOptions);
    }, [tags,products])
    function handleSearchClick() {
        setIsSearchOpen(true);
    }
    const handleSelectChange = (selectedOption) => {
        changePage(selectedOption, products, tags, navigate, dispatch);
    };
    
    return(
        <div className="container-fluid" style={{ margin: '0 0 0 auto', display: 'flex', justifyContent: 'end', maxWidth: '300px', cursor: 'pointer'}}>
            <form className={`search-box ${isSearchOpen ? 'search-box-open' : ''}`} style={{ display: 'flex' }}>
                {options && isSearchOpen && <Select isClearable={true} options={options} className={`form-control me-2 ${isSearchOpen ? 'search-input-open' : ''}`} 
                id="campo-texto" placeholder="" style={{ margin: '0 0 0 auto', display: isSearchOpen ? 'block' : 'none', minWidth: '200px' }} onChange={handleSelectChange}/>}
                <img src={`${relativePath}/images/search.png`} id="lupa" alt="lupa" onClick={handleSearchClick} style={{ borderRadius: '50%' }} />
            </form>
        </ div>  
    )    
}
export default Search;
