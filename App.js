import { ImageBackground, StyleSheet, Text, View } from "react-native";
import CatalogScreen from "./src/screens/CatalogScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./src/components/navigation/Navigation";
import { ApolloProvider } from '@apollo/client';
import client from './src/context/client';

const TabBottom = createBottomTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <ApolloProvider client={client} >
        <Navigation />
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
