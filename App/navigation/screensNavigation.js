import React from 'react';
import { createStackNavigator, createAppContainer } from "@react-navigation/stack";

// Client Screens
import ClientHomepage from '../screens/owners/clientHomepage';
import ClientProductAdd from '../screens/owners/clientProduct/clientProductAdd';
import ClientProductEdit from '../screens/owners/clientProduct/clientProductEdit';
import ClientProductList from '../screens/owners/clientProduct/clientProductList';
import ClientRewardAdd from '../screens/owners/clientReward/clientRewardAdd';
import ClientRewardEdit from '../screens/owners/clientReward/clientRewardEdit';
import ClientRewardList from '../screens/owners/clientReward/clientRewardList';
import ClientSukiList from '../screens/owners/clientSuki/clientSukiList';
import ClientEditProfile from '../screens/owners/clientProfile/clientEditProfile';
import QRCodeScanner from '../screens/QRCodeScanner';
import CheckoutPage from '../screens/checkoutPage';
import POStabs from '../navigation/POStabs';
import QRInfo from '../screens/QRInfo';
import DoneTransaction from '../screens/doneTransaction';
import ClientSukiTransactions from '../screens/owners/clientSuki/clientSukiTransactions';

const Stack = createStackNavigator();

export default Screens = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="clientHomepage" component={ClientHomepage} />
      <Stack.Screen name="clientProductAdd" component={ClientProductAdd} />
      <Stack.Screen name="clientProductEdit" component={ClientProductEdit} />
      <Stack.Screen name="clientProductList" component={ClientProductList} />
      <Stack.Screen name="clientRewardAdd" component={ClientRewardAdd} />
      <Stack.Screen name="clientRewardEdit" component={ClientRewardEdit} />
      <Stack.Screen name="clientRewardList" component={ClientRewardList} />
      <Stack.Screen name="clientSukiList" component={ClientSukiList} />
      <Stack.Screen name="clientEditProfile" component={ClientEditProfile} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />  
      <Stack.Screen name="checkoutPage" component={CheckoutPage} />
      <Stack.Screen name="POS" component={POStabs} />
      <Stack.Screen name="QRInfo" component={QRInfo} /> 
      <Stack.Screen name="Done" component={DoneTransaction} />
      <Stack.Screen name="clientSukiTransactions" component={ClientSukiTransactions} />
    </Stack.Navigator>
    
  );
}