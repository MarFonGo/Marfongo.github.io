import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Catalog from './Catalog';
import Collection from './Collection';
import ProductDetails from './ProductDetails';
import Productos from './Productos';
import GoogleCallbackHandler from './components/GoogleCallBackHandler';
import '../styles.css';
import { Provider } from 'react-redux';
import { storeTotal } from '../store';
import Favoritos from './Favoritos';
import ErrorPage from './ErrorPage';

function App () {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Provider store={storeTotal}>     
            <Home/>
          </Provider>
        } />
        <Route path="/catalog" element={
          <Provider store={storeTotal}>   
            <Catalog/>
          </Provider>  
        } />
        <Route path="/products/:tag" element={
          <Provider store={storeTotal}>
            <Collection/>
          </Provider>
        } />
        <Route path="/products/:tag/:subtag" element={
          <Provider store={storeTotal}>
            <Productos/>
          </Provider>
        } />
        <Route path="/product_details/:product" element={
          <Provider store={storeTotal}>
            <ProductDetails/>
          </Provider>
        } />
        <Route path="/google-callback"element={
          <Provider store={storeTotal}>
            <GoogleCallbackHandler/>
          </ Provider>
        }/> 
        <Route path="/favoritos" element={
          <Provider store={storeTotal}>
            <Favoritos/>
          </ Provider>
        }/>
        <Route path='/*' element={
          <ErrorPage error={'404'} message={'Not Found'}/>
        }/>
        <Route path='/Network_Error' element={
          <ErrorPage error={'Network error'} message={'Network Error'}/>
        }/>
        <Route path='/Server_Error' element={
          <ErrorPage error={'500'} message={'Server Error'}/>
        }/>
      </Routes>
      
    </BrowserRouter>
    
  );
};

export default App;
