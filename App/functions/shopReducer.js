// for managing shops into state and have it access all arount the app

import { shops } from "../screens/Dummy_Data";


const initialState = {
    allShops: shops
    //,storeProducts: products.filter(prod => prod.shop_ID === )
};

export default (state = initialState, action) => {
    return state;
};