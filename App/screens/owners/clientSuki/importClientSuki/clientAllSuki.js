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

function clientAllSuki(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.sukiImage}
                    source={require('../../../../assets/eat.jpg')}>
            </Image>
            <View style={styles.sukiContainer}>
                <Text style={styles.sukiNameTitle}>Suki Name:</Text>
                <Text style={styles.sukiName}>{props.username}</Text>
                <Text style={styles.sukiInfo}>Points: {props.points.toFixed(2)}</Text>
                <Text style={styles.sukiInfo}>Used Points: {props.points_Used.toFixed(2)}</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('clientSukiTransactions', 
                        {
                            customer_ID: props.customer_ID,
                            owner_ID: props.owner_ID,
                            points: props.points,
                            points_Used: props.points_Used,
                            suki_ID: props.suki_ID,
                            username: props.username,
                            transactions: props.transactions,
                            store_ID: props.store_ID
                        })
                    }
                >
                    <Text style={styles.sukiInfo}>Transactions: {props.transactions}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        width: wp('50%'),
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
    sukiNameTitle: {
        alignSelf: "center",
        marginBottom: 2,
        marginTop: 6,
        fontSize: 14,
        fontWeight: "bold"
    },
    sukiName: {
        alignSelf: "center",
        marginBottom: 4,
        marginTop: 2,
        fontSize: 18,
        fontWeight: "bold"
    },
    sukiStatus: {
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold"
    },
})
export default clientAllSuki;