import React from 'react';
import { 
    ImageBackground,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function QRInfo(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../assets/images/splashScreenDark.jpg')}>
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Validate information below</Text>
                       
                    {/* Enter Code for QR Infos Here */}

                    <View style={styles.buttonContainer} > 
                        <TouchableOpacity style={styles.button} onPress={ () => console.log="pressed" }>
                            <Text style={styles.buttonLabel}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={ () => console.log="pressed" }>
                            <Text style={styles.buttonLabel}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default QRInfo;

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
        width: '45%',
        height: hp('6%'),
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 30,
        justifyContent: 'space-between',
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
