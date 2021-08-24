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

import AllCartItem from './././importShopItems/allCartItem';
import * as cartAction from '../../../functions/cartFunction';

function shopItemsCart(props) {
    const navigation = useNavigation();

    //(juswa) fetch data from redux store in App.js using useSelector. the data is from the state managed by reducers
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        //(juswa) cart items are placed in array to be more manageable
        const cartItemsArray = [];
        for (const key in state.cart.items){
            cartItemsArray.push({
                product_ID: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                total: state.cart.items[key].total
            });
        }
        return cartItemsArray.sort((a,b) => a.product_ID > b.product_ID ? 1 : -1);
    });

    const dispatch = useDispatch();
    
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>

                <View style={styles.topNavRight}>
                    <TouchableOpacity style={styles.topNavRightButton} onPress={() => {dispatch(cartAction.clearCart())}}>
                        <Text style={styles.topNavRightText}>Clear Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* End of Top Navigation */}
            
            <View style={[styles.formContainer, {flex:15}]}>
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/cart_Banner.jpg')}>
                    <View style={styles.bannerDarken}>
                        <Text style={styles.bannerLabel}>Reward Points will be added once transaction's done!</Text>
                        <Text style={styles.bannerLabelSmall}>Everytime you spent on products you love gives you rewards point.</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                <FlatList style ={styles.cartContainer}
                    data={cartItems}
                    keyExtractor={item => item.product_ID}
                    renderItem={itemData => 
                        <AllCartItem
                            quantity = {itemData.item.quantity} 
                            product_Name = {itemData.item.productTitle}
                            price = {itemData.item.total.toFixed(2)}
                            removeFromCart = {() => {
                                dispatch(cartAction.removeFromCart(itemData.item.product_ID))
                            }}
                            addToCart = {() => {dispatch(cartAction.addToCart(itemData.item))}}
                        />}
                />

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerLabelSmall}>Total Amount</Text>
                        <Text style={styles.footerLabel}>Php{totalAmount.toFixed()}</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        disabled={cartItems.length === 0}
                        onPress={() => 
                            navigation.navigate('shopItemsQR', {
                                cartItems, 
                                totalAmount
                            }
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
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.5)',
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
        backgroundColor: '#ee4b43',
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
        height: 30,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    topNavRight: {
        flexDirection: "row",
        // justifyContent: "space-between",
        height: 20,
        width: 100,
        marginRight: 15,
        // paddingTop: 5,
    },   
    topNavRightButton: {
        backgroundColor: '#ee4b43',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginTop: 10,
        width: 100,
        height: 30,
    }, 
    topNavRightText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
    },
})
export default shopItemsCart;