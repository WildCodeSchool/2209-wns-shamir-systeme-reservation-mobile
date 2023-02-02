import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import IProduct from "../interfaces/IProduct";
import IProductProps from "../interfaces/IProductProps";


const ProductCard = ({ product }: IProductProps) => {
  const navigation = useNavigation();
  const route = useRoute().name;

  return (
    <View  style={  route === "Catalogue" ?  styles.cardContainerCatalog : styles.cardContainerHome}>
      <Image style={  route === "Catalogue" ? styles.imageCatalog : styles.imageHome} source={{ uri: product.image }} />
      <View>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
        { route === "Catalogue" ? <Text>{product.description}</Text> : ''}
        </View>
        <Text >Prix / Jour : {product.price} €</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainerHome: {
    flex: 1,
    padding: 15,
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
    flex: 1,
    width: 325,
    height: 400,
    padding: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(36, 36, 36, 0.46)",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  productName: {
    fontWeight: "bold",
    marginBottom: 10
  },
  imageHome: {
    height: 200,
    width: 200,
  },
  imageCatalog: {
    height: 150,
    width: 150,
  },
});

export default ProductCard;
