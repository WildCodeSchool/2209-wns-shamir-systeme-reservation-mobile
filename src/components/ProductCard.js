import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";


const ProductCard = ({ product }) => {

  return (
    <View style={styles.cardContainer}>
      <Image  style={styles.image} source={{ uri: product.image }} />
      <View style={styles.productInformation}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
          {/* <Text style={styles.ProductDescription}>product description</Text> */}
        </View>
        <Text style={styles.productPrice}>Prix / Jour : {product.price} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "25%",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(36, 36, 36, 0.46)",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default ProductCard;
