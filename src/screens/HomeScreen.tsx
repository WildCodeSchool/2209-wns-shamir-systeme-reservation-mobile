import React, { useState } from "react";
import FlashMessage from "react-native-flash-message";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import home from "../../assets/images/home.jpg";
import service_rapide from "../../assets/images/foudre.png";
import hotline from "../../assets/images/hotline.png";
import paiements_sec from "../../assets/images/card.png";
import skieur from '../../assets/images/skieur.jpg';
import ProductCard from "../components/ProductCard";
import IProduct from "../interfaces/IProduct";
import { useQuery } from "@apollo/client";
import { GET_LAST_FOUR_PRODUCTS } from "../Tools/Query";

export default function HomeScreen({navigation}) {

  const [lastFourProducts, setlastFourProducts ] = useState<IProduct[]>([]);

  const {
    loading: loadingLastFourProducts,
    data: dataLastFourProducts,
    error: errorLastFourProducts,
  } = useQuery(GET_LAST_FOUR_PRODUCTS, {
    onCompleted: (dataLastFourProducts) => {
      setlastFourProducts(dataLastFourProducts.getLastFourProducts);
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlashMessage position="top" />
        <View style={{ flex: 1, width: "100%" }}>
          <ImageBackground
            source={home}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.buttonView}>
              <Text
                onPress={() => navigation.navigate('Catalogue')}
                style={styles.button}
              >
                Rechercher les produits
              </Text>
            </View>
          </ImageBackground>
        </View>
        <Text
          style={{
            flex: 1,
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Derniers Produits Ajoutés
        </Text>
        <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
          <ScrollView horizontal>
            {
              lastFourProducts.map((product) => {
               return <ProductCard key={product.id} product={product} />
              })
            }           
          </ScrollView>
        </View>
      </View>
      <View style={styles.homeServicesContainer}>
        <View style={styles.homeServices}>
          <ImageBackground source={home} resizeMode="cover">
            <View style={{ backgroundColor: "#175e81b3", paddingVertical: 20 }}>
              <Text style={styles.homeServicesTitle}>
                Une expertise à votre service
              </Text>
              <View style={styles.service}>
                <Image style={styles.serviceImage} source={hotline} />
                <Text style={styles.serviceText}>Hotline</Text>
                <Text style={styles.serviceText}>06 70 45 65 72</Text>
              </View>
              <View style={styles.service}>
                <Image style={styles.serviceImage} source={service_rapide} />
                <Text style={styles.serviceText}>Service Rapide</Text>
                <Text style={styles.serviceText}>Retrait sous 1 heure</Text>
              </View>
              <View style={styles.service}>
                <Image style={styles.serviceImage} source={paiements_sec} />
                <Text style={styles.serviceText}>Paiements Sécurisés</Text>
                <Text style={styles.serviceText}>CB, Paypal, ApplePay</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View>
        <Text style={styles.homeEndTitle}>Title</Text>
        <Text style={styles.homeEndDescription}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis dolorum suscipit dolorem distinctio nesciunt blanditiis ducimus obcaecati numquam repellendus nemo ipsum consectetur veniam quas, accusamus quam! Possimus reprehenderit assumenda tempore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos deserunt aliquid exercitationem quos quas aspernatur eum ea nulla at, tempore harum, amet numquam eius, nisi quae in aperiam quod magnam?</Text>
        <Image source={skieur} resizeMode="cover" style={styles.imageMountain} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    top: -30,
    width: "100%",
    height: 550,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "70%",
    padding: 15,
    textAlign: "center",
    opacity: 0.8,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    fontSize: 15,
    color: "white",
    backgroundColor: "transparent",
  },
  homeServicesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  homeServicesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center"
  },
  homeServices: {
    width: "100%",
  },
  service: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50
  },
  serviceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  serviceImage: {
    marginBottom: 30
  },
  imageMountain : {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: 550,
  },
  homeEndTitle : {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20
  },
  homeEndDescription : {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 50
  }
});