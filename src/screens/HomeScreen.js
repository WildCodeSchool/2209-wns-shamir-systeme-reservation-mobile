import React from "react";
import {
  Button,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import home from "../../assets/images/home.jpg";


export default function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1, width: "100%" }}>
          <ImageBackground
            source={home}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.buttonView}>
              <Text
                onPress={() => navigation.navigate("Catalogue")}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                style={styles.button}
              >
                Rechercher les produits
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View></View>
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
    top: -60,
    width: "100%",
    height: 550,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    color: "black",
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
});
