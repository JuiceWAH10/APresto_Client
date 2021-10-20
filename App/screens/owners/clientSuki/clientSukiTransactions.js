import React, {useEffect, useState} from 'react';
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

import ClientAllSukiTransactions from './importClientSuki/clientAllSukiTransactions';

function clientSukiTransactions(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [transList, setTransList] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();

    const {customer_ID, owner_ID, points, points_Used, username, transactions, store_ID} = props.route.params;

    useEffect(() => {
        firebase.firestore()
            .collection('Transactions')
            .where("store_ID", "==", store_ID)
            .where("customer_ID", "==", customer_ID)
            .get()
            .then(result => {
                const st = [];
                result.forEach(function (store){         
                    st.push(store.data());
                });
                console.log(st);
                setTransList(st);
                console.log(transList);
            });
    }, [])

    return (
        <SafeAreaView style={styles.droidSafeArea}>

             {/* Top Navigation */}
             <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>Transaction Summary</Text>   
            </View>  
            {/* End of Top Navigation */}

            <ScrollView style={styles.container}>
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                        imageStyle={{ borderRadius: 30}}
                        source={require('../../../assets/bannerImages/banner_Suki.jpg')}>
                        <View style={styles.darken}>
                            <Text style={styles.bannerLabel}>Suki</Text>
                            <Text style={styles.bannerLabel2}>Transactions</Text>
                            <Text style={styles.bannerLabelSmall}>Keep Track of your Sukis</Text>
                        </View>    
                </ImageBackground>
                {/* End of Banner */}
                <FlatList
                    style={styles.container}
                    data={transList}
                    keyExtractor={item => item.trans_ID}
                    renderItem={itemData => 
                        <ClientAllSukiTransactions
                            customer_ID = {itemData.item.customer_ID}
                            ptsDeduct = {itemData.item.ptsDeduct}
                            ptsEarned = {itemData.item.ptsEarned} 
                            purchasedProducts = {itemData.item.purchasedProducts}
                            redeemedRewards= {itemData.item.redeemedRewards}
                            store_ID = {itemData.item.store_ID}
                            trans_ID = {itemData.item.trans_ID}
                            total = {itemData.item.totalAmount}
                            date = {itemData.item.date}
                        />
                    }
                />
                
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton:{
        marginTop: 14
    },
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
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabel2: {
        textAlign: "right",
        marginTop: -10,
        color: "#fff",
        fontSize: 25,
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
        paddingRight: wp('5%'),
    },
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.12)',
        // borderRadius: 30,
    },
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 30,
    },
    container:{
        flex:1,
        alignSelf: "center",
        width: wp('100%'),
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        borderWidth: 1,
        backgroundColor: 'white',
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
export default clientSukiTransactions;