import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./src/screens/HomeScreen";
import CatalogScreen from "./src/screens/CatalogScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import wildRentLogo from "./assets/images/WildRentLogo.png";

const Stack = createStackNavigator();

const TabBottom = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLogoContainer}>
          <Image source={wildRentLogo} style={styles.headerLogo} />
        </View>
        <View style={styles.headerIconContainer}>
        <Ionicons name="md-basket" style={styles.headerIcon} />
      </View>
        </View>
       
      <NavigationContainer>
        <TabBottom.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 60,
            },
            tabBarItemStyle: {
              backgroundColor: "#fff",
              padding: 5,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Accueil") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Catalogue") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "Reservations") {
                iconName = focused ? "briefcase" : "briefcase-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#0d7ebf",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <TabBottom.Screen name="Accueil" component={HomeScreen} />
          <TabBottom.Screen name="Catalogue" component={CatalogScreen} />
          <TabBottom.Screen name="Reservations" component={CatalogScreen} />
          <TabBottom.Screen name="Profile" component={ProfileScreen} />
        </TabBottom.Navigator>
      </NavigationContainer>
    </View>
  );
}

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
    paddingTop: 50
  },
  headerLogoContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerIconContainer :{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerIcon : {
    fontSize: 35
  }
});
