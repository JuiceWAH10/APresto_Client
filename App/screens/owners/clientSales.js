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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase';
import {StoreContext} from '../../functions/storeProvider';


function clientSales(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sukiList, setSukiList] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();
    const {store} = useContext(StoreContext);
    const {Products, Rewards, owner_ID, redeemTally, salesTally, store_ID, store_Name, totalRedeem,totalSales, transTally} = props.route.params;

    return (
        <SafeAreaView style={styles.droidSafeArea}>

            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>Shop Summary</Text>   
            </View>  
            {/* End of Top Navigation */}

            {/* Banner */}
            <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/banner_LikedShops.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>{store_Name} </Text>
                        <Text style={styles.bannerLabelSmall}>Sales Report</Text>
                    </View>    
            </ImageBackground>
            {/* End of Banner */}

            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollStyle}>

                    <Text style={styles.textTitle}>Transaction Summary</Text>  
                    <Text style={styles.textContent}>Total number of transactions: <Text style={styles.textBold}>{transTally}</Text></Text>
                    <Text style={styles.textContent}>Total amount of sold items: <Text style={styles.textBold}>{totalSales}</Text></Text>
                    <Text style={styles.textContent}>Total amount of redeemed rewards: <Text style={styles.textBold}>{totalRedeem} </Text></Text>
                    <Text style={styles.textContent}>Total quantity of sold items: <Text style={styles.textBold}>{salesTally}</Text></Text>
                    <Text style={styles.textContent}>Total quantity of redeemed rewards: <Text style={styles.textBold}>{redeemTally}</Text></Text>

                    <Text style={styles.textTitle}>Transaction Summary</Text>  
                    <Text style={styles.textContent}>Total number of transactions: <Text style={styles.textBold}>{transTally}</Text></Text>
                    <Text style={styles.textContent}>Total amount of sold items: <Text style={styles.textBold}>{totalSales}</Text></Text>
                    <Text style={styles.textContent}>Total amount of redeemed rewards: <Text style={styles.textBold}>{totalRedeem} </Text></Text>
                    <Text style={styles.textContent}>Total quantity of sold items: <Text style={styles.textBold}>{salesTally}</Text></Text>
                    <Text style={styles.textContent}>Total quantity of redeemed rewards: <Text style={styles.textBold}>{redeemTally}</Text></Text>

                    <Text style={styles.textTitle}>Tally of quantity sold per items </Text>
                    {/*will put these list into chart... */}
                    {Object.keys(Products).map(function(key) {return(<Text key={key}>{key+"wew: "+Products[key]}</Text>)})}

                    <Text style={styles.textTitle}>Tally of quantity redeemed per rewards: </Text>
                    {Object.keys(Rewards).map(function(key) {return(<Text key={key}>{key+"wew: "+Rewards[key]}</Text>)})}
                    
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
export default clientSales;