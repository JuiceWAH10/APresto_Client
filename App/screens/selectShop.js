import React, {useState, useEffect, useContext} from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';
import { AuthContext } from '../functions/authProvider';

import SelectShopItems from './owners/selectShopItems';

function selectShop(props) {

    const [storeList, setStoreList] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const uID = user.uid;
        console.log(uID);
        firebase.firestore()
            .collection('Stores')
            .where("owner_ID", "==", uID)
            .onSnapshot(result => {
                const st = [];
                result.forEach(function (store){         
                    st.push(store.data());
                });
                console.log(st);
                setStoreList(st);
            });
    }, []);

    return (
        <ImageBackground
          style={styles.BGImage}
          source={require('../assets/images/splashScreenDark.jpg')}>
            <SafeAreaView style={styles.droidSafeArea}>
                <View style={styles.LogoContainer}>
                    <Image 
                        style={styles.Logo}
                        source={require('../assets/images/client_logo.png')} 
                    />
                    <Text style={{color: '#fff', fontSize: 18, fontWeight: "bold", marginTop: 10}}>Select Shop</Text>
                </View>

                <ScrollView>
                    {storeList.map((store, key) => {
                        return(
                            <SelectShopItems
                                key = {key}
                                store_ID = {store.store_ID}
                                owner_ID = {store.owner_ID}
                                store_Name = {store.store_Name}
                                address = {store.address}
                                specialty = {store.specialty}
                                imgLink = {store.imgLink}
                                ptsPerAmount = {store.ptsPerAmount}
                                contact_Number = {store.contact_Number}
                            />
                        )
                    })
                    }
                </ScrollView>

            </SafeAreaView>    
        </ImageBackground>
       
    );
}

const styles = StyleSheet.create({
    BGImage: {
        flex: 1,
        justifyContent: 'flex-start',
      },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0
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
        height: hp('20%'),
        // paddingTop: hp('15%'),
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10  
      },
      shopContainer: {
        alignSelf: "center",
        backgroundColor: "#071964",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 15,
        height: 100,
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
    shopContainerLabel: {
        marginTop: 12,
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    shopContainerLabelSmall: {
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    shopIcon: {
        marginTop: 23,
    },
    shopWrap: {
        alignSelf: "center",
        flexDirection: "row", 
        height: 65,  
    },


})
export default selectShop;