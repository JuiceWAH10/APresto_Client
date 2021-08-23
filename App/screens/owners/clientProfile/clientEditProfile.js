import React, {useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


function clientEditProfile(props) {
    const navigation = useNavigation();

    const [shopName, setTextShopName] = React.useState('');
    const [shopDetails, setTextShopDetails] = React.useState('');
    const [address, setTextAddress] = React.useState('');
    const [contactNo, setTextContactNo] = React.useState('');
    const [tags, setTextTags] = React.useState('');
    const [email, setTextEmail] = React.useState('');
    const [password, setTextPassword] = React.useState('');
    const [passwordReentry, setTextPasswordReentry] = React.useState('');

    return (
        <SafeAreaView style={styles.droidSafeArea}>       
            <View style={[styles.topContainer, {flex:1}]}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#fd4140" />
                </TouchableOpacity>    
            </View>
            <View style={[styles.formContainer, {flex:15}]}>          
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Update infos about your shop.</Text>
                <ScrollView style={styles.form}>
                    <Text style={styles.formTitles}>Shop Information</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Shop Name"
                            onChangeText={text => setTextShopName(text)}
                            value={shopName}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Shop Details"
                            multiline={true}
                            scrollEnabled={true}
                            onChangeText={text => setTextShopDetails(text)}
                            value={shopDetails}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            placeholder="Address"
                            onChangeText={text => setTextAddress(text)}
                            value={address}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            placeholder="Contact Number"
                            onChangeText={text => setTextContactNo(text)}
                            value={contactNo}
                            keyboardType="numeric"
                        />
                    </View>

                    <Text style={styles.formTitles}>Account Information</Text>

                    <View style={styles.textView}>
                        <Input
                            //Email input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            placeholder="Email"
                            onChangeText={(text) => setTextEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            //secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={(text) => setTextPassword(text)}
                            value={password}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Re-enter password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            //secureTextEntry={true}
                            placeholder="Re-enter Password"
                            onChangeText={(text) => setTextPasswordReentry(text)}
                            value={passwordReentry}
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
export default clientEditProfile;