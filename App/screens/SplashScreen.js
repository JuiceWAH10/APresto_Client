import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function SplashScreen(props) {
    return (
        <ImageBackground
            // resizeMode={'contain'}
            style={styles.BGImage}
            source={require('../assets/images/splashScreen2.jpg')}>
          {/* <Image style={styles.Image} source={require('../assets/images/splashScreen.jpg')}/> */}
          <SafeAreaView style={styles.droidSafeArea}>
            <TouchableOpacity onPress={() => props.navigation.navigate('signupCustomer')}>
              <View style={styles.SignUpButton}>
                <Text style={{color: '#fff', fontSize: 16}}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
              <View style={styles.LogInButton}>
                <Text style={{color: '#ee4b43', fontSize: 16}}>Log In</Text>
              </View>
            </TouchableOpacity>
            {/* <View style={styles.LogoContainer}>
              <Image style={styles.Logo}
                source={require('../assets/Logo-AP.png')}></Image>
                <Text style={{color: '#fff', fontSize: 14, marginTop: 10}}>Loyalty and Rewards on your Hands</Text>
            </View> */}
          </SafeAreaView>
        </ImageBackground>
            
    );
}

const styles = StyleSheet.create({
    BGImage: {
      flex: 1,
      width: wp('100%'),
      justifyContent: 'flex-end',   
    },
    Image: {
      flex: 1,
      position: "absolute",
      // width: wp('100%'),
      // height: hp('100%'),
    },
    droidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 32 : 0,
      flexDirection: "column-reverse"
    },
    Logo:{
      width: 150,
      height: 150,
      borderRadius: 150,
      borderWidth: 1
    },
    LogoContainer:{
      width: wp('100%'),
      height: hp('30%'),
      marginBottom: hp('35%'),
      alignItems: "center",
      alignSelf: "center",
    },
    LogInButton: {
      width: wp('90%'),
      height: hp('6%'),
      backgroundColor: '#fff',
      borderRadius: 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 4
    },
    SignUpButton: {
      width: wp('90%'),
      height: hp('6%'),
      backgroundColor: '#071964',
      borderRadius: 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 10
    }
  });

export default SplashScreen;