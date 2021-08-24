import React, { useRef } from 'react';
import { 
    Animated,
    ImageBackground,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View, 
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useDispatch, useSelector } from 'react-redux';

import PopularRewardItem from './././importRewardItems/popularRewardItem';
import AllRewardItem from './././importRewardItems/allRewardItem';

import * as rewCartFunction from '../../../functions/rewardsCartFunction';

function rewardItems(props) {
    const navigation = useNavigation();
    const {shop_ID, owner_ID, shopName, address, specialty} = props.route.params;

    const scrollPosition = useRef(new Animated.Value(0)).current;
    const minHeaderHeight = 0
    const maxHeaderHeight = 200

    const headerHeight = scrollPosition.interpolate({
        inputRange: [0, 500],
        outputRange: [maxHeaderHeight, minHeaderHeight],
        extrapolate: 'clamp',
    });
    const opacity = scrollPosition.interpolate({
        inputRange: [0, 100, 300],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp',
    });

    const dispatch = useDispatch();
    //(juswa) fetch data from redux store in App.js using useSelector. the data is from the state managed by reducers
    const getRewards = useSelector(state => state.rewards.allRewards);
    const rewards = getRewards.filter((rew) => {
        if(rew.shop_ID === shop_ID){
            return rew
        }      
    })

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <View style={styles.topNavRight}>
                    <TouchableOpacity onPress={() => "pressed"} >  
                        <Icon2 name="heart" size={25} color="#ee4b43" />
                    </TouchableOpacity>    
                    <TouchableOpacity onPress={() => navigation.navigate('rewardItemsCart')} > 
                        <Icon2 name="shoppingcart" size={25} color="#ee4b43" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* End of Top Navigation */}
            
            <View>
            <Animated.View
                style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    height: headerHeight,
                    backgroundColor: '#ee4b43',
                }}>

                {/* Header */}
                <Animated.View
                    style={{
                    textAlign: "center",
                    opacity: opacity,
                    }}>
                    <ImageBackground style={styles.headerBgImage}
                        source={require('../../../assets/DummyShop.jpg')}>
                        <View style={styles.darken}>
                            <Text style={styles.headerLabel}>{shopName}</Text>
                            <Text style={styles.headerLabelBig}>100 Points</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => "pressed"} >
                                    <Icon name="map" size={20} color="#fff" />
                                    <Text style={styles.buttonLabel}>Navigate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                    </ImageBackground>
                </Animated.View>
                {/* End of Header */}
            </Animated.View>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
                    {useNativeDriver: false},
                )}
                contentInsetAdjustmentBehavior="automatic"
                style={[styles.container]}>

                    {/* Popular Rewards */}
                    <View style={styles.popularItemsContainer}>
                        <View style={styles.popularItemsTitleContainer}>
                            {/* <Icon3 name="fire" size={40} color="#fd4140" /> */}
                            <Text style={styles.popularItemsTitle}>Popular Rewards</Text>
                        </View>
                        {/* Horizontal Scrollview for Popular Rewards */}
                        <FlatList 
                            horizontal={true} 
                            style={styles.popularItems} 
                            data={rewards}
                            keyExtractor={item => item.reward_ID}
                            renderItem={itemData =>
                                <PopularRewardItem
                                    reward_Name = {itemData.item.reward_Name}
                                    pointsReq = {itemData.item.pointsReq}
                                    definition = {itemData.item.definition}
                                    imgLink = {itemData.item.imgLink}
                                    redeemToCart = {() => {dispatch(rewCartFunction.redeemToCart(itemData.item))}}
                                />
                            }
                        />
                        {/* End of Horizonal Scrollview */}
                    </View>
                    {/* End of Popular Rewards */}

                    <Text style={styles.textInfo}>Do you like the products and rewards offered by this shop?
                     Follow them for them to know how you feel!</Text>

                    {/* All Rewards */}
                    <View style={styles.allItemsContainer}>
                        {/* List of all rewards !note that items in Popular Rewards is also included here* */}
                        <Text style={styles.allItemsTitle}>All Rewards</Text>
                            <FlatList
                                data={rewards}
                                keyExtractor={item => item.reward_ID}
                                renderItem={itemData => 
                                    <AllRewardItem 
                                        reward_Name = {itemData.item.reward_Name}
                                        pointsReq = {itemData.item.pointsReq}
                                        definition = {itemData.item.definition}
                                        imgLink = {itemData.item.imgLink}
                                        redeemToCart = {() => {dispatch(rewCartFunction.redeemToCart(itemData.item))}}
                                    />}
                            />
                        {/* End of List */}
                    </View>
                    {/* End of All Items */}

                    <Text style={styles.textInfoBottom}>Everytime you spent on products you love gives you rewards point.</Text>

                    {/* Banner */}
                    {/* <ImageBackground style={styles.bannerBgImage}
                        imageStyle={{ borderRadius: 30}}
                        source={require('../../../assets/bannerViolet.jpg')}>
                        <View style={styles.bannerDarken}>
                            <Text style={styles.bannerLabel}>The more you spend the more you enjoy!</Text>
                            <Text style={styles.bannerLabelSmall}>Everytime you spent on products you love gives you rewards point.</Text>
                        </View>    
                    </ImageBackground> */}
                    {/* End of Banner */}
            </Animated.ScrollView>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    allItemsContainer:{
        alignSelf: "center",  
        marginTop: 5,
        marginBottom: 5,
        width: wp('100%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
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
        elevation: 3,
    },
    allItemsTitle: {
        alignSelf: "center",
        // marginLeft: 3,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
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
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 15,
        width: 100,
        height: 35,
    },
    buttonContainer: {
        alignSelf: "center",
        width: '60%',
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 12
    },
    container: {
        // backgroundColor: "#fff",
    },
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        backgroundColor: "#fff",
    },
    headerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 10,
        height: 200,
        width: wp('100%'),
    },
    headerLabel: {
        textAlign: "center",
        marginTop: 30,
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    headerLabelBig: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    headerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    popularItems: {
        alignSelf: "center",
        borderRadius: 30,
        flexDirection: "row",
        width: wp('90%'),
    }, 
    popularItemsContainer: {
        alignSelf: "center",
        width: wp('100%'),
        marginBottom: 5,
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 5,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
    }, 
    popularItemsTitle: {
        textAlign: "center",
        // marginLeft: 3,
        fontSize: 18,
        fontWeight: "bold"
    },
    popularItemsTitleContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        width: wp('90%'),
        marginBottom: 5,
        marginTop: 5,
    },
    textInfoBottom: {
        marginTop: 5,
        marginBottom: 50,
        fontSize: 12,
        opacity: .5,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    textInfo: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        opacity: .5,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,

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
    topNavRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
        width: 60,
        marginRight: 15,
        paddingTop: 5,
    },
})
export default rewardItems;