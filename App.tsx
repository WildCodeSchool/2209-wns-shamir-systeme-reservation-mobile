import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./src/components/Navigation";
import { ApolloProvider } from "@apollo/client";
import client from "./src/context/client";
import { Provider } from "react-redux";
import { store } from "./src/stores";
import { StripeProvider } from "@stripe/stripe-react-native";

const TabBottom = createBottomTabNavigator();

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51Mqu3gFDBdJluanMYizpCQpQou4wgTEQN4B5A0LR72Z7r9i6L0jHRM8mBtbnj6BH2tYwE7ftbSuTTn7VRNw4NLUm00F23lfII0"
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </ApolloProvider>
      </View>
    </StripeProvider>
  );
}
