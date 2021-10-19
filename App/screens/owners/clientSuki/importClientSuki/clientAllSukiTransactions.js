import React from 'react';
import { 
    Image,
    StyleSheet,
    Text, 
    View, 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
//map shit keme of purchaseProducts and redeemedRewards is not functioning well, maybe just add transaction details screen
function ClientAllSukiTransactions(props) {
    const navigation = useNavigation();
    const date = props.date.toDate()
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => navigation.navigate("clientTransactionDetails", 
                {
                    customer_ID: props.customer_ID,
                    ptsDeduct: props.ptsDeduct,
                    ptsEarned: props.ptsEarned,
                    purchasedProducts: props.purchasedProducts,
                    redeemedRewards: props.redeemedRewards,
                    store_ID: props.store_ID,
                    trans_ID: props.trans_ID,
                    total: props.total,
                    date: props.date
                }
            )}
        >
            <View style={styles.sukiContainer}>
                <Text style={styles.sukiName}>Transaction ID: {props.trans_ID}</Text>
                <Text style={styles.sukiInfo}>Total Amount: {props.total}</Text>
                <Text style={styles.sukiInfo}>Points Earned: {props.ptsEarned}</Text>
                <Text style={styles.sukiInfo}>Points Used: {props.ptsDeduct}</Text>
                <Text style={styles.sukiInfo}>Date: {date.toString()}</Text>
                {props.purchasedProducts.map((store, key) =>{
                    <Text style={styles.sukiInfo}>{store.productTitle, store.productPrice, store.quantity, store.total}</Text>
                })}
                {props.redeemedRewards.map((store, key) =>{
                    <Text style={styles.sukiInfo}>{store[key]}</Text>
                })}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonsContainer:{
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        height: 40,
        width: 80
    },
    container: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 3,
        marginBottom: 3,
        height: 160,
        width: wp('100%'),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),

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
    sukiContainer:{
        flexDirection: "column",
        width: wp('90%'),
    },
    sukiImage: {
        alignSelf: "center",
        borderRadius: 15,
        flexDirection: "column",
        height: 140,
        width: wp('30%'),
        borderWidth: 1
    },
    sukiInfo: {
        alignSelf: "center",
        fontSize: 14,
        marginRight: 10
    },
    sukiName: {
        alignSelf: "center",
        marginBottom: 2,
        marginTop: 6,
        fontSize: 18,
        fontWeight: "bold"
    },
    sukiStatus: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
})
export default ClientAllSukiTransactions;