import { Provider, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";
import Soporte from "./components/Soporte";
import { store } from "../store";
import { LoadBoostrap } from "./loadBootstrap";
import { handleCloseModalAddress, handleOpenModalAddress, useChatboxEffect } from "./functions";
import $ from 'jquery';
import { useEffect, useState } from "react";
import ProductsFavorite from "./components/ui/ProductsFavorite";
import axios from "axios";
import Address from "./components/ui/Addres";

const Favoritos = () =>{

    const reactApi = process.env.REACT_APP_NEST_API;
    const [products, setProduct] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const credentials = useSelector(state => state.forth);
    const address = useSelector(state => state.fifth);
    const [isModalAddressOpen, setShowModalAddress] = useState(false);
    const [email, setEmail] = useState(null);
    const [resultadoFetch, setResultadoFetch] = useState(null);


    useEffect(() => {
        if (credentials !== null) {
            const email = credentials.email;
            const token = credentials.token;
            axios.get(`${reactApi}/ventas/byterm/${email}`, {
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
        }
      }, [credentials])
      
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
    LoadBoostrap();
    useChatboxEffect();
    
    return(
    <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
        <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} />
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} />  
            </div>}
        <div id="tag" style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <ProductsFavorite products={products}/>
        </div>
        <div id="footer" style={{marginTop: 'auto'}}>
            <Footer />
        </div>
        <button className="chatbox-open" style={{zIndex: '5'}}></button>
        <button className="chatbox-close" style={{zIndex: '5'}}></button>
            <Provider store={store}>
                <Popup credentials={credentials} setEmail={setEmail} email={email} handleOpenModalAddress={() => {handleOpenModalAddress(setShowModalAddress)}} resultadoFetch={resultadoFetch}/>
            </Provider>
            {isModalOpen && (
                <div id="soporte">
                    <Soporte handleCloseModal={handleCloseModal}/>
                </div>
            )}
        {isModalAddressOpen && 
            <Provider store={store}>
                <Address onClose={() => {handleCloseModalAddress(setShowModalAddress)}} email={email} credentials={credentials} setResultadoFetch={setResultadoFetch}/>
            </Provider>
            }    
    </div>
    )
}

export default Favoritos;