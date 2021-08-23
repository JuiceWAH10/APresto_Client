import React from 'react';
import { 
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View, 
    LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { auth } from "firebase";
LogBox.ignoreAllLogs();// Ignore all Logs! Remove this when coding
import * as crud from '../../functions/firebaseCRUD';


function clientHomepage(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* <Text style={styles.title}>APresto Shop</Text> */}
            <View style={styles.title}>
                <Image style={styles.logoHeader} 
                source={require('../../assets/images/clientHeader.png')}/>
            </View>
            <ScrollView style={styles.container}>
                {/* Profile Header for Shops */}
                <ImageBackground style={styles.profileBgImage}
                    source={require('../../assets/Liked_Shop.jpg')}>

                    <View style={styles.profileDarken}>
                        {/* Profile Informations */}
                        <Text style={styles.profileShopName}>Scrapyard Café & Restaurant</Text>
                        <Text style={styles.profileLabelSmall}>Followers 478</Text>
                        <View style={styles.profileButtonContainer}>
                            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('clientEditProfile')} >
                                <Icon name="user" size={20} color="#fff" />
                                <Text style={styles.profileButtonLabel}>Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileButton} onPress={() => {auth().signOut();}} >
                                <Icon name="logout" size={20} color="#fff" />
                                <Text style={styles.profileButtonLabel}>Log Out</Text>
                            </TouchableOpacity>
                        {/* End of Profile Informations */}
                        </View>

                       
                    </View>    
                </ImageBackground>
                {/* End of Profile Header */}

                 {/* Rate, Suki, Shopped, Claimed */}
                 <View style={styles.profileDetails}>
                    <View style={styles.dualTitleWrap}>
                        <View style={styles.dualTitleContainer}>
                            <Icon name="gift" size={25} color="#1a9d43" />
                            <Text style={styles.dualTitle}> Shop Summary</Text>
                        </View>
                        <View style={styles.dualTitleContainer}>
                            <Text style={styles.dualTitleSmall}> View Full Report</Text>
                            <Icon style={styles.dualTitleSmallIcon} name="right" size={20} />
                        </View>
                    </View>    
                    <ScrollView horizontal={true} style={styles.profileInfosContainer}>
                                <View style={styles.profileInfo1}>
                                    <Text style={styles.profileInfoTextLabelBig}> 4.5 </Text> 
                                    <View style={styles.profileInfoLabel} >
                                        {/* <Icon name="star" size={15} color="#fff" /> */}
                                        <Text style={styles.profileInfoTextLabel}>Rate</Text>
                                    </View>   
                                </View>
                                <View style={styles.profileInfo2}>
                                    <Text style={styles.profileInfoTextLabelBig}> 200 </Text>
                                    <View style={styles.profileInfoLabel} >
                                        {/* <Icon name="smileo" size={15} color="#fff" /> */}
                                        <Text style={styles.profileInfoTextLabel}>My Suki</Text>
                                    </View>    
                                </View>
                                <View style={styles.profileInfo3}>
                                <Text style={styles.profileInfoTextLabelBig}> 389 </Text>
                                    <View style={styles.profileInfoLabel} >
                                        {/* <Icon name="shoppingcart" size={15} color="#fff" /> */}
                                        <Text style={styles.profileInfoTextLabel}>Shopped</Text>
                                    </View>    
                                </View>
                                <View style={styles.profileInfo4}>
                                    <Text style={styles.profileInfoTextLabelBig}> 67 </Text>
                                    <View style={styles.profileInfoLabel} >
                                        {/* <Icon name="gift" size={15} color="#fff" /> */}
                                        <Text style={styles.profileInfoTextLabel}>Claimed</Text>
                                    </View>    
                                </View>
                            </ScrollView>
                        </View>    
                        {/* End of Rate, Suki, Shopped, Claimed */}

                {/* QR code Scanner */}
                <TouchableOpacity onPress={()=> props.navigation.navigate('QRCodeScanner')}>
                    <View style={styles.scanQRContainer}>
                        <View style={styles.scanQRWrap}>
                            <Icon name="qrcode" size={45} color="#fff" style={styles.scanQRIcon} />
                            <View>
                                <Text style={styles.scanQRContainerLabel}>Scan QR Code</Text>
                                <Text style={styles.scanQRContainerLabelSmall}>Scan QR code provided by customers.</Text>
                            </View>
                        </View>        
                    </View>
                </TouchableOpacity>    
                {/* End of QR Code Scanner */}

                {/* APresto Products */}
                <View style={styles.dualShadow}>
                    <View style={styles.dualTitleContainer}>
                        <Icon name="shoppingcart" size={25} color="#d74f0d" />
                        <Text style={styles.dualTitle}> APresto Products</Text>
                    </View>
                    <View style={styles.dual}>
                        <TouchableOpacity onPress={() => navigation.navigate('clientProductList')}>
                            <View style={styles.dualContent}>
                                <ImageBackground style={styles.dualBgImage}
                                    imageStyle={{ borderRadius: 30}}
                                    source={require('../../assets/dualImages/my_Products.jpg')}>
                                    <View style={styles.darken}> 
                                        <Text style={styles.dualLabel}>My Products</Text>
                                        <Text style={styles.dualLabelSmall}>View all products</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('clientProductAdd')}>
                            <View style={styles.dualContent}>
                                <ImageBackground style={styles.dualBgImage}
                                    imageStyle={{ borderRadius: 30}}
                                    source={require('../../assets/dualImages/add_Products.jpg')}>
                                    <View style={styles.darken}>
                                        <Text style={styles.dualLabel}>Add Product</Text>
                                        <Text style={styles.dualLabelSmall}>New product? Add it</Text>
                                    </View>    
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>    
                {/* End of APresto Products */}

                {/* APresto Rewards */}
                <View style={styles.dualShadow}>
                    <View style={styles.dualTitleContainer}>
                        <Icon name="gift" size={25} color="#25adab" />
                        <Text style={styles.dualTitle}> APresto Rewards</Text>
                    </View>
                    <View style={styles.dual}>
                        <TouchableOpacity onPress={()=>navigation.navigate('clientRewardList')}>
                            <View style={styles.dualContent}>
                                <ImageBackground style={styles.dualBgImage}
                                    imageStyle={{ borderRadius: 30}}
                                    source={require('../../assets/dualImages/my_Rewards.jpg')}>
                                    <View style={styles.darken}> 
                                        <Text style={styles.dualLabel}>My Rewards</Text>
                                        <Text style={styles.dualLabelSmall}>View all rewards</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('clientRewardAdd')}>
                            <View style={styles.dualContent}>
                                <ImageBackground style={styles.dualBgImage}
                                    imageStyle={{ borderRadius: 30}}
                                    source={require('../../assets/dualImages/add_Rewards.jpg')}>
                                    <View style={styles.darken}>
                                        <Text style={styles.dualLabel}>Add Rewards</Text>
                                        <Text style={styles.dualLabelSmall}>New reward? Add it</Text>
                                    </View>    
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>    
                {/* End of APresto Rewards */}

                {/* My Suki */}
                <View style={styles.dualShadow}>
                    <View style={styles.dualTitleContainer}>
                        <Icon name="smileo" size={25} color="#37375e" />
                        <Text style={styles.dualTitle}> My Suki</Text>
                    </View>
                    <ImageBackground style={styles.sukiBgImage}
                        imageStyle={{ borderRadius: 30}}
                        source={require('../../assets/bannerImages/banner_Suki.jpg')}>
                        <View style={styles.sukiDarken}>
                            <Text style={styles.sukiLabel}>Sukis are essential for your business growth</Text>
                            <Text style={styles.sukiLabelSmall}>You can know who among your suki loves you most.</Text>
                            <TouchableOpacity style={styles.sukiButton} onPress={() => navigation.navigate('clientSukiList')} >
                                <Text style={styles.sukiButtonLabel}>View Suki</Text>
                            </TouchableOpacity>
                        </View>    
                    </ImageBackground>
                </View>    
                {/* End of My Suki */}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 5,
        height: 150,
        width: wp('90%'),
    },
    bannerDarken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.15)',
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
    container:{
        alignSelf: "center",
        width: wp('100%')
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        backgroundColor: "#fff"
    },
    dual: {
        alignSelf: "center",  
        justifyContent: "space-between",
        flexDirection: "row",
        height: 180,
        width: wp('90%'),
    },
    dualContent: {
        borderRadius: 30,
        height: 180,
        width: wp('44%'),
    },
    dualBgImage: {
        flexDirection: "row",
        borderRadius: 30,
        height: 180,
        width: wp('44%'),
    },
    dualLabel: {
        textAlign: "left",
        marginLeft: 18,
        marginTop: 120,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    dualLabelSmall: {
        textAlign: "left",
        marginLeft: 20,
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
    },
    dualTitle: {
        textAlign: "left",
        marginLeft: 10,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold"
    },
    dualTitleContainer: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: wp('5%'),
    },
    dualTitleSmall: {
        fontSize: 12,
        opacity: .5,
        marginTop: 5,
        marginRight: 2
    },
    dualTitleSmallIcon: {
        opacity: .5,
        marginTop: 3
    },
    dualTitleWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp('100%'),
        paddingRight: wp('5%')
    },
    dualContainer: {
        flexDirection: "row"
    },
    dualShadow: {
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.15)',
        // borderRadius: 30,
    },
    logoHeader: {
        height: 60,
        width: wp('100%'),
        resizeMode: 'contain'
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
        fontWeight: "bold"
    },
    profileBgImage: {
        alignSelf: "center",
        marginBottom: 5,
        height: 200,
        width: wp('100%'),
    },
    profileButton: {
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 30,
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
    },
    profileDetails: {
        marginTop: 5,
        marginBottom: 5,
        height: 120,
        paddingTop: 10,
        paddingBottom: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    profileInfo1:{
        width: 75,
        borderRadius: 35,
        borderWidth:1,
        borderColor: "#fff",
        backgroundColor: "#37375e",
        marginRight:2,
        marginLeft: 2
    },
    profileInfo2:{
        width: 75,
        borderRadius: 35,
        borderWidth:1,
        borderColor: "#fff",
        backgroundColor: "#375e43",
        marginRight:2,
        marginLeft: 2
    },
    profileInfo3:{
        width: 75,
        borderRadius: 35,
        borderWidth:1,
        borderColor: "#fff",
        backgroundColor: "#fd6d48",
        marginRight:2,
        marginLeft: 2
    },
    profileInfo4:{
        width: 75,
        borderRadius: 35,
        borderWidth:1,
        borderColor: "#fff",
        backgroundColor: "#0d606b",
        marginRight:2,
        marginLeft: 2
    },
    profileInfosContainer: {
        alignSelf: "center",
        flexDirection: "row",
        width: wp('90%'),
    },
    profileInfoLabel:{
        alignSelf: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        height: 35,
    },
    profileInfoTextLabelBig:{
        alignSelf: 'center',
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10
        
    },
    profileInfoTextLabel:{
        color: "#fff",
        fontSize: 12,
        marginLeft: 3
    },
    profileShopName: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 24,
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
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#ee4b43",
        paddingTop: 4,

        backgroundColor: 'white',
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
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
    scanQRContainer: {
        alignSelf: "center",
        backgroundColor: "#ee4b43",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 15,
        height: 65,
        width: wp('90%'),

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    scanQRContainerLabel: {
        marginTop: 10,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    scanQRContainerLabelSmall: {
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    scanQRIcon: {
        marginTop: 10,
    },
    scanQRWrap: {
        alignSelf: "center",
        flexDirection: "row", 
        height: 65,  
    },
    sukiBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 5,
        height: 180,
        width: wp('90%'),
    },
    sukiDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 30,
    },
    sukiLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    sukiLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    sukiButton: {
        alignSelf: "center",
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 15,
        width: 110,
        height: 35,
    },
    sukiButtonLabel: {
        color: "#fff",
        fontSize: 12
    },
})
export default clientHomepage;