const cartItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.product_id !== action.payload.product_id)
    }
    return state
}

export default cartItems