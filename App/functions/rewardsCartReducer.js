//for handling cart items
import {React} from 'react';
import { REDEEM_TO_CART, CANCEL_REDEEM, CLEAR_CART } from '../functions/rewardsCartFunction';
import CartItem from '../models/cartItem';
//import cartItems

const initialState = {
    rewItems: {},
    totalPoints: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REDEEM_TO_CART:
            const claimReward = action.reward;
            const pointsReq = claimReward.pointsReq;
            const rewName = claimReward.reward_Name;
            let cartItem;
            
            //check if cart has the item to be added
            if(state.rewItems[claimReward.reward_ID]){
                cartItem = new CartItem(
                    state.rewItems[claimReward.reward_ID].quantity + 1,
                    pointsReq,
                    rewName,
                    state.rewItems[claimReward.reward_ID].total + pointsReq
                );
            }
            else{
                cartItem = new CartItem(1, pointsReq, rewName, pointsReq)
            }
            return {
                ...state,
                rewItems: { ...state.rewItems, [claimReward.reward_ID]: cartItem },
                totalPoints: state.totalPoints + pointsReq
            };

        case CANCEL_REDEEM:
            const selectedCartItem = state.rewItems[action.reward_ID]
            const currentQty = selectedCartItem.quantity;
            let cartItems;
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1, 
                    selectedCartItem.productPrice, 
                    selectedCartItem.productTitle, 
                    selectedCartItem.total - selectedCartItem.productPrice
                );
                cartItems = { ...state.rewItems, [action.reward_ID]: updatedCartItem}
            }
            else{
                cartItems = { ...state.rewItems };
                delete cartItems[action.reward_ID];
            }
            return {
                ...state,
                rewItems: cartItems,
                totalPoints: state.totalPoints - selectedCartItem.productPrice
            };
        
        case CLEAR_CART:
            return initialState;

    }
    return state;
};