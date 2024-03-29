import { Provider, useSelector} from 'react-redux';
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Tag from './components/ui/Tag.jsx';
import { useEffect, useRef, useState } from 'react';
import { Popover } from 'bootstrap';
import Soporte from './components/Soporte.jsx';
import $ from 'jquery';
import { handleCloseModalAddress, handleOpenModalAddress, useChatboxEffect } from './functions.jsx';
import { LoadBoostrap } from './loadBootstrap.jsx';
import { store } from '../store.js';
import Address from './components/ui/Addres.jsx';

const Catalog  = () => {

    const[showPopOver, setShowPopOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const credentials = useSelector(state => state.forth);
    const address = useSelector(state => state.fifth);
    const [isModalAddressOpen, setShowModalAddress] = useState(false);
    const [email, setEmail] = useState(null);
    const [resultadoFetch, setResultadoFetch] = useState(null);
    
    
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
    const popoverTriggerListRef = useRef(null);
    useEffect(() => {
        const popoverTriggerList = popoverTriggerListRef.current.querySelectorAll('[data-bs-toggle="popover"]');
        
        Array.from(popoverTriggerList).forEach((popoverTrigger) => {
            new Popover(popoverTrigger);

    });
    }, [showPopOver]);

    const hidepopOver = () =>{
        let popover;
        
        setTimeout(() => {
            popover = document.querySelector('body .popover');
        }, 1000);
        setTimeout(() => {
            if(popover)
            popover.remove();
        }, 3000);
    }
    
    return (
        <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} />
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} />  
            </div>}
            <div id="tag" ref={popoverTriggerListRef} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Tag hidepopOver={hidepopOver} setShowPopOver={setShowPopOver}/>
            </div>
            <div id="footer" style={{marginTop: 'auto'}} >
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
            }        </div>
    );
}
 
export default Catalog;