//iedit pa to
import firebase from "firebase";
import Toast from 'react-native-toast-message';
import React from 'react';

import Products from '../models/products';


/*
export async function getStoreList(){
    let storeList = [];
    const uID = await firebase.auth().currentUser;
    const db = firebase.firestore();
    const ref = db.collection('Owners').doc(uID);
    const stores = await ref.get(result =>{
        //for(i = 0; i < result.data().stores.length; i++){
        result.data().stores.forEach(i => {
            storeList.push(i);
        });
            
        
    });

    return storeList;
}


firebase.firestore()
            .collection('Products')
            .onSnapshot(querySnapshot => {
                const prod = [];
                querySnapshot.forEach(function (product){         
                    prod.push(product.data());
                });
                setProducts(prod);
            });


            firebase.firestore().collection('Shops').doc('iKEURTQ2qIYY3UB76LCa')
            .get()
            .then(doc => {
                return doc.data().ownerShops
            })
            // then search the participants sub collection of the event
            .then(shops => {
                firebase.firestore().doc('EvsNQiBqKjJmTF5Fi0zY').collection('Products')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(function (product){         
                        prod.push(product.data());
                    });
                    setProducts(prod);
                })
                .catch(e => {console.error(e)})
            })
/*
// will try later
            firebase.firestore().doc(`users/${this.props.currentUser.uid}`)
            .get()
            .then(doc => {
                return doc.data().friends
            })
            // then search the participants sub collection of the event
            .then(friends => {
                firebase.firestore().collection('events')
                .get()
                .then(eventsSnapshot => {
                    eventsSnapshot.forEach(doc => {
                        const { type, date, event_author, comment } = doc.data();
                        let event = {
                            doc, 
                            id: doc.id,
                            type,
                            event_author,
                            participants: [],
                            date,
                            comment,
                        }
                        firebase.firestore().collection('events').doc(doc.id).collection('participants')
                        .get()
                        .then(participantsSnapshot => {
                            for(let i=0; i<participantsSnapshot.size;i++) {
                                if(participantsSnapshot.docs[i].exists) {
                                    // if participant uid is in friends array, add event to events array
                                    if(friends.includes(participantsSnapshot.docs[i].data().uid)) {
                                        // add participant to event
                                        let { displayName, uid } = participantsSnapshot.docs[i].data();
                                        let participant = { displayName, uid }
                                        event['participants'].push(participant)
                                        events.push(event)
                                        break;
                                    }
                                }
                            }
                        })
                        .then(() => {
                            console.log(events)
                            this.props.dispatch(updateEvents(events))
                        })
                        .catch(e => {console.error(e)})
                    })
                })
                .catch(e => {console.error(e)})
            })





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
        imgLink: imgLink,
        type: 'product'
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
        imgLink: imgLink,
        type: 'reward'
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

export function editStore(imgLink, store_ID, address, contact_Number, ptsPerAmount, specialty, store_Name){

    const id = store_ID;

    <Toast ref={Toast.setRef} />

    firebase.firestore()
    .collection('Stores')
    .doc(id)
    .update({
        imgLink: imgLink,
        address: address,
        contact_Number: contact_Number,
        ptsPerAmount: ptsPerAmount,
        specialty: specialty,
        store_Name: store_Name
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data)
        
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
}

export function addCustomerPoints(suki_ID, ptsEarned){
    firebase.firestore()
    .collection('Suki')
    .doc(suki_ID)
    .update({
        points: firebase.firestore.FieldValue.increment(ptsEarned)
    })
}

export function subtCustomerPoints(suki_ID, ptsDeduct){
    const subt = Math.abs(ptsDeduct) * -1
    firebase.firestore()
    .collection('Suki')
    .doc(suki_ID)
    .update({
        points: firebase.firestore.FieldValue.increment(subt),
        points_Used: firebase.firestore.FieldValue.increment(ptsDeduct)
    })
}

export function recordTransaction(customer_ID, suki_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards){

    const db = firebase.firestore();
    const ref = db.collection('Transactions').doc();
    const id = ref.id;

    <Toast ref={Toast.setRef} />
    
    firebase.firestore()
    .collection('Transactions')
    .doc(id)
    .set({
        trans_ID: id,
        customer_ID: customer_ID,
        store_ID: 'DdMGRnmbou1yL467083R',
        totalAmount: parseFloat(totalAmount),
        ptsEarned: parseFloat(ptsEarned),
        ptsDeduct:parseFloat(ptsDeduct),
        purchasedProducts:purchasedProducts,
        redeemedRewards:redeemedRewards,
        date: firebase.firestore.Timestamp.now()
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data);
        addCustomerPoints(suki_ID, ptsEarned);
        subtCustomerPoints(suki_ID, ptsDeduct);
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
    return id;
}