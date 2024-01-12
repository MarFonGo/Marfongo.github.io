import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";
import Soporte from "./components/Soporte";
import { store } from "../store";
import { LoadBoostrap } from "./loadBootstrap";
import { useChatboxEffect } from "./functions";
import $ from 'jquery';
import { useEffect, useState } from "react";
import ProductsFavorite from "./components/ui/ProductsFavorite";
import { Popover } from "bootstrap";
import axios from "axios";

const Favoritos = () =>{

    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [fullName, setfullName] = useState(localStorage.getItem('fullName'));
    const [image, setImage] = useState(localStorage.getItem('image'));
    const [products, setProduct] = useState([]);

    useEffect(() => {
        axios.get(`${REACT_APP_NEST_API}/ventas/byterm/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then(response =>{
          const ventas = response.data;
          let venta;
          let product;
          let productos = [];
          for(venta of ventas){
              const products = venta.products;
              for (product of products) {
                delete product.importe_producto;
                const index = productos.findIndex(producto => producto.id === product.id)
                if( index === -1){
                productos.push(product);
                }
                else{
                productos[index].cantidad += product.cantidad;
                }
              }
          }
          productos.sort((a, b) => b.cantidad - a.cantidad);
          setProduct(productos);
        }).catch(error =>{
          console.log(error);
        })
      }, [token])
      
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
    LoadBoostrap();
    useChatboxEffect();
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
    
    return(
    <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
        <div id="navBar">
            <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>
        </div>
        <div id="menu">
            <Menu handleOpenModal={handleOpenModal} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>  
        </div>
        <div id="tag" style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <ProductsFavorite products={products}/>
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
    )
}

export default Favoritos;