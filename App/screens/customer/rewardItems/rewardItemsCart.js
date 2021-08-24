import React from 'react';
import { 
    ImageBackground,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux';

import AllCartItem from '../shopItems/importShopItems/allCartItem';

import * as rewCartFunction from '../../../functions/rewardsCartFunction';

function rewardItemsCart(props) {
    const navigation = useNavigation();

    const totalPoints = useSelector(state => state.rewCart.totalPoints);
    const rewCartItems = useSelector(state => {
        //(juswa) cart items are placed in array to be more manageable
        const rewCartItemsArray = [];
        for (const key in state.rewCart.rewItems){
            rewCartItemsArray.push({
                reward_ID: key,
                productTitle: state.rewCart.rewItems[key].productTitle,
                productPrice: state.rewCart.rewItems[key].productPrice,
                quantity: state.rewCart.rewItems[key].quantity,
                total: state.rewCart.rewItems[key].total
            });
        }
        return rewCartItemsArray.sort((a,b) => a.reward_ID > b.reward_ID ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.droidSafeArea}>  
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
            </View>

            <View style={styles.topNavRight}>
                <TouchableOpacity style={styles.topNavRightButton} onPress={() => {dispatch(rewCartFunction.clearCart())}}>
                    <Text style={styles.topNavRightText}>Clear Cart</Text>
                </TouchableOpacity>
            </View>

            {/* End of Navigation */}

            <View style={[styles.formContainer, {flex:15}]}>
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/cart_Banner2.jpg')}>
                    <View style={styles.bannerDarken}>
                        <Text style={styles.bannerLabel}>Shop more! For every items has corresponding points!</Text>
                        <Text style={styles.bannerLabelSmall}>Everytime you spent on products you love gives you rewards point.</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                <FlatList style ={styles.cartContainer}
                    data={rewCartItems}
                    keyExtractor={item => item.reward_ID}
                    renderItem={itemData => 
                        <AllCartItem
                            quantity = {itemData.item.quantity} 
                            product_Name = {itemData.item.productTitle}
                            price = {itemData.item.productPrice.toFixed(2)}
                            removeFromCart = {() => {
                                dispatch(rewCartFunction.cancelRedeem(itemData.item.reward_ID))
                            }}
                        />}
                />

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerLabelSmall}>Total Points</Text>
                        <Text style={styles.footerLabel}>{totalPoints.toFixed()}Pts</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => 
                            navigation.navigate(
                                'rewardItemsQR', 
                                {rewCartItems, totalPoints}
                            )
                           
                        } 
                    >
                        <Text style={styles.buttonLabel}>Generate QR Code</Text>
                    </TouchableOpacity>
                </View>
                {/* End of Footer */}
            </View>
            
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 18,
        marginBottom: 10,
        height: 150,
        width: wp('90%'),
    },
    bannerDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 30,
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
        backgroundColor: '#071964',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginTop: 10,
        width: '50%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    cartContainer: {
        alignSelf: "center",
        width: wp('90%')
    },
    droidSafeArea: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    footer:{
        alignSelf: "center",
        height: hp('6%'),
        width: wp('90%'),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footerLabel: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    footerLabelSmall: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 8,
    },
    footerTextContainer:{
        alignContent: "center",
        marginLeft: wp('5%')
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    titlePopular: {
        textAlign: "center",
        marginLeft: 3,
        marginTop: 8,
        fontSize: 20,
        fontWeight: "bold"
    },
    titlePopularContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        marginBottom: 15,
        marginTop: 15,
        width: wp('90%'),
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 20,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    topNavRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
        width: 60,
        marginRight: 15,
        paddingTop: 5,
    },
})

export default rewardItemsCart;