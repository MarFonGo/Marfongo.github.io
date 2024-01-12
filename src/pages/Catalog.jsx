import { Provider} from 'react-redux';
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Tag from './components/ui/Tag.jsx';
import { useEffect, useRef, useState } from 'react';
import { Popover } from 'bootstrap';
import Soporte from './components/Soporte.jsx';
import $ from 'jquery';
import { useChatboxEffect } from './functions.jsx';
import { LoadBoostrap } from './loadBootstrap.jsx';
import { store } from '../store.js';

const Catalog  = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const[showPopOver, setShowPopOver] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [fullName, setfullName] = useState(localStorage.getItem('fullName'));
    const [image, setImage] = useState(localStorage.getItem('image'));
    
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
    const popoverTriggerListRef = useRef(null);
    useEffect(() => {
        const popoverTriggerList = popoverTriggerListRef.current.querySelectorAll('[data-bs-toggle="popover"]');
        
        if(popoverTriggerList.length === 0){
            setShowPopOver(showPopOver => !showPopOver)
        }
        
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
            <div id="tag" ref={popoverTriggerListRef} style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Tag hidepopOver={hidepopOver}/>
            </div>
            <div id="footer" style={{marginTop: 'auto'}} >
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
 
export default Catalog;