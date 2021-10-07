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

import CartItems from './cartItems';
import * as cartAction from '../functions/cartFunction';
import * as rewardCart from '../functions/rewardsCartFunction';

import * as crud from '../functions/firebaseCRUD';

function checkoutPage(props) {
    const navigation = useNavigation();
    const {customer_ID, suki_ID, username, sukiPoints, store_ID} = props.route.params;

    const ptsPerPrice = 50;
    const dispatch = useDispatch();
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
                total: state.cart.items[key].total,
                imgLink: state.cart.items[key].imgLink,
                type: state.cart.items[key].type
            });
        }
        return cartItemsArray.sort((a,b) => a.product_ID > b.product_ID ? 1 : -1);
    });


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
                total: state.rewCart.rewItems[key].total,
                imgLink: state.rewCart.rewItems[key].imgLink,
                type: state.rewCart.rewItems[key].type
            });
        }
        return rewCartItemsArray.sort((a,b) => a.reward_ID > b.reward_ID ? 1 : -1);
    });

    function proceed(totalAmount, ptsDeduct, purchasedProducts, redeemedRewards){
        dispatch(cartAction.clearCart());
        dispatch(rewardCart.clearCart());
        var ptsEarned;
        //if may account -> if totalamt < ptsPerAmount then totalamt / ptsPerAmt else ptsPerAmt/totalamt; else no account customer_ID guest
        // for rounding off Math.round((num + Number.EPSILON) * 100) / 100
        
        //incomplete need to verify if customer has an account or non
        if(totalAmount != 0){
            if(customer_ID != "Guest"){
                if(totalAmount > ptsPerPrice){
                    ptsEarned = totalAmount / ptsPerPrice;
                } 
                else {
                    ptsEarned = ptsPerPrice / totalAmount;
                }
                ptsEarned = Math.round((ptsEarned + Number.EPSILON)*100)/100;
            }
        }
        else{
            ptsEarned = 0;
        }

    const {customer_ID, suki_ID, username, sukiPoints, store_ID} = props.route.params;
    var trans_ID = crud.recordTransaction(customer_ID, suki_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards, store_ID);
        navigation.navigate('Done', {
            customer_ID: customer_ID,
            totalAmount: totalAmount,
            ptsEarned: ptsEarned,
            ptsDeduct: ptsDeduct,
            purchasedProducts:purchasedProducts,
            redeemedRewards: redeemedRewards
        });
    }

    
    
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

                <FlatList style ={styles.cartContainer}
                    ListHeaderComponent={<Text>Products</Text>}
                    data={cartItems}
                    keyExtractor={item => item.product_ID}
                    renderItem={itemData => 
                        <CartItems
                            type = {itemData.item.type}
                            quantity = {itemData.item.quantity} 
                            product_Name = {itemData.item.productTitle}
                            price = {itemData.item.productPrice.toFixed(2)}
                            total = {itemData.item.total.toFixed(2)}
                            imgLink= {itemData.item.imgLink}
                            removeFromCart = {() => {
                                dispatch(cartAction.removeFromCart(itemData.item.product_ID))
                            }}
                            addToCart = {() => {dispatch(cartAction.addToCart(itemData.item))}}
                        />}
                />

                {rewCartItems ?
                    <FlatList style ={styles.cartContainer}
                        ListHeaderComponent={<Text>Rewards</Text>}
                        data={rewCartItems}
                        keyExtractor={item => item.reward_ID}
                        renderItem={itemData => 
                            <CartItems
                                type = {itemData.item.type}
                                quantity = {itemData.item.quantity}
                                product_Name = {itemData.item.productTitle}
                                price = {itemData.item.productPrice.toFixed(2)}
                                total = {itemData.item.total.toFixed(2)}
                                imgLink= {itemData.item.imgLink}
                                removeFromCart = {() => {
                                    dispatch(rewardCart.cancelRedeem(itemData.item.reward_ID))
                                }}
                                addToCart = {() => {dispatch(rewardCart.redeemToCart(itemData.item))}}
                            />}
                    />
                : null }
                
                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerLabelSmall}>Total Amount</Text>
                        <Text style={styles.footerLabel}>Php{totalAmount.toFixed(2)}</Text>
                        
                    </View>

                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerLabelSmall}>Total Points Spent</Text>
                        <Text style={styles.footerLabel}>{totalPoints.toFixed(2)} Pts</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        disabled={cartItems.length === 0 && rewCartItems.length === 0}
                        onPress={() => proceed(totalAmount, totalPoints, cartItems, rewCartItems)} 
                    >
                        <Text style={styles.buttonLabel}>Proceed</Text>
                    </TouchableOpacity>
                </View>
                {/* End of Footer */}
            </View>
            
        </SafeAreaView>

    );
}

{/*navigation.navigate('shopItemsQR', {
                                cartItems, 
                                totalAmount
                            }
                        )*/}

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
        fontSize: 14,
        fontWeight: "bold",
    },
    footerLabelSmall: {
        textAlign: "center",
        fontSize: 8,
    },
    footerTextContainer:{
        alignContent: "center"
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
export default checkoutPage;