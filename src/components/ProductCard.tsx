import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import IProduct from "../interfaces/IProduct";
import IProductProps from "../interfaces/IProductProps";
import { RootState } from "../stores";

const ProductCard = ({ product }: IProductProps) => {
 
  const route = useRoute().name;
  const isProductsByDate = useSelector(
    (state: RootState) => state.products.isProductsByDate
  );

  return (
    <View
      style={
        route === "Catalogue"
          ? styles.cardContainerCatalog
          : styles.cardContainerHome
      }
    >
      <Image
        style={route === "Catalogue" ? styles.imageCatalog : styles.imageHome}
        source={{ uri: product.image }}
      />

      <View style={{ justifyContent: "space-between", flexGrow: 1 }}>
        <Text style={styles.productName}>{product.name}</Text>
        <View>
          <Text>{product.description}</Text>
          <Text>Prix / Jour : {product.price} €</Text>
          { isProductsByDate && <TouchableOpacity >
                <Text style={styles.button}>
                  Ajouter au panier
                </Text>
            </TouchableOpacity> }
        </View>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainerHome: {
    flex: 1,
    paddingHorizontal: 15,
    margin: 10,
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
  cardContainerCatalog: {
    width: "49%",
    minWidth: 150,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(36, 36, 36, 0.46)",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  productName: {
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 12,
  },
  imageHome: {
    height: 200,
    width: 200,
  },
  imageCatalog: {
    height: 140,
    width: 140,
  },

  button: {
    width: 140,
    padding: 2,
    textAlign: "center",
    opacity: 0.8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 15,
    color: "white",
    backgroundColor: "rgba(13, 131, 171, 0.3)",
    alignSelf:"center",
    marginTop : 5
  },
});

export default ProductCard;
