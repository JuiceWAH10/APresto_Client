import React from 'react';
import { 
    Image,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function allRewardItem(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.itemImage}
                source={require('../../../../assets/DummyShop.jpg')}>
            </Image>
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{props.reward_Name}</Text>
                <Text style={styles.itemPrice}>{props.pointsReq}</Text>
                <Text style={styles.itemInfo}>{props.definition}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={props.redeemToCart}>
                        <Text style={styles.quantity}>Redeem</Text>
                    </TouchableOpacity>
                    {/* 
                    <Icon2 name="minus-circle" size={35} color="#ee4b43" />
                    <TouchableOpacity onPress={()=>console.log("Pressed")}>
                        <Icon name="add-circle" size={35} color="#ee4b43" />
                    </TouchableOpacity> 
                    */}   
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderColor: "#ee4b43",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        width: 100,
        height: 35,
    },
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
        marginBottom: 4,
        marginTop: 4,
        height: 140,
        width: wp('90%'),
    },
    itemContainer:{
        flexDirection: "column",
        width: wp('50%'),
    },
    itemImage: {
        alignSelf: "center",
        borderRadius: 15,
        flexDirection: "column",
        height: 140,
        width: wp('30%'),
        borderWidth: 1
    },
    itemInfo: {
        alignSelf: "center",
        fontSize: 14,
        marginRight: 10
    },
    itemName: {
        alignSelf: "center",
        marginBottom: 2,
        marginTop: 6,
        fontSize: 16,
        fontWeight: "bold"
    },
    itemPrice: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
    quantity: {
        textAlign: "center",
        color: "#ee4b43",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
        marginRight: 4      
    },
})
export default allRewardItem;