import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { setToken } from "../stores/tokenReducer";

export default function ProfileScreen({navigation}) {
  const {width, height} = useWindowDimensions();

  const token = useSelector((state: RootState) => state.token.jwt);
  const dispatch = useDispatch();

  const onPress = () => {
    Alert.alert('Bien Joué !', 'Juste pour voir si ça fonctionné', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  useEffect(() => {
    if(token){
      showMessage({
        message: "Bienvenue",
        type: "info",
      });
    }
  }, [])

  // Function remove token
  const LogOut = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(setToken(""));
    navigation.navigate("CustomTab", {screen: 'Accueil'});
    const tok = SecureStore.getItemAsync("token");
    console.log('====================================');
    console.log('valeur du token DANS AUTH ========= ', tok);
    console.log('====================================');
  }  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <FlashMessage position="top"/>
        <LinearGradient colors={['#034F6A', '#1D9BD1', '#034F6A']} style={[styles.headColor, {width: width * 2, height: width * 2, marginLeft: - (width / 2), borderRadius: width,}]}/>
        <View style={styles.profileContainer}>
          <Text style={styles.nameText}>Nom Prénom</Text>
          <Image
            style={styles.profilePhoto}
            source={{uri: 'https://picsum.photos/200'}}
          />
          <TouchableOpacity>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Text style={[styles.btnModify, styles.btnProfil]}>Modifier mon compte</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity onPress={LogOut}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={[styles.btnLogOut, styles.btnProfil]}>Déconnexion</Text>
              </View>
          </TouchableOpacity >
        </View>
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Mes Commandes</Text>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.textOrder}>Commande N°3403</Text>
            <Text style={styles.textArticle}>3 articles</Text>
            <Text style={styles.date}>20/02/2023</Text>
            <Pressable style={styles.btnOrder}>
              <Ionicons name="eye-outline" size={28} color="#1D9BD1" onPress={onPress}/>
            </Pressable >
          </View>
          <View style={styles.card}>
            <Text style={styles.textOrder}>Commande N°3403</Text>
            <Text style={styles.textArticle}>3 articles</Text>
            <Text style={styles.date}>20/02/2023</Text>
            <Pressable style={styles.btnOrder}>
              <Ionicons name="eye-outline" size={28} color="#1D9BD1" onPress={onPress}/>
            </Pressable >
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headColor: {
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 50,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 20,
    borderColor: "rgba(29, 156, 211, 0.53)",
    borderWidth: 10,
  },
  btnProfil: {
    textAlign: 'center',
    padding: 5,
    fontSize: 14, 
    borderRadius: 5,
    color: '#fff',
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnModify: {
    backgroundColor: "#04678b",
    width: 200,
    marginBottom: 5,
  },
  nameText: {
    color: "#fff",
    fontSize: 16
  },
  btnLogOut: {
    marginTop: 10,
    backgroundColor: "#045877",
    width: 150,
  },
  main:{
    flex: 1,
    zIndex: -10,
    marginTop: -50,
    paddingTop: 70,
    paddingBottom: 50,
    backgroundColor: "#fafafa",
  },
  title:{
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  row:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  card:{
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
  },
  textOrder:{},
  textArticle:{},
  btnOrder: {
    position: 'absolute',
    right: 8,
    top: 4
  },
  date:{
    alignSelf: 'flex-end',
  },
});