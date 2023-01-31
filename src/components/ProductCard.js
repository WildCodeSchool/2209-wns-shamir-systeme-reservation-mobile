import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import bottesSki from "../../assets/bottesSki.jpeg";

const ProductCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={bottesSki} />
      <View style={styles.productInformation}>
        <View>
          <Text style={styles.productName}>Chaussures de ski</Text>
         {/* <Text style={styles.ProductDescription}>product description</Text> */}
        </View>
        <Text style={styles.productPrice}>Prix / Jour : 50 €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "25%",
    padding: 15,
    marginHorizontal : 10,
    marginTop: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'rgba(36, 36, 36, 0.46)',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: .6,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
 productName : {
  fontWeight: 'bold'
 }
});

export default ProductCard;
