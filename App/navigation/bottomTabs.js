import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';

import Explore from '../screens/customer/explore';
import Shops from '../screens/customer/shops';
import Profile from '../screens/customer/profile';
import Rewards from '../screens/customer/rewards';

const Tabs = createBottomTabNavigator();

export const customerBottomTabs = () =>{
    return (
      <Tabs.Navigator 
        backBehavior={"none"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if(route.name === 'EXPLORE'){
              iconName = focused
              ? require('../assets/searches-active.png')
              : require('../assets/searches.png');
            }
            else if(route.name === 'SHOPS'){
              iconName = focused
              ? require('../assets/shop-active.png')
              : require('../assets/shop.png');
            }
            else if(route.name === 'REWARDS'){
              iconName = focused
              ? require('../assets/gift-active.png')
              : require('../assets/gift.png');
            }
            else if(route.name === 'PROFILE'){
              iconName = focused
              ? require('../assets/user-active.png')
              : require('../assets/user.png');
            }
              
            return (
              <Image source={iconName} style={{width: 30, height: 30}} resizeMode="contain"/>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#fd4140",
          inactiveTintColor: 'black'
        }}
      >
        <Tabs.Screen name="EXPLORE" component={Explore} />        
        <Tabs.Screen name="SHOPS" component={Shops} />    
        <Tabs.Screen name="REWARDS" component={Rewards} />    
        <Tabs.Screen name="PROFILE" component={Profile} />
      </Tabs.Navigator>
    )
  }
