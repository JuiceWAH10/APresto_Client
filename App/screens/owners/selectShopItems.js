import React, {useContext} from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { StoreContext } from '../../functions/storeProvider';

function SelectShopItems(props){
    const navigation = useNavigation();
    const {store, setStore} = useContext(StoreContext);
    function navigateToHome(){
        setStore( 
            {
                store_ID: props.store_ID,
                owner_ID: props.owner_ID,
                store_Name: props.store_Name,
                address: props.address,
                specialty: props.specialty,
                imgLink: props.imgLink,
                ptsPerAmount: props.ptsPerAmount,
                contact_Number: props.contact_Number
            }
        );
        console.log(store);
        navigation.navigate('clientHomepage')
    }
    return(
        <View>
        <TouchableOpacity 
            onPress={navigateToHome}>
            <View style={styles.shopContainer}>
                <View style={styles.shopWrap}>
                    <Icon name="home" size={45} color="#fff" style={styles.shopIcon} />
                    <View>
                        <Text style={styles.shopContainerLabel}>{props.store_Name}</Text>
                        <Text style={styles.shopContainerLabelSmall}>{props.specialty}</Text>
                        <Text style={styles.shopContainerLabelSmall}>Manage your own shop.</Text>
                    </View>
                </View>        
            </View>
        </TouchableOpacity>
        </View>
    )
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

export default SelectShopItems;