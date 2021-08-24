import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import validator from "validator";
import { auth } from "firebase";
import { Input } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";


//validation function of email
const validateFields = (email, password) => {
  const isValid = {
      email: validator.isEmail(email),
      password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      }),
  };
  return isValid;
};

//log in function to have access
const login = (email, password) => {
  auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
          console.log("Logged in");
      })
      .catch(() => {
        showMessage({
          message: "Account does not exist",
          type: "warning",
          position: "bottom",
          floating: "true",
          icon: { icon: "info", position: "left" },
          autoHide:"true", 
          duration: 1000,
        });
        console.log("No user");  
    })
};

function LogIn(props) {
    //const [userName] = React.useState('');
    //const [passWord, setTextPW] = React.useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState({check: false});
    const navigation = useNavigation();

    //Email variables
    const [emailField, setEmailField] = useState({
      text: "", 
      errorMessage: "",
    });

    //Password variables
    const [passwordField, setPasswordField] = useState({
      text: "", 
      errorMessage: "",
    });

    function handleCheck(){
      setToggleCheckBox({check: !toggleCheckBox.check});
    }
    
    function checkboxLogin(){
      if(toggleCheckBox.check == true)
        props.navigation.navigate('clientHomepage');
      else
        props.navigation.navigate('customerShops');
    } 

    return (
      <ImageBackground
          style={styles.BGImage}
          source={require('../assets/images/splashScreenDark.jpg')}>
        {/* <Image style={styles.Image} source={require('../assets/images/orange_Bg.jpg')}/> */}
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* End of Top Navigation */}

            <View style={styles.LogoContainer}>
              <Image style={styles.Logo}
                source={require('../assets/images/logo.png')}></Image>
                <Text style={{color: '#fff', fontSize: 12, marginTop: 10}}>Loyalty and Rewards on your Hands</Text>
            </View>
            {/* <View style={styles.title}>
              <Text style={{color: '#fe1100', fontSize: 45}}>APresto</Text>
              <Text style={{color: '#fe1100', fontSize: 12}}>Loyalty and Rewards on your Hands</Text>
              <Text style={{color: '#fe1100', fontSize: 12}}>Loyalty and Rewards on your Hands</Text>
            </View>   */}
              <View style={styles.LogInContainer}>
                <Text style={{color: '#ee4b43', fontSize: 13, marginVertical: 15}}>Log In now to see your account</Text>
                <View style={styles.textView}>
                  <Input
                      //Email input
                      style={styles.textEmail}
                      leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                      placeholder="Email"
                      text={emailField.text}
                      onChangeText={(text) => {setEmailField({text});}}
                      errorMessage={emailField.errorMessage}
                      autoCompleteType="email"
                  />
                </View>
                <View style={styles.textView}>  
                  <Input
                      //Password input
                      style={styles.textPassword}
                      leftIcon={{ type: 'font-awesome', name: 'lock' }}
                      secureTextEntry={true}
                      placeholder="Password"
                      text={passwordField.text}
                      onChangeText={(text) => {setPasswordField({text});}}
                      errorMessage={passwordField.errorMessage}
                      autoCompleteType="password"
                  />
                </View>  
                {/* <View style={styles.checkbox}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox.check}
                    onChange={()=>handleCheck()}
                    checked={setToggleCheckBox}
                  />
                  <Text> Log in as store owner. </Text>
                </View> */}
              </View>
              
                <TouchableOpacity style={styles.LogInButton} onPress={() => {
                  const isValid = validateFields(emailField.text, passwordField.text);

                  let isAllValid = true;
                  if(!isValid.email){
                    console.log("Please enter a valid email...")
                    emailField.errorMessage = "Incorrect Email. Please enter a valid email";
                    setEmailField({...emailField})
                    isAllValid = false;
                  }

                  if(!isValid.password){
                    console.log("Password must be at least 8 long characters with numbers")
                    passwordField.errorMessage = "Incorrect Password. Makke sure you entered the password correctly.";
                    setPasswordField({...passwordField})
                    isAllValid = false;
                  }

                  if(isAllValid){
                    login(emailField.text, passwordField.text);
                  }

                }}>
                    <Text style={{color: '#fff', fontSize: 16}}>Log In</Text>
                </TouchableOpacity>
        </SafeAreaView> 
      </ImageBackground>
       
    );
}

const styles = StyleSheet.create({
  Image: {
    flex: 1,
    position: "absolute",
    // width: wp('100%'),
    height: hp('100%'),
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 32 : 0
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    width: wp('100%'),
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
  title:{
    alignItems: "center",
    marginVertical: hp('5%')
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Back: {
    position: "absolute",
    top: 30,
    padding: 10
  },
  BackLogo: {
      height: 30,
      width: 30,
  },
  BGImage: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  LogInButton: {
    width: wp('80%'),
    height: hp('6%'),
    backgroundColor: '#071964',
    borderRadius: 30,
    // top:  hp('45%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  Logo:{
    // width: wp('20%'),
    // height: hp('20%'),
    width: wp('100%'),
    height: 100,
    borderRadius: 100,
    borderWidth: 1
  },
  LogoContainer:{
    // position: "absolute",
    width: wp('100%'),
    height: hp('25%'),
    // paddingTop: hp('15%'),
    alignItems: "center",
    alignSelf: "center",

  },
  LogInContainer: {
    width: wp('80%'),
    height: hp('40%'),
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20
    //justifyContent: 'center',
    // top: hp('40%'),
  },
  textEmail: {
    width: wp('80%'),
    height: 50,
    fontSize: 16,
    marginLeft: 10,
    // borderColor: '#1c2b59',
    marginVertical: 2
    // top: 80
  },
  textPassword: {
    width: wp('80%'),
    height: 50,
    fontSize: 16,
    marginLeft: 10,
    // borderColor: '#1c2b59',
    marginVertical: 2
    // top: 80
  },
  textView: {
    width: '90%',
    alignItems: 'center'
  },
  checkbox: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    width: '80%',
    borderColor: '#1c2b59',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default LogIn;