import React, {  useContext, useState, useEffect} from 'react';
import firebase, { auth } from 'firebase';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import FlashMessage from 'react-native-flash-message';

import SplashScreen from './App/screens/SplashScreen';  
import LogIn from './App/screens/LogIn';
import SignupCustomer from './App/screens/signupCustomer';
import Screens from './App/navigation/screensNavigation'
import { Provider } from 'react-redux'
import { AuthProvider, AuthContext } from './App/functions/authProvider';
import { StoreProvider, StoreContext } from './App/functions/storeProvider';

//for reducers
import cartReducer from './App/functions/cartReducer';
import rewCartReducer from './App/functions/rewardsCartReducer';
import { createStore, combineReducers } from 'redux';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "Failed prop type: Invalid props.style key `fontSize` supplied to `DialogInput`."
]);

// combine all reducers into one object
const rootReducer = combineReducers({
  cart: cartReducer,
  rewCart: rewCartReducer
});

// create a store for managing states using the reducers which will be used for data transfer through the app.
const store = createStore(rootReducer);

//Auth Screens
const AuthStack = createStackNavigator();

//Will direct here if not login/ or will create account then navigate to screens in screensNavigator.js
const AuthScreens = () => {
  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="splash" component={SplashScreen} />
      <AuthStack.Screen name="login" component={LogIn} />
      <AuthStack.Screen name="signupCustomer" component={SignupCustomer} />
    </AuthStack.Navigator>
  );
}

const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  //insert loading feature here
  if(initializing) return null;

  return (
    <NavigationContainer>
      {user ? <Screens/> : <AuthScreens/>}
    </NavigationContainer>
  );
}

//THIS SECTION IS A MOUNT CODE
//Authentication function component
/*
function Authentication(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      if (firebase.auth().currentUser){
        setIsAuthenticated(true);
      }
      firebase.auth().onAuthStateChanged(user => {
        console.log("Checking auth state...");
        if(user) {
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
        }
      });
    }, []);

  return(
    <NavigationContainer>
      {isAuthenticated ? <Screens/> : <AuthScreens/>}
    </NavigationContainer>
  );
}
*/

export default function App() {
    return (
      //call Authentication function component
      <Provider store={store}>
        <AuthProvider>
          {/*child props of provider*/}
          <StoreProvider>
            <Routes />
          </StoreProvider>
        </AuthProvider>
        <FlashMessage position="top" animated={true} />
      </Provider>
    )
};

//firebase configuration to connect to firebase
const firebaseConfig = {
  apiKey: "AIzaSyAeHqFIjvpdIl5Yr5nGibf_Ol8rkZrqQwo",
  authDomain: "apresto-b47ae.firebaseapp.com",
  projectId: "apresto-b47ae",
  storageBucket: "apresto-b47ae.appspot.com",
  messagingSenderId: "491750670452",
  appId: "1:491750670452:web:3719bba8d7305392385121"
};

//to avoid creating multiple firebase apps and cause error
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}