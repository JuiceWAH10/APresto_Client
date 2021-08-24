import React from 'react';
import { 
    ImageBackground,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import QRCode from 'react-qr-code';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function rewardItemsQR(props) {
    const navigation = useNavigation();
    const {rewCartItems, totalPoints} = props.route.params;
    let orderDetails = {
        'items':{
            'totalPoints':totalPoints,
            'redeemedItems':rewCartItems
        }
    };

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../../../assets/images/splashScreenDark.jpg')}>
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Scan the QR code to to claim reward(s)</Text>
                        <QRCode 
                            value = {JSON.stringify(orderDetails)}
                        />
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                        <Text style={styles.buttonLabel}>Return</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    button: {
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#071964',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    container:{
        alignContent: "center",
        backgroundColor: '#fd4140',
        flex: 1
    },
    qrContainer:{
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 400,
        width: wp('90%'),
        alignItems: "center",
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        top: hp('20%')
    },
    qrLabel:{
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20
    }
})
export default rewardItemsQR;