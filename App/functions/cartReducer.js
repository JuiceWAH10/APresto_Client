//for handling cart items
import {React} from 'react';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, ADD_FROM_CUSTOMERP } from '../functions/cartFunction';
import CartItem from '../models/cartItem';
//import cartItems

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.product_Name;
            const imgLink = addedProduct.imgLink;
            const quantity = addedProduct.quantity;
            const type = addedProduct.type;
            let cartItem;
            
            //check if cart has the item to be added
            if(state.items[addedProduct.product_ID]){
                cartItem = new CartItem(
                    state.items[addedProduct.product_ID].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.product_ID].total + prodPrice,
                    imgLink,
                    type
                );
            }
            else{
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice, imgLink, type)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.product_ID]: cartItem },
                totalAmount: state.totalAmount + prodPrice
            };

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.product_ID]
            const currentQty = selectedCartItem.quantity;
            let cartItems;
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, 
                    selectedCartItem.productTitle, 
                    selectedCartItem.total - selectedCartItem.productPrice,
                    selectedCartItem.imgLink,
                    selectedCartItem.type
                );
                cartItems = { ...state.items, [action.product_ID]: updatedCartItem}
            }
            else{
                cartItems = { ...state.items };
                delete cartItems[action.product_ID];
            }
            return {
                ...state,
                items: cartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };

        case CLEAR_CART:
            return initialState;

        case ADD_FROM_CUSTOMERP:
            console.log("addP " + action.product.product_ID);
            return{
                ...state,
                items: { ...state.items, [action.product.product_ID]: action.product },
                totalAmount: state.totalAmount + (action.product.productPrice * action.product.quantity)
            }

    }
    return state;
};