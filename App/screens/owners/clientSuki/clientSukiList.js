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

import ClientAllSuki from './importClientSuki/clientAllSuki';

function clientSukiList(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sukiList, setSukiList] = useState([]);
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();

    const {owner_ID, store_ID} = props.route.params;

    useEffect(() => {
        firebase.firestore()
            .collection('Suki')
            .where("owner_ID", "==", owner_ID).get()
            .then(result => {
                const st = [];
                result.forEach(function (store){         
                    st.push(store.data());
                });
                console.log(st);
                setSukiList(st);
                console.log(sukiList);
            });
    }, [])

    return (
        <SafeAreaView style={styles.droidSafeArea}>

            {/* Top Navigation and Search Bar */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 style={styles.backButton} name="left" size={30} color="#fff" />
                </TouchableOpacity>   
                <Searchbar
                        style={styles.searchBar}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                />
            </View>
            {/* End of Top Nav and Search Bar */}

            <ScrollView style={styles.container}>
                <FlatList
                    style={styles.container}
                    data={sukiList}
                    keyExtractor={item => item.suki_ID}
                    renderItem={itemData => 
                        <ClientAllSuki
                            customer_ID = {itemData.item.customer_ID}
                            owner_ID = {itemData.item.owner_ID}
                            points = {itemData.item.points}
                            points_Used = {itemData.item.points_Used}
                            suki_ID = {itemData.item.suki_ID}
                            username = {itemData.item.username}
                            transactions = {itemData.item.transactions}
                            store_ID = {store_ID}
                        />
                    }
                />
                
                {/* Banner */}
                {/* <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/banner_Suki.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>Sukis are essential for your business growth</Text>
                        <Text style={styles.bannerLabelSmall}>You can know who among your suki loves you most.</Text>
                    </View>    
                </ImageBackground> */}
                {/* End of Banner */}
                
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
        marginBottom: 15,
        height: 150,
        width: wp('90%'),
    },
    bannerLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#29312e",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#29312e",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 30,
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
    searchBar: {
        // alignSelf: "center",
        color: "#fd4140",
        width: wp('80%'),
        borderColor: "#fd4140",
        marginBottom: 10,
        marginTop: 5,   
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        // height: 40,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: wp('5%'),
        // paddingTop: 5,

        paddingTop: 8,
        marginBottom: 5,

        backgroundColor: '#ee4b43',
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
export default clientSukiList;