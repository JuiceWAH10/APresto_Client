import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet,  
    Image
} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const SLIDER_WIDTH = wp('100%')
export const ITEM_WIDTH = wp('90%')

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        // resizeMode={'contain'}
        borderTopLeftRadius= {20}
        borderTopRightRadius= {20}
        source={item.img}
        style={styles.image}
      />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
} 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: ITEM_WIDTH,
    height: 320,
    // paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
    marginBottom: 5,
    marginTop: 10
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
  header: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem