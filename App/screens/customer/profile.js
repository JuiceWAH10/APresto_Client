import React from 'react';
import { Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { auth } from "firebase";
import { useNavigation } from '@react-navigation/native';


function profile(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Header */}
            <ImageBackground style={styles.profileBgImage}
                    source={require('../../assets/images/orange_Header.jpg')}>
                <View style={styles.profileDarken}>
                    <Image style={styles.profileProfileImage}
                        source={require('../../assets/Store.jpg')}>
                    </Image>
                    <Text style={styles.profileUsername}>Username</Text>
                    <Text style={styles.profileFullname}>Full Name</Text>
                    <View style={styles.profileButtonContainer}>
                        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('customerEditProfile')} >
                            <Icon name="user" size={20} color="#fff" />
                            <Text style={styles.profileButtonLabel}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileButton} onPress={() => {auth().signOut();}} >
                            <Icon name="logout" size={20} color="#fff" />
                            <Text style={styles.profileButtonLabel}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </ImageBackground>
            {/* End of Header */}

            <ScrollView style={[styles.container, {flex:1}]}>
                {/* For last transaction */}
                <ImageBackground style={styles.transactBannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/cart_Banner.jpg')}>
                    <View style={styles.transactBannerDarken}>
                        <Text style={styles.transactBannerLabel}>You visited the Shop!</Text>
                            <Text style={styles.transactBannerLabelSmall}>Earned 100 reward points.</Text>
                    </View>    
                </ImageBackground>
                {/* End of last transaction */}

                {/* Under development */}
                {/* Insert Code here for infos of the Customers */}
                {/* Additional ideas needed here */}
                
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/cart_Banner2.jpg')}>
                    <View style={styles.bannerDarken}>
                        <Text style={styles.bannerLabel}>The more you spend the more you enjoy!</Text>
                        <Text style={styles.bannerLabelSmall}>Everytime you spent on products you love gives you rewards point.</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}
                
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 50,
        height: 150,
        width: wp('90%'),
    },
    bannerDarken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.2)',
        // borderRadius: 30,
    },
    bannerLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    button: {
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: 100,
        height: 35,
    },
    buttonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width: '60%',
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 12
    },
    container: {
        flexDirection: "column",
        width: wp('100%'),
        // borderWidth: 1
    },   
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.15)',
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
    },
    profileBgImage: {
        alignSelf: "center",
        marginBottom: 5,
        height: 280,
        width: wp('100%'),
    },
    profileButton: {
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: 100,
        height: 35,
    },
    profileButtonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width: '60%',
    },
    profileButtonLabel: {
        color: "#fff",
        fontSize: 12
    },
    profileDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        // borderRadius: 30,
    },
    profileFullname: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileUsername: {
        textAlign: "center",
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileProfileImage:{
        alignSelf: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#ee4b43",
    },
    profileShopName: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    titleTransact: {
        textAlign: "center",
        marginLeft: 3,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    titleTransactContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        marginTop: 10,
        width: wp('90%'),
    },
    transactBannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 15,
        height: 70,
        width: wp('90%'),
    },
    transactBannerDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 30,
    },
    transactBannerLabel: {
        textAlign: "center",
        marginTop: 10,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    transactBannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    titleAllItems: {
        alignSelf: "center",
        marginLeft: 3,
        marginTop: 8,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "bold"
    },    
})

export default profile;