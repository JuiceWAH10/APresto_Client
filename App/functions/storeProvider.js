import React, { createContext, useState } from 'react';
import firebase, { auth } from 'firebase';
import { showMessage } from 'react-native-flash-message';

export const StoreContext = createContext();
export const StoreProvider = ({children}) => {

//user state
const [store, setStore] = useState({});

return(

    <StoreContext.Provider
        value={{ 
            store, 
            setStore
        }}>
            {children}
        </StoreContext.Provider>
);
};