import React, { useEffect, useState } from 'react';
import ModalForm from './ui/ModalForm';
import $ from 'jquery';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storeTotal } from '../../store';
import { Provider, useDispatch } from 'react-redux';
import Select from 'react-select';
import { changePage, handleSearchChange, useSearchProducts, useSearchTags } from '../functions';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menu = (props) => {

  const { handleOpenModal } = props;
  const {handleisSignIn} =props;
  const location = useLocation();
  const pathname = location.pathname;
  const levelsToGoBack = (pathname.match(/\//g) || []).length - 1;
  const relativePath = Array(levelsToGoBack).fill('..').join('/');
  const [isDrop, setIsDropOpen] = useState("none");
  const dispatch =useDispatch();
  const navigate = useNavigate(); 
  const [options, setOptions] = useState(null);
  const {email} = props;
  const {image} = props;
  const {fullName} = props;
  const {logOut} = props;
  const [showModal, setShowModal] = useState(false);

  const products = useSearchProducts();
  const tags = useSearchTags();
  useEffect(() => {
    handleSearchChange(tags, products, setOptions);
  }, [tags,products])
  
    
  const handleSelectChange = (selectedOption) => {
    changePage(selectedOption, products, tags, navigate, dispatch);
  };

  function handleOpenDropDown() {
    if(isDrop === "none")
      setIsDropOpen("block");
    if(isDrop === "block")
      setIsDropOpen("none");
  }

  function handleLogOut(){
    logOut();   
  }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const {handleCloseMenu} = props;

  return (
    <div tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="menu-title" className="Dialog__DialogBase-sc-13rdxb7-0 caScwl" style={{ maxWidth: 'fit-content', maxHeight: 'fit-content', backgroundColor: '#343a40', position: 'absolute', minWidth:'400px'}}>
      <button aria-label="Close" className="ButtonClose__StyledButton-sc-azdk6r-0 gzJtQg" onClick={handleCloseMenu}>
        <svg aria-hidden="true" focusable="false" role="img" className="octicon octicon-x" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ display: 'inline-block', userSelect: 'none', verticalAlign: 'text-bottom', overflow: 'visible', color: 'aliceblue' }}>
          <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
        </svg>
      </button>
      <div id="sidebar-overlay-header" className="Box-sc-g0xbh4-0 Dialog__DialogHeaderBase-sc-13rdxb7-1 epdUVB dbHlRs" style={{ paddingTop: '0px', background: 'none' }}>
        <div className="mt-3">
          <Link to="/" style={{textDecoration: 'none'}}>
            <div rel="" className="f6 pl-2 pr-5 ml-n1 pb-1 Link--primary color-fg-default"  style={{ color: 'aliceblue' }}>
              <svg aria-hidden="true" focusable="false" role="img" className="mr-1" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ display: 'inline-block', userSelect: 'none', verticalAlign: 'text-bottom', overflow: 'visible' }}>
                <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"></path>
              </svg>Tienda de Comercio en Linea
            </div>
          </Link>
        </div>
        <div className="mt-3">
          <div style={{ width: "100px", height: "fit-content", position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center', display: 'block'}} title={`usuario: ${fullName}\nemail: ${email}`}>
            {!email && <div className='container' style={{ width: "fit-content", height: 'fit-content', position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <img src={image ? image : `${relativePath}/images/logo3.png`} alt="Foto de perfil" style={{ width: "70px", height: "70px", borderRadius: "50%" }}/>
            </div>}
            {email &&
            <>
            <div className='container' style={{ width: "fit-content", height: 'fit-content', position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <img src={image ? image : `${relativePath}/images/perfil.png`} alt="Foto de perfil" style={{ width: "70px", height: "70px", borderRadius: "50%" }}/>
            </div> 
              <button className="btn btn-outline-warning" style={{padding: '0 10px', margin: '10px 0 0 0'}} onClick={handleLogOut}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
              </>}
          </div>
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 dropdown">
          <li className="nav-item">
            <Link to="/" style={{textDecoration: 'none'}}>
              <div className="nav-link active" aria-current="page" style={{ color: 'aliceblue' }}>Inicio</div>
            </Link>
          </li>
          <li className="nav-item" onClick={handleModalToggle}>
            <div className="nav-link" style={{ color: 'aliceblue', cursor: 'pointer'}} >Sign In</div>
          </li>
          {showModal && <ModalForm onClose={handleModalToggle} handleisSignIn={handleisSignIn}/>}
          <li className="nav-item">
            <div className="nav-link" style={{ color: 'aliceblue', cursor: 'pointer'}}>Novedades</div>
          </li>
          <li className="nav-item">
            <Link to="/favoritos" style={{textDecoration: 'none'}}>
              <div className="nav-link" style={{ color: 'aliceblue', cursor: 'pointer'}}>Favoritos</div>
            </ Link>
          </li>
          <li className="nav-item">
            <div className="nav-link" style={{ color: 'aliceblue', cursor: 'pointer' }} onClick={handleOpenModal}>Soporte</div>
          </li>
          <li className="nav-item dropdown">
            <div className="nav-link dropdown-toggle"  role="button"  aria-expanded="false" style={{ color: 'aliceblue' }} onClick={handleOpenDropDown}>
              Catálogo
            </div>
            <ul style={{ display: `${isDrop}`, maxHeight: '200px', overflowY: 'auto'}} className="dropdown-menu dropdown-menu-static show">
              {tags && tags.map((tag) =>{
                return(
                  <li key={tag.tag}>
                    <Link to={`/products/${tag.tag}`} style={{textDecoration: 'none'}}>                      
                      <div className="dropdown-item">{tag.tag}</div>
                    </Link>
                  </li>);                   
              })}
            </ul>
          </li>
        </ul>
        <div className="d-flex" role="search">
        <Provider store={storeTotal}>
          <Select 
            isClearable={true} 
            options={options} 
            className="form-control me-2 'search-input-open' : ''" 
            placeholder="busqueda" 
            style={{ margin: '0 0 0 auto', display: 'block', maxWidth: '300px' }} 
            onChange={handleSelectChange}
          />
      </Provider>
        </div> 
      </div>
    </div>
  );
}

export default Menu;
