import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import wildRentLogo from "../../assets/images/WildRentLogo.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { RootState } from "../stores";

const HeaderBar = () => {
  const navigation = useNavigation();
  const token = useSelector((state: RootState) => state.token.jwt);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <Image source={wildRentLogo} style={styles.wildRentLogo}/>
        <Ionicons
            name="md-basket"
            style={styles.headerIcon}
            // @ts-ignore
            onPress={() => token ? navigation.navigate("CustomTab", {screen: 'Accueil'}) : navigation.navigate("Register")}
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
    height: 100,
    justifyContent: "center",
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
    width: 100,
    height: 100,
  },
  headerIcon: {
    fontSize: 35,
  },
});

export default HeaderBar;
