import React from 'react';
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

import { useDispatch, useSelector } from 'react-redux';

import ClientAllShopItems from '././importClientProduct/clientAllShopItems';

LogBox.ignoreAllLogs();// Ignore all Logs! Remove this when coding

function clientProductList(props) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();

    const dispatch = useDispatch();
    //(juswa) fetch data from redux store in App.js using useSelector. the data is from the state managed by reducers
    //const products = useSelector(state => state.products.allProducts);

    //fetch data from firestore
    const [products, setProducts] = React.useState([]);

        React.useEffect(()=>{
            const subscriber = firebase.firestore()
            .collection('Products')
            .onSnapshot(querySnapshot => {
                const prod = [];
                querySnapshot.forEach(function (product){         
                    prod.push(product.data());
                });
                setProducts(prod);
            });
            return () => subscriber();
        }, []);

    return (
        <SafeAreaView style={styles.droidSafeArea}>

            {/* Top Navigation and Search Bar */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 style={styles.backButton} name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>   
                <Searchbar
                        style={styles.searchBar}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                />
            </View>
            {/* End of Top Nav and Search Bar */}

            {/* Header */}
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={() => "pressed"} >
                    <View style={styles.headIndivContainer}>
                        <Text style={styles.headLabelSmall}>Live</Text>
                        <Icon style={styles.headIcons} name="box" size={35} color="#29312e" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => "pressed"} >
                    <View style={styles.headIndivContainer}>
                        <Text style={styles.headLabelSmall}>Sold</Text>
                        <Icon style={styles.headIcons} name="wallet" size={35} color="#29312e" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => "pressed"} >    
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