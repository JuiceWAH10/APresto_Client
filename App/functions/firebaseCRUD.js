//iedit pa to
import firebase from "firebase";
import Toast from 'react-native-toast-message';
import React from 'react';
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

export function createProduct(prodName, prodDes, prodPrice, prodQty, status, imgLink, shop_ID){

    const db = firebase.firestore();
    const ref = db.collection('Products').doc();
    const id = ref.id;

    <Toast ref={Toast.setRef} />
    
    firebase.firestore()
    .collection('Products')
    .doc(id)
    .set({
        product_ID: id,
        shop_ID: shop_ID,
        product_Name: prodName,
        description: prodDes,
        price: parseFloat(prodPrice),
        quantity: parseInt(prodQty),
        status: status,
        imgLink: imgLink,
        type: 'product',
        sold: 0
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data)
        addNewProductToSales(shop_ID, prodName);
        
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
}

export function createReward(rewName, rewDes, rewPoints, rewQty, status, imgLink, shop_ID){

    const db = firebase.firestore();
    const ref = db.collection('Rewards').doc();
    const id = ref.id;

    <Toast ref={Toast.setRef} />
    
    firebase.firestore()
    .collection('Rewards')
    .doc(id)
    .set({
        reward_ID: id,
        shop_ID: shop_ID,
        reward_Name: rewName,
        description: rewDes,
        pointsReq: parseFloat(rewPoints),
        quantity: parseInt(rewQty),
        status: status,
        imgLink: imgLink,
        type: 'reward',
        sold: 0
    })
    .then((data)=>{
        //success callback
        console.log('data ' , data)
        addNewRewardToSales(shop_ID, rewName)
        
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

export function deleteProdImg(prod_ID, imgLink){
    firebase.firestore()
    .collection('Products')
    .doc(prod_ID)
    .update({
        imgLink: firebase.firestore.FieldValue.arrayRemove(imgLink)
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

export function deleteRewImg(reward_ID, imgLink){
    firebase.firestore()
    .collection('Rewards')
    .doc(reward_ID)
    .update({
        imgLink: firebase.firestore.FieldValue.arrayRemove(imgLink)
    });
}

export function deleteProduct(product_ID, imgLink, shop_ID, product_Name){
    firebase.firestore()
    .collection('Products')
    .doc(product_ID)
    .delete()
    .then(() => {
        console.log("Document successfully deleted!");
        imgLink.forEach(element => {
            var imageRef = firebase.storage().refFromURL(element);
        
            imageRef.delete()
                .then(() => {
                    console.log("Deleted")
                })
                .catch(err => console.log(err))
        });
        
        deleteProductSales(shop_ID, product_Name);
    })
    .catch((error) => {
        console.error("Error removing document: ", error);
    });
}

export function deleteReward(reward_ID, imgLink, shop_ID, reward_Name){
    firebase.firestore()
    .collection('Rewards')
    .doc(reward_ID)
    .delete()
    .then(() => {
        console.log("Document successfully deleted!");
        
        imgLink.forEach(element => {
            var imageRef = firebase.storage().refFromURL(element);
            
            imageRef.delete()
                .then(() => {
                    console.log("Deleted")
                })
                .catch(err => console.log(err))
        });

        deleteRewardSales(shop_ID, reward_Name);
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

export function updateProductStatus(product_ID, status){
    firebase.firestore().collection('Products')
    .doc(product_ID)
    .update({
        status: status
    })
}

export function updateRewardStatus(reward_ID, status){
    firebase.firestore().collection('Rewards')
    .doc(reward_ID)
    .update({
        status: status
    })
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
        contact_Number: parseInt(contact_Number),
        ptsPerAmount: parseInt(ptsPerAmount),
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
    if(suki_ID !== "Guest"){
        firebase.firestore()
        .collection('Suki')
        .doc(suki_ID)
        .update({
            points: firebase.firestore.FieldValue.increment(ptsEarned)
        })
        .catch()
    }
}

export function subtCustomerPoints(suki_ID, ptsDeduct){
    const subt = Math.abs(ptsDeduct) * -1;
    if(suki_ID !== "Guest"){
        firebase.firestore()
        .collection('Suki')
        .doc(suki_ID)
        .update({
            points: firebase.firestore.FieldValue.increment(subt),
            points_Used: firebase.firestore.FieldValue.increment(ptsDeduct)
        })
        .catch()
    }
}

export function addNewProductToSales(store_ID, product_Name){
    firebase.firestore().collection('Sales')
    .doc(store_ID)
    .set({
        Products: {
          [product_Name]: 0
        }
      }, {merge:true})
}

export function addNewRewardToSales(store_ID, reward_Name){
    firebase.firestore().collection('Sales')
    .doc(store_ID)
    .set({
        Rewards: {
            [reward_Name]: 0
        }
      }, {merge:true})
}

export function deleteProductSales(store_ID, reward_Name){
    firebase.firestore().collection("Sales")
    .doc(store_ID)
    .set({
        Products: {
            [reward_Name]: firebase.firestore.FieldValue.delete(),
        }
    }, {merge:true})
}

export function deleteRewardSales(store_ID, product_Name){
    firebase.firestore().collection("Sales")
    .doc(store_ID)
    .set({
        Rewards: {
            [product_Name]: firebase.firestore.FieldValue.delete(),
        }
    }, {merge:true})
}

export function updateSales(store_ID, purchasedProducts, redeemedRewards, totalAmount, ptsDeduct){
    const db = firebase.firestore();
    const ref = db.collection('Sales').doc(store_ID);
    var prodTally = 0;
    var rewTally = 0;

    purchasedProducts.map(product => {
        prodTally = prodTally + product.quantity,
        ref.set({
            Products:{
                [product.productTitle]: firebase.firestore.FieldValue.increment(product.quantity)
            }
        }, {merge:true}),
        updateProductQuantity(product.product_ID, product.quantity, product.productTitle, store_ID),
        updateProductSold(product.product_ID, product.quantity)}
    )

    redeemedRewards.map(reward => {
        ref.set({
            Rewards:{
                [reward.productTitle]: firebase.firestore.FieldValue.increment(reward.quantity)
            } 
        }, {merge:true}),
        rewTally = rewTally + reward.quantity,
        updateRewardQuantity(reward.reward_ID, reward.quantity, reward.productTitle, store_ID),
        updateRewardSold(reward.reward_ID, reward.quantity)}
    )

    ref.set({
        totalRedeem: firebase.firestore.FieldValue.increment(ptsDeduct),
        totalSales: firebase.firestore.FieldValue.increment(totalAmount),
        salesTally: firebase.firestore.FieldValue.increment(prodTally),
        redeemTally: firebase.firestore.FieldValue.increment(rewTally)
    }, {merge:true})
}

export function addDelisted(item, store_ID){
    const db = firebase.firestore();
    const ref = db.collection('Delisted').doc();
    const id = ref.id;

    firebase.firestore()
    .collection('Delisted')
    .doc(id)
    .set({
        item: item,
        store_ID: store_ID
    })
}

export function updateProductQuantity(product_ID, quantity, productTitle, store_ID){
    const db = firebase.firestore();
    const ref = db.collection('Products').doc(product_ID);

    db.runTransaction((transaction)=>{
        return transaction.get(ref).then((refDoc)=>{
            console.log("refkwan " + refDoc.data().quantity + " kwan "+ quantity )
            var newQuantity = refDoc.data().quantity - quantity;
            console.log("nyukwantiti " + newQuantity);
            if(newQuantity > 0){
                transaction.update(ref, {quantity: newQuantity})
            }
            else{
                addDelisted(productTitle, store_ID);
                transaction.update(ref, {quantity: 0, status: "delisted"});
            }
        })
    })
    .then(success => {

    })
    .catch((err)=> console.error(err, " bobo mo"))
}

export function updateProductSold(product_ID, quantity){
    firebase.firestore().collection('Products')
    .doc(product_ID)
    .set({
        sold: firebase.firestore.FieldValue.increment(quantity)
    },{merge:true})
}

export function updateRewardQuantity(reward_ID, quantity, productTitle, store_ID){
    const db = firebase.firestore();
    const ref = db.collection('Rewards').doc(reward_ID);

    db.runTransaction((transaction)=>{
        return transaction.get(ref).then((refDoc)=>{
            console.log("refkwan " + refDoc.data().quantity + " kwan "+ quantity );
            var newQuantity = refDoc.data().quantity - quantity;
            if(newQuantity > 0){
                transaction.update(ref, {quantity: newQuantity})
            }
            else{
                addDelisted(productTitle, store_ID);
                transaction.update(ref, {quantity: 0, status: "delisted"});
            }
        })
    })
    .catch((err)=> console.error(err, " bobo mo"))
}

export function updateRewardSold(reward_ID, quantity){
    firebase.firestore().collection('Rewards')
    .doc(reward_ID)
    .set({
        sold: firebase.firestore.FieldValue.increment(quantity)
    },{merge:true})
}

export function incrementSukiTrans(suki_ID){
    if(suki_ID !== "Guest"){
        firebase.firestore().collection('Suki')
        .doc(suki_ID)
        .update({
            transactions: firebase.firestore.FieldValue.increment(1)
        })
        .catch()
    }
}

export function incrementStoreTrans(store_ID){
    firebase.firestore().collection('Sales')
    .doc(store_ID)
    .update({
        transTally: firebase.firestore.FieldValue.increment(1)
    })
}

export function afterTransAddNewSuki(customer_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards, store_ID, owner_ID, username){
    const db = firebase.firestore();
    const ref = db.collection('Products').doc();
    const suki_ID = ref.id;

    firebase.firestore().collection('Suki')
    .doc(suki_ID)
    .set({
        customer_ID: customer_ID,
        suki_ID: suki_ID,
        owner_ID: owner_ID,
        points: 0,
        points_Used: 0,
        transactions: 0,
        username: username
    })
    .then(
        recordTransaction(customer_ID, suki_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards, store_ID)
    )
}

export function recordTransaction(customer_ID, suki_ID, totalAmount, ptsEarned, ptsDeduct, purchasedProducts, redeemedRewards, store_ID){
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
        store_ID: store_ID,
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
        updateSales(store_ID, purchasedProducts, redeemedRewards, totalAmount, ptsDeduct);
        incrementSukiTrans(suki_ID);
        incrementStoreTrans(store_ID);       
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
    
    return id;
}