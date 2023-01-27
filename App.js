import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CatalogScreen from "./screens/CatalogScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "./screens/LoginScreen";
import { useState } from "react";

const TabBottom = createBottomTabNavigator();

export default function App() {

  const [isLogged, setIsLogged] = useState(false);

  return (

    
    <View style={styles.container}>
     
      <NavigationContainer>
   
        <TabBottom.Navigator
          screenOptions={({ route }) => ({
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
            tabBarActiveTintColor: "blue",
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
});
