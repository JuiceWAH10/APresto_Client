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
import { BarCodeScanner } from 'expo-barcode-scanner';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function QRCodeScanner(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Scanned: ${data}`);
    };

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