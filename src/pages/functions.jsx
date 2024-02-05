import { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export function useChatboxEffect() {  
  
  useEffect(() => {
    $(document).ready(() => {
      $(".chatbox-open").click(() =>
        $(".chatbox-popup, .chatbox-close").fadeIn()
      );

      $(".chatbox-close").click(() =>
        $(".chatbox-popup, .chatbox-close").fadeOut()
      );

      $(".chatbox-maximize").click(() => {
        $(".chatbox-popup, .chatbox-open, .chatbox-close").fadeOut();
        $(".chatbox-panel").fadeIn();
        $(".chatbox-panel").css({ display: "flex" });
      });

      $(".chatbox-minimize").click(() => {
        $(".chatbox-panel").fadeOut();
        $(".chatbox-popup, .chatbox-open, .chatbox-close").fadeIn();
      });

      $(".chatbox-panel-close").click(() => {
        $(".chatbox-panel").fadeOut();
        $(".chatbox-open").fadeIn();
      });
    });
  }, []);
}

export function useSearchProducts(){
  const reactApi = process.env.REACT_APP_NEST_API;
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios.get(`${reactApi}/products`).then(
      response=>{
        setProducts(response.data) 
      }
    )
  }, [])

  return products;
};

export function useSearchTags(){
  const reactApi = process.env.REACT_APP_NEST_API;
  const [tags, setTags] = useState(null);
  useEffect(() => {
    axios.get(`${reactApi}/products/tag`).then(
      response =>{
        setTags(response.data);
      }
    )
}, [])

  return tags;
};

export function handleSearchChange(tags, products, setOptions){
  let product;
  let tag;
  let subtag;
  let productsTitle =[];
  let productsTag =[];
  let productsSubtag =[];
  if (products){
    for (product of products ){
      productsTitle.push(product.title);
    }
  }
  if (tags){
    for (tag of tags ){
      for (subtag of tag.subtag){
        productsSubtag.push(subtag);
      }
      productsTag.push(tag.tag);
    }
  }
  const filteredOptions = productsTitle.concat(productsTag).concat(productsSubtag);
  let newOptions =[];
  let i;
  for (i=0; i < filteredOptions.length; i++){
    const selected={
      value: `option${i}`,
      label: filteredOptions[i]
    }
    newOptions.push(selected)
  }
  setOptions(newOptions);
};

export function changePage(selectedOption, products, tags, navigate, dispatch){
  if(selectedOption){
    let produit;
    let label;
    let sublabel;
    for (produit of products){
      if (produit.title === selectedOption.label) {
      dispatch({ type: 'SET_IMAGEN', payload: produit });
      navigate(`/product_details/${produit.slug}`);
      }
    }
    for (label of tags){
      if (label.tag === selectedOption.label) {
        navigate(`/products/${label.tag}`);
      }
    }
    for (sublabel of tags){
      let i;
      for (i=0; i < sublabel.subtag.length; i++ ){
        if (sublabel.subtag[i] === selectedOption.label) {
        navigate(`/products/${sublabel.tag}/${sublabel.subtag[i]}`);
        }
      }
    }
  }
};

export function handleisSignIn(setEmail, setImage, setfullName, credentials){
  if(credentials){
    setEmail(credentials.email);
    setImage(credentials.image);
    setfullName(credentials.fullName);
  }
  
}

export const handleCloseModalAddress = (setShowModalAddress) => {
  setShowModalAddress(false);
};
export const handleOpenModalAddress = (setShowModalAddress) => {
  setShowModalAddress(true);
};

export const createSale = (credentials, address, productos, venta, setResultadoFetch, product, products, dispatch) => {
  const reactApi = process.env.REACT_APP_NEST_API;
  const EmailJSPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const EmailJSServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EmailJSTempalteId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID; 
  const emailUser = process.env.REACT_APP_EMAIL_USER;
  const admin = process.env.RECAT_APP_ADMIN;
  if(credentials){
    const token= credentials.token;
    if (productos.length > 0) {
      axios.post(`${reactApi}/ventas`, venta, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setResultadoFetch(response.data);

        if(venta.emailInfo && credentials.email){
          const templateParams = {
            to_email: emailUser,
            from_email: credentials.email,
            to_name: admin,
            from_name: credentials.fullName,
            message: venta.emailInfo
          };
          const templateParams2 = {
            to_email: credentials.email,
            from_email: emailUser,
            to_name: credentials.fullName,
            from_name: admin,
            message: 'Gracias por dejar un comentario sobre la compra su opinion nos ayuda mucho'
          };
          emailjs.send(EmailJSServiceId,EmailJSTempalteId, templateParams, EmailJSPublicKey)
          .then((response) => {
          }, (err) => {
            console.log('FAILED...', err);
          });
          emailjs.send(EmailJSServiceId,EmailJSTempalteId, templateParams2, EmailJSPublicKey)
          .then((response) => {
          }, (err) => {
          console.log('FAILED...', err);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  
      for (product of products) {
        dispatch({ type: 'QUITAR_ELEMENTO', payload: product.id });
      }
    }
  }
  else{
    if (productos.length > 0) {
      axios.post(`${reactApi}/ventas`, venta)
      .then(response => {
        setResultadoFetch(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  
      for (product of products) {
        dispatch({ type: 'QUITAR_ELEMENTO', payload: product.id });
      }
    }
  }
};