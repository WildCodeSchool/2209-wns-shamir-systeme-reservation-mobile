import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import { setToken } from "../stores/tokenReducer";
import { showMessage } from "react-native-flash-message";
import { AuthContext } from "../context/AuthContext";

export default function ReservationScreen({navigation}) {

  const token = useSelector((state: RootState) => state.token.jwt);
  const dispatch = useDispatch();

  const {setLogged} = useContext(AuthContext);

  useEffect(() => {
    if(token){
      showMessage({
        message: "Bienvenue",
        type: "info",
      });
    }
    if(token === null){
      setLogged(false);
    }
  }, [])

  {/* Function remove token but don't refresh navigation */}
  const removeToken = async () => {
    await AsyncStorage.removeItem("@token");
    dispatch(setToken(""));
    const token = await AsyncStorage.getItem("@token");
    navigation.navigate('Accueil');
    console.log('====================================');
    console.log('token supprimé ', typeof token);
    console.log('valeur du token ', token);
    console.log('====================================');
  }
  
return (
  <View>
    <CustomButton text="LogOut" type="WILD" size="200" onPress={removeToken} />
  </View>
)
}