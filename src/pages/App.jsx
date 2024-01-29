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
import ErrorPage from './NotFound';

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
        <Route path='/*' Component={ErrorPage}/>
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
