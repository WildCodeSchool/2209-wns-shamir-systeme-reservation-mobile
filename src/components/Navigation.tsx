import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import CatalogScreen from '../screens/CatalogScreen';
import { AuthProvider } from '../context/AuthContext';
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import HeaderBar from '../screens/HeaderBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { GET_USER } from '../Tools/Query';
import { useLazyQuery } from '@apollo/client';
import { setUser } from '../stores/userReducer';

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomNavigation = () => {
    const token = useSelector((state: RootState) => state.token.jwt);
    const [getUser] = useLazyQuery(GET_USER);
    const dispatch = useDispatch();

    async function initUser(token: string) {
        try {
            const user = await getUser({ variables: { token } });
            dispatch(setUser(user.data.getUser));
            // const isUserAdmin = await isAdmin({ variables: { token } });
            // dispatch(setIsAdmin(isUserAdmin.data.isAdmin));
        } catch (error) {
            console.log('Erreur dans Navigation, function InitUser ', error);
        }
    }

    useEffect(() => {
        if (token) {
            initUser(token);
        }
    }, []);

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
                } else if (route.name === "Profile") {
                    iconName = focused ? "person-circle" : "person-circle-outline";
                } else if (route.name === "SignIn") {
                    iconName = focused ? "log-in" : "log-in-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#0d7ebf",
                tabBarInactiveTintColor: "gray",
            })}>
                <TabBottom.Screen name="Accueil" component={HomeScreen} />
                <TabBottom.Screen name="Catalogue" component={CatalogScreen} />
                {token ? <TabBottom.Screen name="Profile" component={ProfileScreen}/>
                : <TabBottom.Screen name="SignIn" component={SignIn}/>}
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
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                </Stack.Group>
            </Stack.Navigator>
        </AuthProvider>
    </NavigationContainer>
  )
}

export default Navigation;