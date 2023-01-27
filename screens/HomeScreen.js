import React from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import home from "../assets/images/home.jpg";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={home} resizeMode="cover" style={styles.image}>
      <StatusBar style="auto" />
    </ImageBackground>
    </View>
    
    
  );


 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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