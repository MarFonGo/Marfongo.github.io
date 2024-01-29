import React, { useEffect, useState } from 'react';
import '../../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './ui/Search';
import ModalForm from './ui/ModalForm';
import { Link, useLocation } from 'react-router-dom';
import { storeTotal } from '../../store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useSearchTags } from '../functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props)=> {  

  const [isSignin, setSignin] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState("none");

  const location = useLocation();
  const pathname = location.pathname;
  const levelsToGoBack = (pathname.match(/\//g) || []).length - 1;
  const relativePath = Array(levelsToGoBack).fill('..').join('/');
  const { handleOpenMenu } = props;
  const { handleOpenModal } = props;
  const credentials = useSelector(state => state.forth)
  const [email, setEmail] = useState('');
  const [fullName, setfullName] = useState('');
  const [image, setImage] = useState('');
  const tags = useSearchTags();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(credentials){
      setEmail(credentials.email);
      setfullName(credentials.fullName);
      setImage(credentials.image);
      setSignin(true);
    }
    else{
      setSignin(false);
    }
  },[credentials])
  
  const dispatch = useDispatch();
  const LogOut = () =>{
    dispatch({type: 'SET_CREDENTIALS', payload: null})  
    setEmail(null); 
    setImage(null); 
    setfullName(null);
  }

  function handleOpenDropDown() {
    if(isDropOpen === "none")
      setIsDropOpen("block");
    if(isDropOpen === "block")
      setIsDropOpen("none");
  }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  
  return (

    <nav className="navbar navbar-expand-xl navbar-dark bg-light" id='nav' style={{ margin: 0, display: 'flex', justifyContent: 'center', padding: 0 }}>
      <div className="container-fluid " style={{ padding: '10px 0px', margin: '0px', backgroundColor: '#343a40', height:'150px' }}>
        <div className="navbar-brand" style={{ padding: '0 30px' }}>
          <img src={`${relativePath}/images/logo3.png`} alt='logo' style={{ borderRadius: '50%', cursor: 'default' }} id="logo" />
        </div>
        <button className="navbar-toggler" style={{ verticalAlign: 'right' }} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation" id="buttonmenu" onClick={handleOpenMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto" style={{ margin: '0px' }}>
            <li className="nav-item nav-padding">
              <Link to="/" style={{textDecoration: 'none'}}>
                <img src={`${relativePath}/images/house.png`} alt="inicio" className="img-navbar" />
                <div className="nav-link text-sm">Inicio</div>
              </Link>
            </li>
            <li className="nav-item nav-padding">
              <img src={`${relativePath}/images/gift.png`} alt="novedades" className="img-navbar" />
              <div className="nav-link text-sm" style={{cursor: 'pointer'}}>Novedades</div>
            </li>
            <li className="nav-item nav-padding">
              <Link to="/favoritos" style={{textDecoration: 'none'}}>
                <img src={`${relativePath}/images/love.png`} alt="favoritos" className="img-navbar" />
                <div className="nav-link text-sm" style={{cursor: 'pointer'}}>Favoritos</div>
              </ Link>
            </li>
            <li className="nav-item nav-padding">
              <img src={`${relativePath}/images/phone.png`} alt="soporte" className="img-navbar" onClick={handleOpenModal} />
              <div className="nav-link text-sm" style={{cursor: 'pointer'}}>Soporte</div>
            </li>
            <li className="nav-item nav-padding">
              <Link to="/catalog">
                <img src={`${relativePath}/images/shopping.png`} alt="catalogo" className="img-navbar" />
              </Link>
              <div className="dropdown">
                  <div className="nav-link dropdown-toggle text-sm" role="button"  aria-expanded="false" onClick={handleOpenDropDown}>
                    Catálogo
                  </div>
                <ul className="dropdown-menu dropdown-menu-static show" style={{position: 'absolute', display: `${isDropOpen}`, maxHeight: '200px', overflowY: 'auto'}}>
                  {tags && tags.map((tag) =>{
                    return(
                      <li key={tag.tag}>
                        <Link to={`/products/${tag.tag}`} style={{textDecoration: 'none'}}>                      
                          <div className="dropdown-item">{tag.tag}</div>
                        </Link>
                      </li>);                   
                  })}  
                </ul>
              </div>
            </li>
          </ul>
          <Provider store={storeTotal}>
            <Search />
          </Provider>
            <div className="login-signup" style={{marginRight: '10px'}}>
              {!isSignin && <a className="cd-signin" onClick={handleModalToggle} style={{width: 'max-content', display: 'flex', textDecoration: 'none'}}>SIGN IN</a>}
              {isSignin &&
                <div style={{margin: '0 20px'}} title={`usuario: ${fullName}\nemail: ${email}`}> 
                  <div className='container' style={{ width: "fit-content", height: 'fit-content', position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={image ? image : `${relativePath}/images/perfil.png`} alt="Foto de perfil" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                  </div>
                  <button className="btn btn-outline-warning" style={{padding: '0 10px', margin: '10px 0 0 0'}} onClick={LogOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                  </button>
                </div>
              }
                
              {showModal && <ModalForm onClose={handleModalToggle} setEmail={setEmail} setImage={setImage} setfullName={setfullName}/>}
            </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;