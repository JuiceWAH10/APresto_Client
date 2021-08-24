import React from 'react';
import { 
    ImageBackground,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View, 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function popularRewardItem(props) {
    return (
        <View style={styles.popularContent}>
            <ImageBackground style={styles.popularBgImage}
                imageStyle={{ borderRadius: 30}}
                source={require('../../../../assets/Liked_Shop.jpg')}>
                <View style={styles.darken}>
                    <Text style={styles.popularLabel}>{props.reward_Name}</Text>
                    <Text style={styles.popularLabelSmall}>{props.pointsReq}</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={props.redeemToCart}>
                            <Text style={styles.quantity}>Redeem</Text>
                        </TouchableOpacity>
                        
                        {/* 
                        <Icon2 name="minus-circle" size={30} color="#ee4b43" />
                        <TouchableOpacity onPress={()=>console.log("Pressed")}>
                            <Icon name="add-circle" size={30} color="#ee4b43" />
                        </TouchableOpacity> 
                        */}   
                    </View>
                </View>    
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderColor: "#fff",
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
        color: "#ee4b43",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        height: 40,
        width: 80
    },
    popularContent: {
        borderRadius: 30,
        height: 180,
        marginLeft: 5,
        width: wp('44%'),
    },
    popularBgImage: {
        flexDirection: "row",
        borderRadius: 30,
        height: 180,
        width: wp('44%'),
    },
    popularLabel: {
        textAlign: "center",
        marginTop: 60,
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    popularLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
    },
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 30,
    },
    quantity: {
        textAlign: "center",
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 4,
        marginRight: 4      
    },
})
export default popularRewardItem;