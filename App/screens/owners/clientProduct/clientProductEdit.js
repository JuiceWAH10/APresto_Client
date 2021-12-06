import React from 'react';
import { 
    Alert,
    Image,
    LogBox,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import uuid from 'react-native-uuid';
import { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';
import { isIOS } from 'react-native-elements/dist/helpers';
import * as crud from '../../../functions/firebaseCRUD';
import { func } from 'prop-types';

LogBox.ignoreLogs(['Setting a timer']);// To ignore the warning on uploading

function clientProductEdit(props) {
    const {product_ID, shop_ID, product_Name, price, description, stock, status, img} = props.route.params;

    const navigation = useNavigation();

    const [prodName, setTextProdName] = React.useState({
        text: product_Name,
        errorMessage: ""
    });
    const [prodDes, setTextProdDes] = React.useState({
        text: description,
        errorMessage: ""
    });
    const [prodPrice, setTextProdPrice] = React.useState({
        text: price,
        errorMessage: ""
    });
    const [prodQty, setTextProdQty] = React.useState({
        text: stock,
        errorMessage: ""
    });

    const image = {
        url: [...img],
        get gURL(){
            return this.url;
        },
        set sURL(u){
            this.url = [...this.url, u];
        },
        set dURL(u){
            this.url = this.url.filter(item => item !== u);
        }
    }

    const [URI, setURI] = React.useState([...img]);
    const [upURI, setUpURI] = React.useState([]);
    const [delURL, setDelURL] = React.useState([]);
    const [URL, setURL] =React.useState([...img]);
    const [changedIMG, setChangedIMG] = React.useState({bool: false});
    
    // Code for Image Picker and Uploading to Firebase storage
    const pickImage = async () => {
        //For choosing photo in the library and crop the photo
        let result = await 
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1,
            });
        if (!result.cancelled) {
            setURI(oldArray => [...oldArray, result.uri]);
            setUpURI(oldArray => [...oldArray, result.uri]);
            setChangedIMG({bool: true});
        }
        console.log(result, changedIMG.bool); // To Display the information of image on the console
        console.log('url' + URL)
    };

    //Function to upload to Firebase storage
    const uploadImage = async(uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob(); 
        console.log('oof nakapasok pa din here');
        return new Promise(function(resolve) {
            var ref = firebase.storage().ref().child("images_Product/" + imageName);
            ref.put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    console.log('File available at', downloadURL);
                    image.sURL = downloadURL;
                    console.log('from upload image: ' + image.gURL)
                    resolve('wew');
                });
            });
            
        })
    };
    
    const deleteImage = (url) =>{
        var imageRef = firebase.storage().refFromURL(url);
        imageRef.delete().then(() => {
            console.log("Deleted")
        }).catch(err => console.log(err))
    }

    //Display flash message 
    const successAdded = () => {
        showMessage({
            message: "Item Updated Successfully",
            type: "success",
            color: "#fff",
            position: "top",
            floating: "true",
            icon: { icon: "info", position: "left" },
            autoHide:"true", 
            duration: 1000,
        })
    };

    const updateProduct = async (prodName, prodDes, prodPrice, prodQty, prodStatus) => {
        if (prodName == '' || prodDes == '' || prodPrice == '' || prodQty == '' ) {
            showMessage({
                message: "All Fields must be filled",
                type: "danger",
                color: "#fff",
                position: "top",
                floating: "true",
                icon: { icon: "info", position: "left" },
                autoHide:"true", 
                duration: 2000,
            });
            return;
        }

        showMessage({
            message: "Item Updated Successfully",
            type: "success",
            color: "#fff",
            position: "top",
            floating: "true",
            icon: { icon: "info", position: "left" },
            autoHide:"true", 
            duration: 1000,
        });
            let count = 0;
            let done = false;
            if(upURI.length == 0) {
                updateProduct22o(prodName, prodDes, prodPrice, prodQty, prodStatus);
                delImg();
            }
            upURI.forEach(async function (url){
                console.log("FIRST")
                var imageUUID = uuid.v4(); // generates UUID (Universally Unique Identifier)
                await uploadImage(url, imageUUID);
                count+=1;
                if (count == upURI.length) {
                    updateProduct22o(prodName, prodDes, prodPrice, prodQty, prodStatus);
                    delImg();
                }
            })
        navigation.goBack();
    };

    const updateProduct22o = (prodName, prodDes, prodPrice, prodQty, prodStatus) => {
        crud.updateProduct(product_ID, prodName, prodDes, prodPrice, prodQty, prodStatus, image.gURL);
    }

    const delImg = () =>{
        console.log("delllll");
        delURL.forEach(function(url){
            deleteImage(url);
            crud.deleteProdImg(product_ID, url);
        })
    }

    const removeImgInArr = (id) => {
        console.log("id", id);
        if(isValidUrl(id)) setDelURL(prev => [...prev, id]);
        const filtered = URI.filter(item => item !== id);
        setURI([...filtered]);
        setChangedIMG({bool: true});
    }

    function isValidUrl(_string) {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(_string);
      }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Product</Text>      
            </View>
            {/* End of Top Navigation */}
 
            <ScrollView style={styles.container}>

                <Text style={styles.textInfo}>Do you like your products to be known by customers? 
                Upload an image of your product for them to see it.</Text>

                <View style={styles.shadowContainer}>
                <Text style={styles.formTitles}>Upload Image</Text>
                    {/* Display the selected Image*/}
                    <FlatList
                        horizontal={true}   
                        data={URI}
                        keyExtractor={item => item}
                        renderItem={itemData => 
                            <View>
                                <Image source={{ uri: itemData.item }} style={styles.imageUpload} />
                                <TouchableOpacity onPress={()=>removeImgInArr(itemData.item)}>
                                    {/*plz fix position*/}
                                    <Icon name="closecircleo" size={20} color="black"></Icon>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                    {/* Button for Image Picker */}
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage} >
                        <Text style={styles.imageButtonLabel}>Upload Image</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.textInfo}>Provide all the necessary informations for them to know what you 
                can offer.</Text>

                {/* Form */}
                <View style={styles.shadowContainer}>
                    <Text style={styles.formTitles}>Enter Product Name</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'archive' }}
                            placeholder="Product Name"
                            onChangeText={text => setTextProdName(state => ({...state,text}))}
                            value={prodName.text}
                            errorMessage={prodName.errorMessage}
                        />
                    </View>
                </View>

                <View style={styles.shadowContainer}>    
                    <Text style={styles.formTitles}>Enter Product Description</Text>
                    <View style={styles.textView}>
                        <Input
                            style={styles.inputArea}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            multiline={true}
                            placeholder="Product Description"
                            onChangeText={text => setTextProdDes(state => ({...state,text}))}
                            scrollEnabled={true}
                            value={prodDes.text}
                            errorMessage={prodDes.errorMessage}
                        />
                    </View>
                </View>    

                <View style={styles.shadowContainer}>
                    <View style={styles.textViewDual}>
                        <View>
                            <Text style={styles.formTitlesDual}>Enter Price</Text>
                                <Input
                                    style={styles.inputDual}
                                    leftIcon={{ type: 'font-awesome-5', name: 'coins' }}
                                    placeholder="Product Price"
                                    onChangeText={text => setTextProdPrice(state => ({...state,text}))}
                                    keyboardType="numeric"
                                    value={prodPrice.text}
                                    errorMessage={prodPrice.errorMessage}
                                />
                        </View>
                        <View>
                            <Text style={styles.formTitlesDual}>Enter Quantity</Text>
                            <Input
                                style={styles.inputDual}
                                leftIcon={{ type: 'font-awesome-5', name: 'box' }}
                                placeholder="Product Quantity"
                                onChangeText={text => setTextProdQty(state => ({...state,text}))}
                                keyboardType="numeric"
                                value={prodQty.text}
                                errorMessage={prodQty.errorMessage}
                            />
                        </View>
                    </View>
                </View>    
                
                {/* End of Form */}

                {/*<Toast ref={Toast.setRef} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Product Have been Updated',
                        visibilityTime: 1000,
                        autoHide: true,
                        topOffset: 100,
                        bottomOffset: 40,
                        })} >
                    <Text style={styles.buttonLabel}>Publish Changes</Text>
                </TouchableOpacity>
             */}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=> updateProduct(prodName.text, prodDes.text, prodPrice.text, prodQty.text, 'available')} >
                    <Text style={styles.buttonLabel}>Publish Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 10,
        height: 150,
        width: wp('90%'),
    },
    bannerDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 30,
    },
    bannerLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    button: {
        backgroundColor: '#071964',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        width: '80%',
        height: hp('6%'),
    },
    buttonContainer: {
        paddingTop: 10,
        paddingBottom: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    container:{
        flex:1,
        alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "red",
        width: wp('100%')
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        // borderWidth: 1,
        backgroundColor: "#fff"
    },
    formTitles: {
        marginLeft: wp('5%'),
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    formTitlesDual: {
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 5,
        width: wp('40%'),
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
        width: 150,
        height: 200,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#ee4b43"
    },
    input: {
        height: 50,
        width: wp('80%'),
        marginLeft: 10,
        fontSize: 16

    },
    inputArea: {
        height: 50,
        width: wp('80%'),
        marginLeft: 10,
        fontSize: 16
    },
    inputDual: {
        alignSelf: "center",
        height: 50,
        width: wp('100%'),
        // borderWidth: 1,
        // backgroundColor: "#fff",
        marginLeft: 10,
        // marginRight: 10,
        fontSize: 16
    },
    shadowContainer: {
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    subtitle: {
        textAlign: "center",
        marginBottom: hp('5%'),
        fontSize: 12,
    },
    textInfo: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        opacity: .5,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    textView: {
        padding: 6,
        alignItems: 'center'
    },
    textViewDual: {
        // padding: 6,
        alignSelf: "center",
        width: wp('85%'),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: "#ee4b43",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    topNav: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,

        backgroundColor: 'white',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
})
export default clientProductEdit;