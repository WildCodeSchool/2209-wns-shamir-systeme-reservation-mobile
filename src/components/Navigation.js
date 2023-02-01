import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import CatalogScreen from "../screens/CatalogScreen";
import { AuthProvider } from "../context/AuthContext";
import Register from "../screens/Register/Register";
import SignIn from "../screens/SignIn/SignIn";
import { Image, StyleSheet, View } from "react-native";
import HeaderBar from "./HeaderBar";

const TabBottom = createBottomTabNavigator()
const Navigation = () => {
  // ------- Il faut enregistrer si on veut voir les changements de la nav (si connecté ou non) ------- \\
  const [isSignedIn, setSignedIn] = useState(false);

  async function getToken() {
    const token = await AsyncStorage.getItem("@token");
    console.log("token dans nav ", token);
    if (token != null) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
      <HeaderBar />
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
                iconName = focused ? "person-circle" : "person-circle-outline";
              } else if (route.name === "Register") {
                iconName = focused ? "log-in" : "log-in-outline";
              } else if (route.name === "SignIn") {
                iconName = focused ? "log-in" : "log-in-outline";
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
          {isSignedIn ? (
            <>
              <TabBottom.Screen name="Profile" component={ProfileScreen} />
            </>
          ) : (
            <>
              <TabBottom.Screen name="Register" component={Register} />
              {/* À déplacer dans la nav du haut  */}
              <TabBottom.Screen name="SignIn" component={SignIn} />
            </>
          )}
        </TabBottom.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};



export default Navigation;
