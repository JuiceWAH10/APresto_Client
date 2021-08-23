// for managing rewards into state

import { rewards } from "../screens/Dummy_Data";


const initialState = {
    allRewards: rewards
    //,storeProducts: products.filter(prod => prod.shop_ID === )
};

export default (state = initialState, action) => {
    return state;
};