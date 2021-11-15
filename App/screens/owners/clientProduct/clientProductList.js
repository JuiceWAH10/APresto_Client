import React, {useEffect, useState} from 'react';
import { 
    ImageBackground,
    LogBox,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity, 
    View, 
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';    
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';

import ClientAllShopItems from '././importClientProduct/clientAllShopItems';

LogBox.ignoreAllLogs();// Ignore all Logs! Remove this when coding

function clientProductList(props) {
    const {store_ID} = props.route.params;
    const navigation = useNavigation();

    const [refProds, setRefProds] = useState([]); //for saving unfiltered data from firestore
    const [products, setProducts] = useState([]);

    const onChangeSearch = (query) => {
        if(query != " "){
            setProducts(
                refProds.filter(shop => {
                    return shop.product_Name.toLowerCase().includes(query.toLowerCase()) || shop.description.toLowerCase().includes(query.toLowerCase()) || shop.status.toLowerCase().includes(query.toLowerCase())
                })
            );       
        }
        if(query==""){
            setProducts(refProds);
        }
    }

        useEffect(()=>{
            const subsciber = firebase.firestore()
            .collection('Products')
            .where("shop_ID","==",store_ID)
            .onSnapshot(querySnapshot => {
                const prod = [];
                const available = [];
                querySnapshot.forEach(function (product){    
                    prod.push(product.data());
                    if(product.data().status == "available"){
                        available.push(product.data());
                    }
                });
                setRefProds(prod);
                console.log("apoy "+ prod +" ref " + refProds)
                setProducts(available);
            });

            return ()=> subsciber()
            
        }, []);

    function liveProducts(){
        const prod = [];
        refProds.map(item => {
            if(item.status == "available"){
                prod.push(item);
            }
        });
        setProducts(prod);
    }

    function delistedProducts(){
        const prod = [];
        refProds.map(item => {
            if(item.status == "delisted"){
                prod.push(item);
            }
        });
        setProducts(prod);
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>

            {/* Top Navigation and Search Bar */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 style={styles.backButton} name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>   
                <Searchbar
                        style={styles.searchBar}
                        placeholder={'Search'}
                        onChangeText={(e) => onChangeSearch(e)}
                />
            </View>
            {/* End of Top Nav and Search Bar */}

            {/* Header */}
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={liveProducts} >
                    <View style={styles.headIndivContainer}>
                        <Text style={styles.headLabelSmall}>Live</Text>
                        <Icon style={styles.headIcons} name="box" size={35} color="#29312e" />
                    </View>
                </TouchableOpacity>
                {/*can't  think of function to apply to this
                <TouchableOpacity onPress={() => "pressed"} >
                    <View style={styles.headIndivContainer}>
                        <Text style={styles.headLabelSmall}>Sold</Text>
                        <Icon style={styles.headIcons} name="wallet" size={35} color="#29312e" />
                    </View>
                </TouchableOpacity>
                */}
                <TouchableOpacity onPress={delistedProducts} >    
                    <View style={styles.headIndivContainer}>
                        <Text style={styles.headLabelSmall}>Delisted</Text>
                        <Icon style={styles.headIcons} name="archive" size={35} color="#29312e" />
                    </View>
                </TouchableOpacity>    
            </View>
            {/* End of Header */}

            <FlatList
                style={styles.container}
                data={products}
                keyExtractor={item => item.product_ID}
                renderItem={itemData => 
                    <ClientAllShopItems
                        product_ID = {itemData.item.product_ID}
                        shop_ID = {itemData.item.shop_ID}
                        product_Name = {itemData.item.product_Name}
                        price = {itemData.item.price}
                        definition = {itemData.item.description}
                        stock = {itemData.item.quantity}
                        status = {itemData.item.status}
                        imgLink = {itemData.item.imgLink}
                        sold = {itemData.item.sold}
                    />
                }
            />

                {/* Banner */}
                {/* <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerPeach.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>Visit Shops now to claim awesome rewards.</Text>
                        <Text style={styles.bannerLabelSmall}>Spending for the products  you love give you rewards!</Text>
                    </View>    
                </ImageBackground> */}
                {/* End of Banner */}

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
        marginTop: 10,
        marginBottom: 10,
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
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.4)',
        // borderRadius: 30,
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
        backgroundColor: "#fff"
    },
    headContainer: {
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#ee4b43",
        borderRadius: 30,
        marginBottom: 8,
        height: 74,
        width: wp('90%'),
        flexDirection: "row",
        paddingLeft: wp('15%'),
        paddingRight: wp('15%'),
    },
    headIndivContainer: {
        width: wp('25%'),
    },
    headLabelSmall: {
        textAlign: "center",
        marginTop: 5,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    headIcons: {
        textAlign: "center",
        marginTop: 3,
        color: "#fff",
    },
    searchBar: {
        // alignSelf: "center",
        color: "#fd4140",
        width: wp('80%'),
        borderColor: "#fd4140",
        marginBottom: 10,
        marginTop: 5,   
    },
    top: {
        paddingTop: 8,
        marginBottom: 5,

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
    topNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        // height: 40,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: wp('5%'),
        // paddingTop: 5,
    },
})
export default clientProductList;