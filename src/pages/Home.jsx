import { Provider,useDispatch,useSelector} from 'react-redux';
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import Footer from './components/Footer';
import Popup from './components/Popup';
import Anuncios from './components/ui/Anuncios';
import Popular from './components/ui/Popular';
// import PopularItems from './components/ui/PopularItems';
import { useEffect, useState } from 'react';
import Soporte from './components/Soporte';
import { connectToServer, handleCloseModalAddress, handleOpenModalAddress, useChatboxEffect} from './functions';
import { LoadBoostrap } from './loadBootstrap';
import { store } from '../store';
import Address from './components/ui/Addres';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNotification from './components/ui/Notification';

const Home  = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const credentials = useSelector(state => state.forth);
    const address = useSelector(state => state.fifth);
    const [isModalAddressOpen, setShowModalAddress] = useState(false);
    const [email, setEmail] = useState(null);
    const [resultadoFetch, setResultadoFetch] = useState(null);
    const [sendNotify, setSendNotify] = useState(false)

    let token;
    if (credentials){
        token = credentials.token;
      }
      else{
        token = '';
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if(isConnected === false){
            connectToServer(token, dispatch, setSendNotify);
        }
    }, [])
    const notifications = useSelector(state => state.sixth);
    const isConnected = useSelector(state => state.seventh);
    const notify = () => {
        let i = 0
        let indexes = [];
        if (notifications){
            for(i=0; i<notifications.length; i++){
                indexes.push(i)
            }
            indexes.map( (index) =>{
            setTimeout(() => {
              toast(<CustomNotification index={index} notifications={notifications}/>, {
                position: "top-right",
                autoClose: 30000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
            }, (index + 1) * 1000);
          })
        } 
    }
    useEffect(() => {
        if (notifications && sendNotify === true){
            notify();
            setSendNotify(false)
        }     
    }, [sendNotify])
    
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
    return (
        < div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <div id="navBar">
                <Navbar handleOpenModal={handleOpenModal} handleOpenMenu={handleOpenMenu} />
            </div>
            {menuVisible && <div id="menu">
                <Menu handleOpenModal={handleOpenModal} handleCloseMenu={handleCloseMenu} />  
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
        <ToastContainer style={{width:'600px'}}/>
            
        </ div>
    );
}
 
export default Home;