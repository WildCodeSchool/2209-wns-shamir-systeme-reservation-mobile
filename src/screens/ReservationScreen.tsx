import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ReservatiionScreen({navigation}) {
  const removeToken = async () => {
    await AsyncStorage.removeItem("@token");
    const token = await AsyncStorage.getItem("@token");
    navigation.navigate("Accueil");
    console.log("====================================");
    console.log("token supprimé ", typeof token);
    console.log("valeur du token ", token);
    console.log("====================================");
  };
return (
  <View>
    <CustomButton text="LogOut" type="WILD" size="200" onPress={removeToken} />
  </View>
)
}