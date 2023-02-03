import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import CatalogScreen from '../screens/CatalogScreen';
import { AuthProvider } from '../context/AuthContext';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import ReservationScreen from '../screens/ReservationScreen';
import HeaderBar from '../screens/HeaderBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomNavigation = () => {
    return (
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
                }

                return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#0d7ebf",
                tabBarInactiveTintColor: "gray",
            })}>
                <TabBottom.Screen name="Accueil" component={HomeScreen} />
                <TabBottom.Screen name="Catalogue" component={CatalogScreen} />
                <TabBottom.Screen name="Reservations" component={ReservationScreen} />
            </TabBottom.Navigator>
    )
}

const Navigation = () => {

  return (
    <NavigationContainer>
        <AuthProvider>
            <HeaderBar/>
            <Stack.Navigator initialRouteName="CustomTab">
                <Stack.Group>
                    <Stack.Screen name="CustomTab" component={CustomNavigation} options={{ headerShown: false }}/>
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }}/>
                    
                    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
                </Stack.Group>
            </Stack.Navigator>
        </AuthProvider>
    </NavigationContainer>
  )
}

export default Navigation;