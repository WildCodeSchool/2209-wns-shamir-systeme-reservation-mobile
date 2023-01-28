import React, { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import home from "../../assets/images/home.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  async function getToken() {
    const token = await AsyncStorage.getItem("@token");
    console.log('====================================');
    console.log('le token dans la home ', token);
    console.log('====================================');
    if(token != null){
      showMessage({
        message: "Bienvenue",
        type: "info",
      });
    }
  };

  useEffect(() => {
    getToken();
  }, [])

  {/* Function remove token but don't refresh navigation */}
  const removeToken = async () => {
    await AsyncStorage.removeItem("@token");
    const token = await AsyncStorage.getItem("@token");
    navigation.navigate('Accueil');
    console.log('====================================');
    console.log('token supprimé ', typeof token);
    console.log('valeur du token ', token);
    console.log('====================================');
  }

  return (
      <View style={styles.container}>
        <FlashMessage position="top" />
        <ImageBackground source={home} resizeMode="cover" style={styles.image}>
          <StatusBar barStyle="dark-content" />
          {/* Bouton à supprimer, à déplacer */}
          <View style={styles.root}>
            <CustomButton text="LogOut" type="WILD" size="200" onPress={removeToken}/>
          </View>
        </ImageBackground>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});