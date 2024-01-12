// store.js - Define and export the store
import { configureStore, combineReducers } from '@reduxjs/toolkit';


const initialState = {
  images: [{id: 100,url:'images/lomo.png'}], 
  title: 'Lomo de cerdo', 
  id: 'imagen3', 
  price: 500, 
  info: 'Exquisito lomo de calidad', 
  slug:'lomo_de_cerdo', 
  tag: 'comida',
  subtag: 'carnicos', 
  stock: 10,

};

function itemReducer(state1 = initialState, action) {
  switch (action.type) {
    case 'SET_IMAGEN':
      return {
        ...state1,
        ...action.payload
      };
    default:
      return state1;
  }
}
export const store1 = configureStore({reducer:itemReducer});

function Cant(state2 = 0, action) {
  switch (action.type) {
    case 'SET_CANTIDAD':
      return action.payload;
    default:
      return state2;
  }
}
export const store2 = configureStore({reducer:Cant});

function savedImages(state3 = null, action){
  switch (action.type) {
    case 'SET_IMAGENES_GUARDADAS':
      return action.payload;
    default:
      return state3;
  }
}
export const store3 = configureStore({reducer:savedImages});

const rootReducer = combineReducers({
  first: itemReducer,
  second: savedImages, 
  third: Cant,
});
export const storeTotal = configureStore({reducer:rootReducer});

function itemsReducer(state = [], action) {
  const currentItems= storeTotal.getState();
  const currentState= currentItems.first;
  const currentCant = currentItems.third;
  switch (action.type) {
    case 'AGREGAR_ELEMENTO':
      const mappedArray = state.map(item => item.id);
      const index = mappedArray.indexOf(currentState.id);
      if (currentCant > 0){
        if (index >= 0 ) {
          const previousCant=state[index].cantidad;
          const newCant=currentCant + previousCant;
          state=state.filter(item => item !== state[index]);
          return [...state, {name:currentState.slug,id:currentState.id, image: currentState.images[0].url, cantidad: newCant}];
        } else {
          return [...state, {name:currentState.slug,id:currentState.id, image: currentState.images[0].url, cantidad: currentCant}];
        }
      } 
    
    case 'QUITAR_ELEMENTO':
      const id = action.payload;
      return state=state.filter(item => item.id !== id);
    default:
      return state;
  }
}
export const store = configureStore({reducer:itemsReducer});
 

