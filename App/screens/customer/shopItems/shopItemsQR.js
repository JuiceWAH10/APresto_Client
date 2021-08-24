import React from 'react';
import { 
    ImageBackground,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import QRCode from "react-qr-code";
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {clearCart} from '../../../functions/cartFunction';

import {useDispatch} from 'react-redux';

function shopItemsQR(props) {
    const navigation = useNavigation();
    const {cartItems, totalAmount } = props.route.params;
    const dispatch = useDispatch();
    
    function returnAndClear(){
        dispatch(clearCart());
        navigation.goBack();
    }

    let orderDetails = {
        'items':{
            'totalAmount':totalAmount,
            'orderedItems':cartItems
        }
    };
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../../../assets/images/splashScreenDark.jpg')}>
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Scan the QR code to add point(s)</Text>
                        <QRCode 
                            value = {JSON.stringify(orderDetails)}
                        />
                    <TouchableOpacity style={styles.button} onPress={returnAndClear} >
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
        backgroundColor: '#ee4b43',
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
export default shopItemsQR;