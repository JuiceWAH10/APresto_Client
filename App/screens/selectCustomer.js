import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import firebase from 'firebase';

function SelectCustomer(props) {
    const navigation = useNavigation();

    const {store_ID, owner_ID} = props.route.params;

    const [sukiList, setSukiList] = useState([]);
    const [pickedSuki, setPickedSuki] = useState('');

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
                setPickedSuki(st[0]);
                
            });
        return ()=> subscriber();
    }, []);

    function navigateToPOS(customer_ID, suki_ID, username, points){
        navigation.navigate('POS', 
            {
                customer_ID: customer_ID,
                suki_ID: suki_ID,
                username: username,
                points: points,
                store_ID: store_ID
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground style={styles.droidSafeArea} source={require('../assets/images/splashScreenDark.jpg')}>

                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Icon name="left" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.qrContainer}>

                    <Text style={styles.qrPick}>Pick a suki</Text>
                       
                    <Picker
                        style={{ height: 10, width: 180 }}
                        selectedValue={pickedSuki}
                        onValueChange={(itemValue, itemIndex) =>
                            setPickedSuki(itemValue)
                        }
                    >  
                        {sukiList.map((suki, key) =>{
                            return(<Picker.Item label={suki.username} value={suki} key={key}/>)
                        })}  
                    </Picker>
                    <View style={styles.buttonContainer} > 
                        <TouchableOpacity style={styles.button} onPress={ ()=>navigateToPOS(pickedSuki.customer_ID, pickedSuki.suki_ID, pickedSuki.username, pickedSuki.points) }>
                            <Text style={styles.buttonLabel}>Sell to Suki</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.qrLabel}>Not on list?</Text> */}
                    <View style={styles.buttonContainer} > 
                        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('QRCodeScanner', {store_ID:store_ID, owner_ID: owner_ID}) }>
                            <Text style={styles.buttonLabel}>Scan Customer's QR</Text>
                        </TouchableOpacity> 
                    </View>

                    <View style={styles.buttonContainer} > 
                        <TouchableOpacity style={styles.button} onPress={ ()=>navigateToPOS("Guest", "Guest", "Guest", 0) }>
                            <Text style={styles.buttonLabel}>Sell to Guest</Text>
                        </TouchableOpacity> 
                    </View>
                    <Text style={styles.qrLabel}>Customer is a guest?</Text>
                    
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default SelectCustomer;

const styles = StyleSheet.create({
 
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    button: {
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#071964',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 10,
        width: '60%',
        height: hp('6%'),
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 30,
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
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
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5
    },
    qrPick:{
        textAlign: "center",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
        

    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
        width: wp('100%'),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    }
})
