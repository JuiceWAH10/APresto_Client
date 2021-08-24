//iedit pa to
import firebase from "firebase";
import Toast from 'react-native-toast-message';
import React from 'react';

import Products from '../models/products';

/*
{
        product_ID: id,
        shop_ID: "1",
        product_Name: prodName,
        description: prodDes,
        quantity: prodQty,
        status: status,
        imgLink: imgLink
    }

            Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Product Have been Added',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 100,
            bottomOffset: 40,
        })
*/

export function createProduct(prodName, prodDes, prodPrice, prodQty, status, imgLink){

    const db = firebase.firestore();
    const ref = db.collection('Products').doc();
    const id = ref.id;

    <Toast ref={Toast.setRef} />
    
    firebase.firestore()
    .collection('Products')
    .doc(id)
    .set({
        product_ID: id,
        shop_ID: "1",
        product_Name: prodName,
        description: prodDes,
        price: parseFloat(prodPrice),
        quantity: parseInt(prodQty),
        status: status,
        imgLink: imgLink
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data)
        
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
}

export function createReward(rewName, rewDes, rewPoints, rewQty, status, imgLink){

    const db = firebase.firestore();
    const ref = db.collection('Products').doc();
    const id = ref.id;

    <Toast ref={Toast.setRef} />
    
    firebase.firestore()
    .collection('Rewards')
    .doc(id)
    .set({
        reward_ID: id,
        shop_ID: "1",
        reward_Name: rewName,
        description: rewDes,
        pointsReq: parseFloat(rewPoints),
        quantity: parseInt(rewQty),
        status: status,
        imgLink: imgLink
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data)
        
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
}



{/*
    this const could be used to read data into reducers
    const getLocation = () => {
    return firebase.firestore()
            .collection("users")
            .doc(currentUser.uid)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    data = doc.data();
                    return data.businessDetails.businessLocation;
                } else {
                    return "";
                }
            });
};

    //needs adjustment, must integrate to reducer
export function readAllProducts(){
    return firebase.firestore()
    .collection('Products')
    .onSnapshot(querySnapshot => {
        const products = [];
        querySnapshot.forEach(function (product){         
            products.push(product.data());
            console.log(product.data());
        });
        return products;
    })
}
    
    let prods = new Products
                        (
                            product.product_ID, 
                            product.shop_ID, 
                            product.product_Name, 
                            product.price, 
                            product.quantity, 
                            product.description, 
                            product.status, 
                            product.imgLink
                        );
                    
    export function readRecord() {
    const allProducts = firebase.firestore().collection('Products');
    allProducts.on('value').then(snapshot => {
        // snapshot.val() is the dictionary with all your keys/values from the collection
        console.log(snapshot.val())
    })
}

*/}

//needs adjustment


//too slow needs adjustment
export function updateProduct(prod_ID, prodName, prodDes, prodPrice, prodQty, status, imgLink){
    firebase.firestore()
    .collection('Products')
    .doc(prod_ID)
    .update({
        product_Name: prodName,
        description: prodDes,
        price: parseFloat(prodPrice),
        quantity: parseInt(prodQty),
        status: status,
        imgLink: imgLink
    });
}

export function updateReward(rewID, rewName, rewDes, rewPoints, rewQty, status, imgLink){
    firebase.firestore()
    .collection('Rewards')
    .doc(rewID)
    .update({
        reward_Name: rewName,
        description: rewDes,
        pointsReq: parseFloat(rewPoints),
        quantity: parseInt(rewQty),
        status: status,
        imgLink: imgLink
    });
}

export function deleteProduct(product_ID, imgLink){
    firebase.firestore().collection('Products').doc(product_ID).delete().then(() => {
        console.log("Document successfully deleted!");
        var imageRef = firebase.storage().refFromURL(imgLink);
            imageRef.delete().then(() => {
                console.log("Deleted")
            }).catch(err => console.log(err))
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

export function deleteReward(reward_ID, imgLink){
    firebase.firestore().collection('Rewards').doc(reward_ID).delete().then(() => {
        console.log("Document successfully deleted!");
        var imageRef = firebase.storage().refFromURL(imgLink);
            imageRef.delete().then(() => {
                console.log("Deleted")
            }).catch(err => console.log(err))
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}