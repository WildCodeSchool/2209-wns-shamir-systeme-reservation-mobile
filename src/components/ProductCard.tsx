import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import IProduct from "../interfaces/IProduct";
import IProductProps from "../interfaces/IProductProps";

const ProductCard = ({ product }: IProductProps) => {
  const navigation = useNavigation();
  const route = useRoute().name;

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
        </View>
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
    width: "48%",
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
    fontSize: 12
  },
  imageHome: {
    height: 200,
    width: 200,
  },
  imageCatalog: {
    height: 120,
    width: 120
  },
});

export default ProductCard;
