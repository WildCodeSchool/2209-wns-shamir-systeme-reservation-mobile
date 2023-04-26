import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";// @ts-ignore
import wildRentLogo from "../../assets/images/WildRentLogo.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const HeaderBar = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.token.jwt);
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <Image source={wildRentLogo} style={styles.wildRentLogo}/>
        <Ionicons
            name="md-basket"
            style={styles.headerIcon}
            color={ cart.length ? "black" : "white" }// @ts-ignore
            onPress={() =>  navigation.navigate("Cart")}
          />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#9DBDD3",
    height: 85,
    justifyContent: "center",
    paddingTop: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 20
  },
  wildRentLogo: {
    resizeMode: "contain",
    width: 65,
    height: 65,
  },
  headerIcon: {
    fontSize: 35,
  },
});

export default HeaderBar;
