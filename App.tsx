import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./src/components/Navigation";
import { ApolloProvider } from '@apollo/client';
import client from './src/context/client';
import { Provider } from "react-redux";
import { store } from "./src/stores";

const TabBottom = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <ApolloProvider client={client} >
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ApolloProvider>
    </View>
  );
}

