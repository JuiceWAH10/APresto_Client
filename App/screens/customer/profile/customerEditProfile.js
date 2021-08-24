import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function customerEditProfile(props) {
    const navigation = useNavigation();

    //below statements are not used
    const [firstName, setTextFN] = React.useState('');
    const [lastName, setTextLN] = React.useState('');
    const [address, setTextA] = React.useState('');
    const [contactNo, setTextCN] = React.useState('');
    const [userName, setTextUN] = React.useState('');
    //const [email, setTextE] = React.useState('');
    //const [password, setTextPW] = React.useState('');
    //const [retypePassword, setTextRPW] = React.useState('');

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

    //Re-enter password variables
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
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Edit infos about yourself.</Text>
                <ScrollView style={styles.form}>
                    <Text style={styles.formTitles}>Basic Information</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="First Name"
                            onChangeText={text => setTextFN(text)}
                            value={firstName}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Last Name"
                            onChangeText={text => setTextLN(text)}
                            value={lastName}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            placeholder="Address"
                            onChangeText={text => setTextA(text)}
                            value={address}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            placeholder="Contact Number"
                            onChangeText={text => setTextCN(text)}
                            value={contactNo}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.formTitles}>Account Information</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            placeholder="User Name"
                            onChangeText={text => setTextUN(text)}
                            value={userName}
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
                            //secureTextEntry={true}
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
                            //secureTextEntry={true}
                            placeholder="Re-enter Password"
                            text={passwordReentryField.text}
                            onChangeText={(text) => {setPasswordReentryField({text});}}
                            errorMessage={passwordReentryField.errorMessage}
                        />
                    </View>
                    
                </ScrollView>
                {/* Navigation isn't final */}
                
                {/*CONTINUE BUTTON AND ERROR MESSAGES*/}
                <TouchableOpacity style={styles.button} onPress={() => console.log("Profile Updated")}>
                    <Text style={styles.buttonLabel}>Update Information</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
}

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

export default customerEditProfile;