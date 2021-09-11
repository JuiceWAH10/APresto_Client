import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import validator from "validator";
import firebase, { auth } from "firebase";
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";


//validation function of email
const validateFields = (email, password, firstname, lastname, address, contact, username) => {
    const isValid = {
        firstname: validator.matches(firstname, "^[a-z A-Z]+$"),
        lastname: validator.matches(lastname, "^[a-z A-Z]+$"),
        address: validator.matches(address, "^[0-9 a-z A-Z \.\,\-]+$"),
        contact: validator.isMobilePhone(contact),
        username: validator.matches(username, "^[0-9a-z\_]{1,15}$"),
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

//sign up function to create user/ CREATE ACCOUNT FUNCTION
const createAccount = (email, password, firstname, lastname, address, contact, username) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            console.log("Creating user...");   
            firebase.firestore().collection("users").doc(user.uid).set({
                firstname,
                lastname,
                address,
                contact,
                username,
                email
            });
        })
        .catch(() => {
            showMessage({
                message: "Account already exist",
                description: "Please enter a new email address",
                type: "warning",
                position: "bottom",
                floating: "true",
                icon: { icon: "auto", position: "left" },
                autoHide:"true", 
                duration: 1000,
            });
            console.log("Invalid email");
        })
};

function signupCustomer(props) {
    const navigation = useNavigation();

    //First name var
    const [firstnameField, setFirstnameField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Last name var
    const [lastnameField, setLastnameField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Address var
    const [addressField, setAddressField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Contact var
    const [contactField, setContactField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Username var
    const [usernameField, setUsernameField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Email var
    const [emailField, setEmailField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Password var
    const [passwordField, setPasswordField] = useState({
        text: "", 
        errorMessage: "",
    });

    //Re-enter password var
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "", 
        errorMessage: "",
    });

    return (
        <SafeAreaView style={styles.droidSafeArea}>       
            <View style={[styles.topContainer, {flex:1}]}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#fd4140" />
                </TouchableOpacity>    
            </View>
            <View style={[styles.formContainer, {flex:15}]}>          
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Provide the needed information to continue.</Text>
                <ScrollView style={styles.form}>
                    <Text style={styles.formTitles}>Basic Information</Text>
                    <View style={styles.textView}>
                        <Input
                            //First Name input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="First Name"
                            text={firstnameField.text}
                            onChangeText={(text) => {setFirstnameField({text});}}
                            errorMessage={firstnameField.errorMessage}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Last Name input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Last Name"
                            text={lastnameField.text}
                            onChangeText={(text) => {setLastnameField({text});}}
                            errorMessage={lastnameField.errorMessage}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Address input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            placeholder="Address"
                            text={addressField.text}
                            onChangeText={(text) => {setAddressField({text});}}
                            errorMessage={addressField.errorMessage}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Contact input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            placeholder="Contact Number"
                            text={contactField.text}
                            onChangeText={(text) => {setContactField({text});}}
                            errorMessage={contactField.errorMessage}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.formTitles}>Account Information</Text>
                    <View style={styles.textView}>
                        <Input
                            //Username input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            placeholder="Username"
                            text={usernameField.text}
                            onChangeText={(text) => {setUsernameField({text});}}
                            errorMessage={usernameField.errorMessage}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Email input
                            style={styles.input}
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
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Password"
                            text={passwordField.text}
                            onChangeText={(text) => {setPasswordField({text});}}
                            errorMessage={passwordField.errorMessage}
                            autoCompleteType="password"
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Re-enter password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Re-enter Password"
                            text={passwordReentryField.text}
                            onChangeText={(text) => {setPasswordReentryField({text});}}
                            errorMessage={passwordReentryField.errorMessage}
                        />
                    </View>
                    
                </ScrollView>
                {/* Navigation isn't final */}
                
                {/*CONTINUE BUTTON AND ERROR MESSAGES*/}
                <TouchableOpacity style={styles.button} onPress={() => {
                    const isValid = validateFields(emailField.text, passwordField.text, firstnameField.text, lastnameField.text, addressField.text, contactField.text, usernameField.text);

                    let isAllValid = true;

                    if(!isValid.firstname){
                        console.log("Input a valid firstname...")
                        firstnameField.errorMessage = "Please enter your firstname";
                        setFirstnameField({...firstnameField});
                        isAllValid = false;
                    }

                    if(!isValid.lastname){
                        console.log("Input a valid lastname...")
                        lastnameField.errorMessage = "Please enter your lastname";
                        setLastnameField({...lastnameField});
                        isAllValid = false;
                    }

                    if(!isValid.address){
                        console.log("Input a valid address...")
                        addressField.errorMessage = "Please enter a valid address";
                        setAddressField({...addressField});
                        isAllValid = false;
                    }

                    if(!isValid.contact){
                        console.log("Input a valid number...")
                        contactField.errorMessage = "Please enter a valid contact number";
                        setContactField({...contactField});
                        isAllValid = false;
                    }

                    if(!isValid.username){
                        console.log("Input a valid username...")
                        usernameField.errorMessage = "Username must be in lowercase with at least (15) fifteen characters and do not contain a space or symbol";
                        setUsernameField({...usernameField});
                        isAllValid = false;
                    }

                    if(!isValid.email){
                        console.log("Input a valid email...")
                        emailField.errorMessage = "Please enter a valid email";
                        setEmailField({...emailField});
                        isAllValid = false;
                    }
                    
                    if(!isValid.password){
                        console.log("Input a strong password...")
                        passwordField.errorMessage = "Password must be at least (8) eight characters long with an uppercase, lowercase, number and symbol";
                        setPasswordField({...passwordField});
                        isAllValid = false;
                    }

                    if(passwordReentryField.text != passwordField.text){
                        console.log("Password didn't match...")
                        passwordReentryField.errorMessage="Password did not match"
                        setPasswordReentryField({...passwordReentryField});
                        isAllValid = false;
                    }

                    //IF ALL INPUTS ARE VALID THIS IS WILL CREATE ACCOUNT FUNCTION 
                    if(isAllValid){
                        createAccount(emailField.text, passwordField.text, firstnameField.text, lastnameField.text, addressField.text, contactField.text, usernameField.text);
                        //props.navigation.navigate('login');                   
                    }

                }}>
                    <Text style={styles.buttonLabel}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>

    );
}

{/*props.navigation.navigate('login')  --- NOT USED*/}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fd4140',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '80%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    droidSafeArea: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    form: {
        width: wp('90%'),
    },
    formContainer: {
        alignItems: "center",
        borderRadius: 4,
        flex: 1,
        padding: 20,
    },
    formTitles: {
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        height: 50,
        width: wp('80%'),
        paddingLeft: 10,
        fontSize: 16,
        justifyContent: "space-between"
        // borderWidth: 1,
        // backgroundColor: "#fff",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: hp('5%'),
        fontSize: 12,
    },
    textView: {
        width: wp('90%'),
        alignItems: 'center'
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    topContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: hp('10%'),
        width: wp('95%'),
    },
})

export default signupCustomer;