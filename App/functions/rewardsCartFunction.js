// for functionality of the cart; partner with cartReducer.js

// identifiers
export const REDEEM_TO_CART = 'REDEEM_TO_CART';
export const CANCEL_REDEEM = 'CANCEL_REDEEM';
export const CLEAR_CART = 'CLEAR_CART';

// export functions
export const redeemToCart = reward => {
    return { type: REDEEM_TO_CART, reward: reward };
};

export const cancelRedeem = rewardID => {
    return {type: CANCEL_REDEEM, reward_ID: rewardID}
};

export const clearCart = () => {
    return {type: CLEAR_CART}
};