import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import wildRentLogo from "../../assets/images/WildRentLogo.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderBar = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLogoContainer}>
        <Image source={wildRentLogo} />
      </View>
      <View style={styles.headerIconContainer}>
        <Ionicons
          name="md-basket"
          style={styles.headerIcon}
          onPress={() => navigation.navigate("Profile")}
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

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15,
    paddingTop: 50,
  },
  headerLogoContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerIcon: {
    fontSize: 35,
  },
});

export default HeaderBar;