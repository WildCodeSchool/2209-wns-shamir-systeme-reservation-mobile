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
        <Ionicons
            name={token ? "person-circle" : "log-in"}
            style={styles.headerIcon}
            // @ts-ignore
            onPress={() => token ? navigation.navigate("Profile") : navigation.navigate("SignIn")}
          />
        <Image source={wildRentLogo} style={styles.wildRentLogo}/>
        <Ionicons
            name="md-basket"
            style={styles.headerIcon}
            // @ts-ignore
            onPress={() => token ? navigation.navigate("CustomTab", {screen: 'Accueil'}) : navigation.navigate("SignIn")}
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
    justifyContent: "space-evenly",
    paddingTop: 20,
  },
  wildRentLogo: {
    resizeMode: "center",
  },
  headerIcon: {
    fontSize: 35,
  },
});

export default HeaderBar;
