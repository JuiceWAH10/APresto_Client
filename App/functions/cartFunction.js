// for functionality of the cart; partner with cartReducer.js

// identifiers
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

// export functions
export const addToCart = product => {
    return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = productID => {
    return {type: REMOVE_FROM_CART, product_ID: productID}
};

export const clearCart = () => {
    return {type: CLEAR_CART}
};