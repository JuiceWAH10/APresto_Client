import React, { createContext, useState } from 'react';
import firebase, { auth } from 'firebase';
import { showMessage } from 'react-native-flash-message';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

//user state
const [user, setUser] = useState(null);
const [expoToken, setExpoToken] = useState('');

return(
    <AuthContext.Provider
        value={{ 
            user, 
            setUser,
            expoToken,
            setExpoToken,
            //login function to have access
            login: async(email, password) => {
                try{
                    await auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log("User logged in...");
                            })
                }catch (error){
                    showMessage({
                      message: "Account does not exist",
                      type: "warning",
                      position: "top",
                      statusBarHeight: 30,
                      floating: "true",
                      icon: { icon: "info", position: "left" },
                      autoHide: "true", 
                      duration: 2000
                    });
                    console.log("Login failed...", error);  
                }
            },
            //logout function
            logout: async () => {
                try{
                    await auth()
                            .signOut()
                            .then(() => {
                                console.log("User logged off...");
                            })
                }catch (error){
                    console.log(error);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
);
};