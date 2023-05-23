import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VALIDATE_ORDER } from '../Tools/Mutation';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { reset } from '../stores/cartReducer';

function PaymentScreen({ navigation }: any) {

  const [validateOrder] = useMutation(VALIDATE_ORDER);
  const dispatch = useDispatch();


    // const fetchPaymentIntentClientSecret = async () => {
    //     const response = await fetch(`${process.env.API_URL}/create-payment-intent`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         currency: 'usd',
    //       }),
    //     });
    //     const {clientSecret} = await response.json();
    //     return clientSecret;
    //   };
    
    const handlePayPress = async () => {
      const orderId = await AsyncStorage.getItem("orderIdToConfirm");
      await AsyncStorage.removeItem("orderIdToConfirm");
      const result = await validateOrder({ variables: {orderId: orderId ? parseInt(orderId) : 0}})
      dispatch(reset());
      navigation.navigate("Profil", { screen: "ProfileScreen" })

    // // Fetch the intent client secret from the backend.
    // const clientSecret = await fetchPaymentIntentClientSecret();
    };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Payer ma commande</Text>
        <CardField
            style={{height: 50}}
            postalCodeEnabled={false}
            onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            }}
        />
        <TouchableOpacity>
            <Text onPress={handlePayPress} style={styles.button}>Valider le paiement</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0D83AB",
    marginVertical: 10,
    textAlign: "center",
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
    }
})

export default PaymentScreen;