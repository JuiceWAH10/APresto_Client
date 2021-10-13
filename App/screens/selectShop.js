import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

function selectShop(props) {
    return (
        <ImageBackground
          style={styles.BGImage}
          source={require('../assets/images/splashScreenDark.jpg')}>
            <SafeAreaView style={styles.droidSafeArea}>
                <View style={styles.LogoContainer}>
                <Image style={styles.Logo}
                    source={require('../assets/images/client_logo.png')}></Image>
                    <Text style={{color: '#fff', fontSize: 18, fontWeight: "bold", marginTop: 10}}>Select Store</Text>
                </View>

                <ScrollView>
                
                <TouchableOpacity onPress={()=> props.navigation.navigate('clientHomepage', { })}>
                        <View style={styles.shopContainer}>
                            <View style={styles.shopWrap}>
                                <Icon name="home" size={45} color="#fff" style={styles.shopIcon} />
                                <View>
                                    <Text style={styles.shopContainerLabel}>Shop Name</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Shop Group of Company</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Manage your own shop.</Text>
                                </View>
                            </View>        
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> props.navigation.navigate('clientHomepage', { })}>
                        <View style={styles.shopContainer}>
                            <View style={styles.shopWrap}>
                                <Icon name="home" size={45} color="#fff" style={styles.shopIcon} />
                                <View>
                                    <Text style={styles.shopContainerLabel}>Shop Name</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Shop Group of Company</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Manage your own shop.</Text>
                                </View>
                            </View>        
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> props.navigation.navigate('clientHomepage', { })}>
                        <View style={styles.shopContainer}>
                            <View style={styles.shopWrap}>
                                <Icon name="home" size={45} color="#fff" style={styles.shopIcon} />
                                <View>
                                    <Text style={styles.shopContainerLabel}>Shop Name</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Shop Group of Company</Text>
                                    <Text style={styles.shopContainerLabelSmall}>Manage your own shop.</Text>
                                </View>
                            </View>        
                        </View>
                    </TouchableOpacity>   


                {/* End of QR Code Scanner */}

                </ScrollView>

            </SafeAreaView>    
        </ImageBackground>
       
    );
}

const styles = StyleSheet.create({
    BGImage: {
        flex: 1,
        justifyContent: 'flex-start',
      },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    Logo:{
        // width: wp('20%'),
        // height: hp('20%'),
        width: wp('100%'),
        height: 100,
        borderRadius: 100,
        // borderWidth: 1
      },
      LogoContainer:{
        // position: "absolute",
        width: wp('100%'),
        height: hp('20%'),
        // paddingTop: hp('15%'),
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10  
      },
      shopContainer: {
        alignSelf: "center",
        backgroundColor: "#071964",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 15,
        height: 100,
        width: wp('90%'),

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    shopContainerLabel: {
        marginTop: 12,
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    shopContainerLabelSmall: {
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    shopIcon: {
        marginTop: 23,
    },
    shopWrap: {
        alignSelf: "center",
        flexDirection: "row", 
        height: 65,  
    },


})
export default selectShop;