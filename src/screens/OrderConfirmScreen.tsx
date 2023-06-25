import { useMutation } from "@apollo/client";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native"; //@ts-ignore
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import { Ionicons } from "@expo/vector-icons";
import ProductCart from "../components/ProductCart";
import IProduct from "../interfaces/IProduct";
import { DELETE_ORDER, PAYMENT_SHEET, VALIDATE_ORDER } from "../Tools/Mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reset } from "../stores/cartReducer";
import { useStripe } from "@stripe/stripe-react-native";

export default function OrderConfirmScreen({ navigation }: any) {
  const productsStore = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  // permet de trier les produits par id avant de les afficher
  const sortedItems = [...cartStore].sort((a, b) => a.id - b.id);

  // permet de calculer le prix total de la commande
  let totalPrice = 0;
  sortedItems.forEach((element) => (totalPrice += element.subtotal));

  const [deleteOrder] = useMutation(DELETE_ORDER);

  const handleDeleteOrder = async () => {
    const orderId = await AsyncStorage.getItem("orderIdToConfirm");
    await AsyncStorage.removeItem("orderIdToConfirm");
    await deleteOrder({
      variables: { orderId: orderId ? parseInt(orderId) : 0 },
    });
    dispatch(reset());
    navigation.navigate("Catalogue", { screen: "CatalogScreen" });
  };

  const handleContinueShop = async () => {
    try {
      const orderId = await AsyncStorage.getItem("orderIdToConfirm");
      await AsyncStorage.removeItem("orderIdToConfirm");
      await deleteOrder({
        variables: { orderId: orderId ? parseInt(orderId) : 0 },
      });
      navigation.navigate("Catalogue", { screen: "CatalogScreen" });
    } catch (error) {
      console.log("====================================");
      console.log("error dans front ", error);
      console.log("====================================");
    }
  };

  // gestion du paiement par stripe
  const [paymentSheetMobile] = useMutation(PAYMENT_SHEET);
  const [validateOrder] = useMutation(VALIDATE_ORDER);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  const validatePayment = () => {
    Alert.alert("", "Acceptez-vous nos Conditions Générales de Vente ?", [
      {
        text: 'Non',
        onPress: () => {return},
        style: 'cancel',
      },
      {text: 'Oui', onPress: () => handlePayment()},
    ])
  }

  const handlePayment = async () => {
    const orderIdToConfirm = await AsyncStorage.getItem("orderIdToConfirm");
    const orderId = orderIdToConfirm ? parseInt(orderIdToConfirm) : 0;
    const result = await paymentSheetMobile({
      variables: { totalAmount: totalPrice },
    });
    const { customer, ephemeralKeySecret, paymentIntentId } =
      result.data.paymentSheetMobile;

    const { error: errorInitPaymentSheet } = await initPaymentSheet({
      merchantDisplayName: "WildBooking",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKeySecret,
      paymentIntentClientSecret: paymentIntentId,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
    });

    if (!errorInitPaymentSheet) {
      const { error: errorPresentPaymentSheet } = await presentPaymentSheet();

      if (errorPresentPaymentSheet) {
        Alert.alert(
          `Une erreur est survenue ! (${
            (errorPresentPaymentSheet.message)
          })`
        );
      } else {
        Alert.alert("Votre commande est confirmée!");

        await AsyncStorage.removeItem("orderIdToConfirm");
        await validateOrder({
          variables: { orderId: orderId ? orderId : 0 },
        });
        dispatch(reset());
        navigation.navigate("Profil", { screen: "ProfileScreen" });
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Récapitulatif de commande</Text>
          <View>
            <TouchableOpacity onPress={handleContinueShop}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={28}
                  color="#0D83AB"
                />
                <Text style={styles.btnProfilText}>Continuer mes achats</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {sortedItems.map((cartItem) => {
              const isThereProduct = productsStore.find(
                (product: IProduct) => product.id === cartItem.id
              );
              if (isThereProduct !== undefined) {
                return (
                  <View key={cartItem.id}>
                    <ProductCart cartItem={cartItem} />
                  </View>
                );
              } else {
                return null;
              }
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 10,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                borderTopColor: "black",
                borderTopWidth: 2,
                paddingTop: 5,
                fontSize: 25,
              }}
            >
              Total : {totalPrice} €
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={validatePayment}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.button}>Payer ma commande</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleDeleteOrder}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.button}>Annuler ma commande</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0D83AB",
    marginVertical: 10,
  },
  button: {
    width: 200,
    padding: 10,
    textAlign: "center",
    opacity: 0.8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 15,
    color: "white",
    backgroundColor: "rgba(13, 131, 171, 0.3)",
    alignSelf: "center",
    marginTop: 5,
  },
  btnProfilText: {
    color: "#0D83AB",
    textAlign: "center",
    fontSize: 16,
  },
});
