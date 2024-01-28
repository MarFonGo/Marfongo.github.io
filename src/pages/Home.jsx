import { Provider} from 'react-redux';
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Anuncios from './components/ui/Anuncios';
import Popular from './components/ui/Popular';
// import PopularItems from './components/ui/PopularItems';
import { useState } from 'react';
import Soporte from './components/Soporte';
import $ from 'jquery';
import { useChatboxEffect } from './functions';
import { LoadBoostrap } from './loadBootstrap';
import { store } from '../store';

const Home  = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const [menuVisible, setMenuVisible] = useState(false);

    const handleOpenMenu = () => {
        setMenuVisible(true);
    };
    const handleCloseMenu = () => {
        setMenuVisible(false);
    };
    const handleOpenCarousel = () =>{
        return true;
    }
    LoadBoostrap();
    useChatboxEffect();
    const handleisSignIn = () =>{
        setEmail(localStorage.getItem('email'));
        setImage(localStorage.getItem('image'));
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
        < div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} handleisSignIn={handleisSignIn} email={email} image={image} fullName={fullName} logOut={logOut}/>  
            </div>}
            <div className="container-fluid" style={{padding: "0"}}>
                <img src="images/anuncio.png " alt="anuncios" className="img" style={{ width: "100%", paddingLeft: "0", paddingRight: "0", margin: "0"}}></img>
            </div>
            <div id="anuncios" >
                <Anuncios />
            </div>
            <div id="populares" >
                <Popular handleOpenCarousel={handleOpenCarousel}/>
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
        </ div>
    );
}
 
export default Home;