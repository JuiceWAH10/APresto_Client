import React, { useContext, useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';
import { AuthContext } from '../../../functions/authProvider';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { showMessage } from 'react-native-flash-message';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import * as crud from '../../../functions/firebaseCRUD';

function clientEditProfile(props) {
    const navigation = useNavigation();

    //user state
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    const {store_ID, store_Name, address, specialty, imgLink, ptsPerAmount, contact_Number} = props.route.params;

    //const [shopName, setTextStoreName] = useState(store_Name);
    //const [shopDetails, setTextShopDetails] = React.useState(specialty);
    //const [shopAddress, setTextShopAddress] = React.useState(address);
    //const [contactNo, setTextContactNo] = React.useState(contact_Number);
    //const [tags, setTextTags] = React.useState('');
    //const [shopPts, setShopPts] = React.useState(ptsPerAmount);
    //const [email, setTextEmail] = React.useState('');
    //const [password, setTextPassword] = React.useState('');
    //const [passwordReentry, setTextPasswordReentry] = React.useState('');
    
    //access current user
    const getUser = async() => {
        await firebase.firestore()
        .collection('Owners')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })      
    }

    //For Dialog Box
    const [visible, setVisible] = useState(false);

    //For Dialog Box
    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleUpdate = () => {
        editProfile();
        setVisible(false);
    };

    const image = {
        url: "wew",
        get gURL(){
            return this.url;
        },
        set sURL(u){
            this.url = u;
        }
    }

    var imageUUID = uuid.v4(); // generates UUID (Universally Unique Identifier)
          
    // Code for Image Picker and Uploading to Firebase storage
    const pickImage = async () => {
        //For choosing photo in the library and crop the photo
        let result = await 
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        if (!result.cancelled) {
            setURI({link: result.uri});
            setChangedIMG({bool: true});
        }
        console.log(result, changedIMG.bool); // To Display the information of image on the console

    };

    //Function to upload to Firebase storage
    const uploadImage = async(uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob(); 
        console.log('oof nakapasok pa din here');

        return new Promise(function(resolve) {
            var ref = firebase.storage().ref().child("images_ShopImages/" + imageName);
            ref.put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    console.log('File available at', downloadURL);
                    image.sURL = downloadURL;
                    console.log('from upload image: ' + image.gURL)
                    resolve('wew');
                });
            });
            /*var imageRef = firebase.storage().refFromURL(imgLink);
            imageRef.delete().then(() => {
                console.log("Deleted")
            }).catch(err => console.log(err))
            */
        })
    };

    const editProfile = async () => {

        firebase.firestore()
        .collection('Owners')
        .doc(user.uid)
        .update({
            email: userData.email,
            password: userData.password
        })
        .then(() => {
            console.log("User account updated...");
        })

        showMessage({
            message: "Profile updated successfully",
            type: "success",
            position: "top",
            statusBarHeight: 25,
            floating: "true",
            icon: { icon: "auto", position: "left" },
            autoHide: "true", 
            duration: 2000
        });
        
        await uploadImage(URI.link, imageUUID)

        showMessage({
                message: "Profile updated successfully",
                type: "success",
                position: "top",
                statusBarHeight: 25,
                floating: "true",
                icon: { icon: "auto", position: "left" },
                autoHide: "true", 
                duration: 2000
        });  
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SafeAreaView style={styles.droidSafeArea}>       
            <View style={[styles.topContainer, {flex:1}]}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#fd4140" />
                </TouchableOpacity>    
            </View>
            <View style={[styles.formContainer, {flex:15}]}>          
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Update infos about your shop.</Text>

                <ScrollView style={styles.form}>
                    <Text style={styles.formTitles}>Upload Shop Image</Text>
                    {/* Display the selected Image*/}
                    {URI && <Image source={{ uri: URI.link }} style={styles.imageUpload} />} 

                    {/* Button for Image Picker */}
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage} >
                        <Text style={styles.imageButtonLabel}>Upload Image</Text>
                    </TouchableOpacity>
               
                    <Text style={styles.formTitles}>Shop Information</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Shop Name"
                            onChangeText={text => setTextShopName(text)}
                            //value={shopName}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Shop Details"
                            multiline={true}
                            scrollEnabled={true}
                            onChangeText={text => setTextShopDetails(text)}
                            //value={shopDetails}
                        />
                    </View>

                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'money' }}
                            placeholder="Amount required per Points"
                            onChangeText={text => setShopPts(text)}
                            //value={ptsPerAmount}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            placeholder="Address"
                            onChangeText={text => setTextAddress(text)}
                            //value={address}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            placeholder="Contact Number"
                            onChangeText={text => setTextContactNo(text)}
                            //value={contactNo}
                            keyboardType="numeric"
                        />
                    </View>

                    <Text style={styles.formTitles}>Account Information</Text>

                    <View style={styles.textView}>
                        <Input
                            //Email input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            placeholder="Email"
                            onChangeText={(text) => {setUserData({...userData, email: text});}}
                            value={userData ? userData.email : ''}
                            autoCompleteType="email" 
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={(text) => {setUserData({...userData, password: text});}}
                            value={userData ? userData.password : ''}
                            autoCompleteType="password"
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Re-enter password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            placeholder="Re-enter Password"
                            onChangeText={(text) => {setPasswordReentryField({text});}}
                        />
                    </View>
                    
                </ScrollView>
                {/* Navigation isn't final */}
                
                {/*CONTINUE BUTTON AND ERROR MESSAGES*/}
                <TouchableOpacity style={styles.button} onPress={showDialog}>
                    <Text style={styles.buttonLabel}>Update Information</Text>
                </TouchableOpacity>
                <Dialog.Container contentStyle={{height: 110, paddingTop: 12, paddingRight: 19, alignItems: 'center', justifyContent:'center', borderRadius: 15}} visible={visible}>
                    <Dialog.Title style={{fontSize: 16, color: '#071964'}}>Do you really want to update profile?</Dialog.Title>
                    <Dialog.Button style={{marginRight: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Cancel" onPress={handleCancel}/>
                    <Dialog.Button style={{marginRight: 25, marginLeft: 25, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Ok" onPress={handleUpdate}/>
                </Dialog.Container>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fd4140',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '80%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    droidSafeArea: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    form: {
        width: wp('90%'),
    },
    formContainer: {
        alignItems: "center",
        borderRadius: 4,
        flex: 1,
        padding: 20,
    },
    formTitles: {
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    imageButton:{
        backgroundColor: '#ee4b43',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        width: 150,
        height: hp('6%'),
        marginTop: 5,
        marginBottom: 10
    },
    imageButtonLabel: {
        color: "#fff",
        fontSize: 14
    },
    imageUpload: {
        alignSelf: "center",
        width: 250,
        height: 200,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#ee4b43"
    },
    input: {
        height: 50,
        width: wp('80%'),
        paddingLeft: 10,
        fontSize: 16,
        justifyContent: "space-between"
        // borderWidth: 1,
        // backgroundColor: "#fff",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: hp('5%'),
        fontSize: 12,
    },
    textView: {
        width: wp('90%'),
        alignItems: 'center'
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    topContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: hp('10%'),
        width: wp('95%'),
    },
})
export default clientEditProfile;