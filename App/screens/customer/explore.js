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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CarouselCards from '../../carousel/CarouselCards'
import IndivShop from '././importScreens/indivShop';


function explore(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* <Text style={styles.title}>Explore APresto</Text> */}
            <View style={styles.title}>
                <Image style={styles.logoHeader} 
                source={require('../../assets/images/explore.png')}/>
            </View>
            <ScrollView style={[styles.container, {flex:1}]}>

                <CarouselCards /> 

                <Text style={styles.textInfo}>Want to try something new that is accessible to you? Or do you want
                 to visit one of the shops you love? <Text style={styles.textBold}> Near Me </Text>
                  and <Text style={styles.textBold}>Liked Shops</Text> will help you.</Text>

                {/* Dual View */}
                <View style={styles.dual}>
                    <TouchableOpacity onPress={()=>console.log("Pressed")}>
                        <View style={styles.dualContent}>
                            <ImageBackground style={styles.dualBgImage}
                                imageStyle={{ borderRadius: 30}}
                                source={require('../../assets/dualImages/near_Me.jpg')}>
                                <View style={styles.darken}> 
                                    <Text style={styles.dualLabel}>Near Me</Text>
                                    <Text style={styles.dualLabelSmall}>Gems around corners</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>console.log("Pressed")}>
                        <View style={styles.dualContent}>
                            <ImageBackground style={styles.dualBgImage}
                                imageStyle={{ borderRadius: 30}}
                                // resizeMode={'contain'}
                                source={require('../../assets/dualImages/liked_Shops.jpg')}>
                                <View style={styles.darken}>
                                    <Text style={styles.dualLabel}>Liked Shops</Text>
                                    <Text style={styles.dualLabelSmall}>Stores you love</Text>
                                </View>    
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* End of Dual View */}

                {/* Most Reviewed Shop */}
                {/* <View style={styles.mostReviewsContainer}> */}
                    <View style={styles.mostReviewsTitleContainer}>
                        <Icon name="fire" size={25} color="#fd4140" />
                        <Text style={styles.mostReviewsTitle}>Most Reviewed Shops</Text>
                    </View>
                    {/* Insert Code here for importing Most Reviewed shops with info */}
                    <IndivShop shop_ID = {1} shopName="Keitandkat Perfume" address="504 Gondola, Muzon, Taytay, Rizal" specialty="Perfumes"/>
                    <IndivShop shop_ID = {2} shopName="Scrapyard Cafe & Restaurant" address="45 Manila E Rd, Angono, 1930 Rizal" specialty="Pinoy Restaurant"/>
                    <IndivShop shop_ID = {3} shopName="Blugre Coffee Manila East" address="Don Hilario Cruz, Taytay, Rizal" specialty="Cafe"/>
                    <IndivShop shop_ID = {4} shopName="Korean BBQ & Buffet" address="Peace Be With You Bldg Velasquez Street Brgy, Taytay, Rizal"/>
                    <IndivShop shop_ID = {5} shopName="Jamp Sari-Sari Store" address="Jacob St, Taytay, Rizal"/>
                {/* </View> */}
                {/* End of most Reviewed */}

            </ScrollView>    
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    carousel: {
        alignSelf: "center",
        borderRadius: 30,
        flexDirection: "row",
        height: 150,
        width: wp('90%'),
        marginBottom: 10,
    },
    carouselImages: {
        borderRadius: 30,
        height: 150,
        width: wp('90%')
    },
    carouselLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    carouselLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },     
    container: {
        flexDirection: "column",
        width: wp('100%'),
        backgroundColor: 'white',
        // borderWidth: 1
    },   
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    dual: {
        alignSelf: "center",  
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        height: 200,
        width: wp('100%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        paddingTop: 10,

        // backgroundColor: 'white',
        // shadowColor: "#000",
        // shadowOffset: {
        // width: 0,
        // height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,
        // elevation: 3,
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
        marginLeft: 20,
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
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.4)',
        // borderRadius: 30,
    },
    logoHeader: {
        height: 60,
        width: wp('100%'),
        resizeMode: 'contain'
    },
    mostReviewsContainer: {
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
    mostReviewsTitle: {
        textAlign: "center",
        // marginTop: 8,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
    mostReviewsTitleContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 8,
        width: wp('90%'),
    },
    textBold: {
        fontWeight: "bold"
    },
    textInfo: {
        marginTop: -15,
        // marginBottom: 5,
        fontSize: 12,
        opacity: .5,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        textAlign: "center",
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
    
    
})
export default explore;