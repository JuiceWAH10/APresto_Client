// for managing products into state

import { products } from "../screens/Dummy_Data";
import * as crud from "../functions/firebaseCRUD";
import React from "react";

const initialState = {
    allProducts: products
    //,storeProducts: products.filter(prod => prod.shop_ID === shop_ID)
};

export default (state = initialState, action) => {
    return state;
};