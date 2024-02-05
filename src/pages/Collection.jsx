import { Provider, useSelector} from 'react-redux';
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Subtag from './components/ui/Subtag.jsx';
import Soporte from './components/Soporte.jsx';
import { useState } from 'react';
import $ from 'jquery';
import { handleCloseModalAddress, handleOpenModalAddress, useChatboxEffect } from './functions.jsx';
import { LoadBoostrap } from './loadBootstrap.jsx';
import { store } from '../store.js';
import Address from './components/ui/Addres.jsx';

const Collection  = () => {
    
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

    

    return (

        <div style={{display: 'flex',flexDirection: 'column',minHeight: '100vh'}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} />
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} />  
            </div>}
            <div id="subtag" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <Subtag />
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
            }        </div>
    );
}
 
export default Collection;