import { Provider, useDispatch} from 'react-redux';
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
    const [product, setProduct] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [fullName, setfullName] = useState(localStorage.getItem('fullName'));
    const [image, setImage] = useState(localStorage.getItem('image'));

    useEffect(() => {
        axios.get(`${REACT_APP_NEST_API}/products/one/${params.product}`)
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
    const handleOpenMenu = () =>{
        $("#buttonmenu").click(function() {
            $("#menu").show();
        });   
    }
    const handleisSignIn = () =>{
        setEmail(localStorage.getItem('email'));
        setImage(localStorage.getItem('iamge'));
        setfullName(localStorage.getItem('fullName'));
    }
    const logOut = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('fullName');  
        localStorage.removeItem('image');  
        setEmail(localStorage.getItem('email')); 
        setImage(localStorage.getItem('image')); 
        setfullName(localStorage.getItem('fullName'));
    }
      
    return (
        <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>
            </div>
            <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>  
            </div>
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
                    <Popup />
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