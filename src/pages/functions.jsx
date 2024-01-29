import { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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