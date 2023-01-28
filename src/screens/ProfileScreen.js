import React from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen() {
  const {width, height} = useWindowDimensions();

  const onPress = () => {
    Alert.alert('Bien Joué !', 'Juste pour voir si ça fonctionné', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <LinearGradient colors={['#034F6A', '#1D9BD1', '#034F6A']} style={[styles.headColor, {width: width * 2, height: width * 2, marginLeft: - (width / 2), borderRadius: width,}]}/>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{uri: 'https://picsum.photos/200'}}
          />
          <Text style={styles.nameText}>Nom Prénom</Text>
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
    marginTop: 70,
    paddingBottom: 50,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    borderColor: "rgba(29, 156, 211, 0.53)",
    borderWidth: 10,
  },
  nameText: {
    color: "#fff",
    fontSize: 16
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