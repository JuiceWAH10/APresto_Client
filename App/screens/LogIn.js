import React, { useContext, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
//import { useNavigation } from '@react-navigation/native';
import validator from 'validator';
import { auth } from 'firebase';
import { AuthContext } from '../functions/authProvider';
import { Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import Dialog from 'react-native-dialog';


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

/*
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
*/


const LogIn = ({navigation}) => {

    const {login} = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

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

    const [recoveryEmail, setRecoveryEmail] = useState("");

    const showDialog = () => {
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };
    
    const handleOk = async () => {
        //firebase password reset
        await auth()
        .sendPasswordResetEmail(recoveryEmail)
        .then(() => {
            showMessage({
                message: "Account recovery link sent",
                description: "Please check your email to retrieve your account",
                type: "success",
                position: "bottom",
                statusBarHeight: 20,
                floating: "true",
                icon: { icon: "auto", position: "left" },
                autoHide: "true", 
                duration: 2500
            });
            console.log("User account recovery link delivered...");
        })
        .catch((error) => {
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
            console.log("Account recovery failed...", error);
        });
        setRecoveryEmail("")
        setVisible(false);
    };
        //End DialogBox

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
                source={require('../assets/images/client_logo.png')}></Image>
                <Text style={{color: '#fff', fontSize: 12, marginTop: 10}}>Loyalty of Customers on your Hands</Text>
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
                <TouchableOpacity style={styles.forgotButton} onPress={showDialog} >
                  <Text style={{color: '#071964', fontSize: 13, marginVertical: 14}}>Forgot Password?</Text>
                </TouchableOpacity>

                <Dialog.Container contentStyle={{height: 210, paddingTop: 12, paddingRight: 19, alignItems: 'center', justifyContent:'center', borderRadius: 15}} visible={visible}>
                  <Dialog.Title style={{marginBottom: 5, fontSize: 18, fontWeight: "bold"}}>Account Recovery</Dialog.Title>
                  <Dialog.Input style={{paddingLeft: 10, fontSize: 16}} label={"Please enter your email to receive a reset password link"} value={recoveryEmail} onChangeText={(text) => setRecoveryEmail(text)}></Dialog.Input>
                  <Dialog.Button style={{marginRight: 30, marginLeft: 20, paddingTop: 0, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Cancel" onPress={handleCancel}/>
                  <Dialog.Button style={{marginRight: 25, marginLeft: 25, paddingTop: 0, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Ok" onPress={handleOk} />
                </Dialog.Container>
              </View>
              
                <TouchableOpacity style={styles.LogInButton} onPress={() => {
                  const isValid = validateFields(emailField.text, passwordField.text);

                  let isAllValid = true;
                  if(!isValid.email){
                    console.log("Input a correct email...")
                    emailField.errorMessage = "Incorrect email. Please enter a valid email";
                    setEmailField({...emailField})
                    isAllValid = false;
                  }

                  if(!isValid.password){
                    console.log("Input a correct password...")
                    passwordField.errorMessage = "Incorrect password. Make sure you enter the correct password";
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
    // borderWidth: 1
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
    height: hp('45%'),
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
  },
  forgotButton: {
    position: "absolute",
    bottom: 14
  }
});


export default LogIn;