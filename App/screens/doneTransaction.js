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

function DoneTransaction(props) {
    const navigation = useNavigation();
    const {customer_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards} = props.route.params;

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../assets/images/splashScreenDark.jpg')}>
                <View style={styles.qrContainer}>
                    <Text style={styles.qrPick}>Transaction Succesful</Text>
                       
                    <View style={styles.qrLabelContainer}> 
                        {/* <Text style={styles.qrLabel}>{customer_ID}</Text>    */}
                        <Text style={styles.qrLabel}>{customer_ID}</Text>
                    </View>  

                    <View style={styles.qrLabelContainer}>
                        <Text style={styles.qrLabelTitle}>Total Amount: </Text>
                        <Text style={styles.qrLabel}>Php {totalAmount}</Text>
                    </View> 

                    <View style={styles.qrLabelContainer}>
                        <Text style={styles.qrLabelTitle}>Points Earned: </Text>
                        <Text style={styles.qrLabel}>{ptsEarned} pts</Text>
                    </View>

                    <View style={styles.qrLabelContainer}> 
                        <Text style={styles.qrLabelTitle}>Points Deducted: </Text>
                        <Text style={styles.qrLabel}>{ptsDeduct} pts</Text>
                    </View>
                

                    <View style={styles.buttonContainer} > 
                        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('clientHomepage') }>
                            <Text style={styles.buttonLabel}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default DoneTransaction;

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
        width: '100%',
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
    },
    qrLabelTitle:{
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "bold"
    },
    qrLabelContainer:{
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        borderRadius: 30,
        width: wp('90%'),
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: ('20%'),
        paddingRight: ('20%'),
    },
    qrPick:{
        textAlign: "center",
        fontSize: 22,
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold"
    },
})
