import React from 'react';
import { createStackNavigator, createAppContainer } from "@react-navigation/stack";
import { customerBottomTabs } from './bottomTabs';


import QRCodeScanner from '../screens/QRCodeScanner';

// Customer Screens
import ShopItems from '../screens/customer/shopItems/shopItems';
import RewardItems from '../screens/customer/rewardItems/rewardItems';
import ShopItemsCart from '../screens/customer/shopItems/shopItemsCart';
import RewardItemsCart from '../screens/customer/rewardItems/rewardItemsCart';
import ShopItemsQR from '../screens/customer/shopItems/shopItemsQR';
import RewardItemsQR from '../screens/customer/rewardItems/rewardItemsQR';
import CustomerEditProfile from '../screens/customer/profile/customerEditProfile';

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

const Stack = createStackNavigator();

export default Screens = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="customerShops" component={ClientHomepage} />  
      
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />  
      {/* Added Vincent 
      <Stack.Screen name="explore" component={Explore} />
      <Stack.Screen name="rewards" component={Rewards} />
      <Stack.Screen name="shops" component={Shops} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="clientHomepage" children={customerBottomTabs} />  
      */}
      <Stack.Screen name="shopItems" component={ShopItems} />
      <Stack.Screen name="shopItemsCart" component={ShopItemsCart} />  
      <Stack.Screen name="shopItemsQR" component={ShopItemsQR} />   
      <Stack.Screen name="rewardItems" component={RewardItems} />
      <Stack.Screen name="rewardItemsCart" component={RewardItemsCart} />
      <Stack.Screen name="rewardItemsQR" component={RewardItemsQR} />
      <Stack.Screen name="customerEditProfile" component={CustomerEditProfile} />

      
      <Stack.Screen name="clientProductAdd" component={ClientProductAdd} />
      <Stack.Screen name="clientProductEdit" component={ClientProductEdit} />
      <Stack.Screen name="clientProductList" component={ClientProductList} />
      <Stack.Screen name="clientRewardAdd" component={ClientRewardAdd} />
      <Stack.Screen name="clientRewardEdit" component={ClientRewardEdit} />
      <Stack.Screen name="clientRewardList" component={ClientRewardList} />
      <Stack.Screen name="clientSukiList" component={ClientSukiList} />
      <Stack.Screen name="clientEditProfile" component={ClientEditProfile} />
      {/* End Added Vincent */}

    </Stack.Navigator>
    
  );
}