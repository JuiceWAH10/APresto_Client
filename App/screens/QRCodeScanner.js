import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Button, 
    Dimensions, 
    Image, 
    ImageBackground,
    SafeAreaView, 
    TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import jsonpack from 'jsonpack';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import * as cartAction from '../functions/cartFunction';
import * as rewardCart from '../functions/rewardsCartFunction';

import clientHomepage from './owners/clientHomepage';
import checkoutPage from './checkoutPage';

export default function QRCodeScanner(props){
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const {store_ID, owner_ID} = props.route.params;
    const dispatch = useDispatch();

    const [sukiList, setSukiList] = useState([]);

    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('Suki')
            .where("owner_ID", "==", owner_ID)
            .onSnapshot(result => {
                const st = [];
                result.forEach(function (store){         
                    st.push(store.data());
                });

                setSukiList(st);
                console.log('list ',sukiList);
            });
        return ()=> subscriber();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const qrData = jsonpack.unpack(data);
        const sukiExists = sukiList.some(suki => suki.customer_ID === qrData.customer_ID);
        let suki_ID = "";
        let points = 0;

        if(sukiExists){
            const suki = sukiList.find(suki => { return suki.customer_ID === qrData.customer_ID});
            suki_ID = suki.suki_ID;
            points = suki.points;
        }
        else{
            suki_ID = "newsuki";
            points = 0;
        }
       
        if(qrData.QR_Type == "transaction"){
            let purchasedProducts = qrData.purchasedProducts;
            let redeemedRewards = qrData.redeemedRewards;
            console.log("product",purchasedProducts);
            console.log("reward",redeemedRewards);

            purchasedProducts.map((store, key) =>{
                dispatch(cartAction.addToCart(store))
            })

            redeemedRewards.map((store, key) =>{
                dispatch(rewardCart.redeemToCart(store))
            })

            navigation.navigate('checkoutPage', 
                {
                    customer_ID: qrData.customer_ID,
                    suki_ID: suki_ID,
                    username: qrData.username,
                    points: points,
                    store_ID: qrData.store_ID
                }
            );
        }
        else if(qrData.QR_Type == "customer_ID"){
            console.log(qrData);
            navigation.navigate('POS', 
                {
                    customer_ID: qrData.customer_ID,
                    suki_ID: suki_ID,
                    username: qrData.username,
                    points: points,
                    store_ID: store_ID
                }
            );
        }
        else{
            alert('Invalid: Please scan Transaction and Customer QR code only.')
        }
        
    };

    const getUser = async() => {
        await firebase.firestore()
        .collection('Suki')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                console.log('User Data', documentSnapshot.data());
                setLoggedUser(documentSnapshot.data());
            }
        })      
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../assets/images/splashScreenDark.jpg')}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={[StyleSheet.absoluteFillObject, styles.container]}>
                    <Text style={styles.description}>Scan your QR code</Text>
                    <Image
                        style={styles.qr}
                        source={require('../assets/qrborder.png')}
                    />
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </BarCodeScanner>
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </ImageBackground>    
        </SafeAreaView>
        
    );
}

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
      },
      description: {
        fontSize: width * 0.09,
        textAlign: 'center',

        color: 'white',
      },
      cancel: {
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '70%',
        color: 'white',
      },
});