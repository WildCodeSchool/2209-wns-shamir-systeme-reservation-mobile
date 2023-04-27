import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IProductCartProps from "../interfaces/IProductCartProps";
import { RootState } from "../stores";
import { getPeriod, readableDate } from "../Tools/utils";
import { setCart } from "../stores/cartReducer";
import { useRoute } from "@react-navigation/native";
import IReservationCard from "../interfaces/IReservationCard";

export default function ReservationCard({
  reservation,
  product,
  quantity,
}: IReservationCard) {
  const route = useRoute().name;

  const cartStore = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  return (
    <View style={styles.reservationCard}>
      <View style={styles.cartItemLeft}>
        <View style={{   borderColor: "#0D83AB",
    borderWidth: 2,
    borderRadius: 50,
   }}><Image style={styles.productImage} source={{ uri: product.image }} /></View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center" }}>Quantité : {quantity}</Text>
        </View>
      </View>
      <View style={styles.cartItemRight}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#0D83AB",
            paddingVertical: 5,
          }}
        >
          <Text>du {readableDate(reservation.start)}</Text>
          <Text>au {readableDate(reservation.end)}</Text>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text>
            soit {getPeriod(reservation.start, reservation.end)} jour(s)
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text>Prix : {reservation.price} €</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  reservationCard: {
    width: 320,
    margin: 10,
    paddingRight: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(36, 36, 36, 0.46)",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  cartItemLeft: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  cartItemRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
});
