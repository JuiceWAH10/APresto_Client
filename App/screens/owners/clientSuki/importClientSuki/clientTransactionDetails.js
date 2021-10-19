import React, {useEffect, useState, useContext} from 'react';
import { 
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
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase';
import {StoreContext} from '../../../../functions/storeProvider';


function clientTransactionDetails(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sukiList, setSukiList] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();
    const {store} = useContext(StoreContext);
    const {customer_ID, ptsDeduct, ptsEarned, purchasedProducts, redeemedRewards, store_ID, trans_ID, total, date} = props.route.params;
    var ctr = 0;
    var Rctr = 0;
    return (
        <SafeAreaView style={styles.droidSafeArea}>

            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>Transaction Details</Text>   
            </View>  
            {/* End of Top Navigation */}

            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollStyle}>

                    <Text style={styles.textTitle}>Transaction Details</Text>  
                    <Text style={styles.textContent}>Transaction ID: <Text style={styles.textBold}>{trans_ID}</Text></Text>
                    <Text style={styles.textContent}>Customer ID: <Text style={styles.textBold}>{customer_ID} </Text></Text>
                    <Text style={styles.textContent}>Date: <Text style={styles.textBold}>{date.toDate().toString()}</Text></Text>
                    <Text style={styles.textContent}>Total: <Text style={styles.textBold}>{total}</Text></Text>
                    <Text style={styles.textContent}>Points Earned: <Text style={styles.textBold}>{ptsEarned}</Text></Text>
                    <Text style={styles.textContent}>Points Used: <Text style={styles.textBold}>{ptsDeduct}</Text></Text>

                    <Text style={styles.textTitle}>Purchased Products: </Text>
                    {/* cancel  na yung charts hahaha */}
                    {Object.keys(purchasedProducts).map(
                        function(key) {
                            
                            return(
                                <View key={key}>
                                    <Text >{++ctr}</Text>
                                    <Text>{"Product Name: "}<Text style={styles.textBold}>{purchasedProducts[key].productTitle}</Text></Text>
                                    <Text>{"Price: "}<Text style={styles.textBold}>{purchasedProducts[key].productPrice}</Text></Text>
                                    <Text>{"Quantity: "}<Text style={styles.textBold}>{purchasedProducts[key].quantity}</Text></Text>
                                    <Text>{"Total: "}<Text style={styles.textBold}>{purchasedProducts[key].total}</Text></Text>
                                </View>
                            )
                        })
                    }

                    <Text style={styles.textTitle}>Redeemed Rewards: </Text>
                    {Object.keys(redeemedRewards).map(
                        function(key) {
                            return(
                                <View key={key}>
                                    <Text>{++Rctr}</Text>
                                    <Text>{"Product Name: "}<Text style={styles.textBold}>{redeemedRewards[key].productTitle}</Text></Text>
                                    <Text>{"Price: "}<Text style={styles.textBold}>{redeemedRewards[key].productPrice}</Text></Text>
                                    <Text>{"Quantity: "}<Text style={styles.textBold}>{redeemedRewards[key].quantity}</Text></Text>
                                    <Text>{"Total: "}<Text style={styles.textBold}>{redeemedRewards[key].total}</Text></Text>
                                </View>
                            )
                        })
                    }
                    
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 10,
        height: 150,
        width: wp('90%'),
    },
    bannerLabel: {
        textAlign: "right",
        marginTop: 30,
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabelSmall: {
        textAlign: "right",
        marginTop: 2,
        color: "#fff",
        fontSize: 14,
        paddingLeft: wp('5%'),
        paddingRight: wp('10%'),
    },
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.12)',
        // borderRadius: 30,
    },
    contentContainer:{
        flex:1,
        alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "red",
        width: wp('100%'),

        backgroundColor: 'white',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    container:{
        flex:1,
        alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "red",
        width: wp('100%'),
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    scrollStyle: {
        alignSelf: "center",
        backgroundColor: "#fff",
        width: wp('100%'),
        marginBottom: 10,
        marginTop: 10,   
        paddingLeft: wp('10%')
        
    },
    textTitle: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        width: wp('90%'),
        fontSize: 20,
        fontWeight: "bold"
    },
    textBold: {
        fontWeight: "bold",
        color: "#ee4b43",
    },
    textContent: {
        marginTop: 2,
        marginBottom: 2,
        width: wp('90%'),
        fontSize: 14,
        textAlign: "justify"
        
    },
    title: {
        color: "#ee4b43",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    topNav: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,

        backgroundColor: 'white',
        height: 50,
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
export default clientTransactionDetails;