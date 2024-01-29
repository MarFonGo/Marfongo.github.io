import { Provider, useDispatch, useSelector} from 'react-redux';
import Navbar from './components/Navbar'
import ProductDetail from './components/Section';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Soporte from './components/Soporte';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { useChatboxEffect } from './functions';
import { LoadBoostrap } from './loadBootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { store, storeTotal } from '../store';

const ProductDetails  = () => {
    
    LoadBoostrap();
    useChatboxEffect();
    const dispatch = useDispatch();
    let params = useParams(); 
    const reactApi = process.env.REACT_APP_NEST_API;
    const [product, setProduct] = useState(null);
    const credentials = useSelector(state => state.forth);

    useEffect(() => {
        axios.get(`${reactApi}/products/one/${params.product}`)
        .then(response => {
            setProduct(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [params.product])

    dispatch({ type: 'SET_IMAGEN', payload: product });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        var formContainer = $('#form-container');
        setIsModalOpen(false);
        $(formContainer).toggleClass('expand');
        $(formContainer).children().toggleClass('expand');
        $('body').toggleClass('show-form-overlay');
        $('.form-submitted').removeClass('form-submitted');
    };
    const [menuVisible, setMenuVisible] = useState(false);

    const handleOpenMenu = () => {
        setMenuVisible(true);
    };
    const handleCloseMenu = () => {
        setMenuVisible(false);
    };
    
      
    return (
        <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} />
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} />  
            </div>}
            <div id="section" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Provider store={storeTotal} >
                    <ProductDetail />
                </Provider>
            </div>
            <div id="footer" style={{marginTop: 'auto'}}>
                <Footer />
            </div>
            <button className="chatbox-open" style={{zIndex: '5'}}></button>
            <button className="chatbox-close" style={{zIndex: '5'}}></button>
                <Provider store={store}>
                    <Popup credentials={credentials}/>
                </Provider>
                {isModalOpen && (
                    <div id="soporte">
                        <Soporte handleCloseModal={handleCloseModal}/>
                    </div>
                )}        
        </div>
    );
}
 
export default ProductDetails;