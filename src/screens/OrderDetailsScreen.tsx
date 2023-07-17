import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";//@ts-ignore
import { GET_ORDER_BY_ID } from "../Tools/Query";
import IOrder from "../interfaces/IOrder";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import IReservation from "../interfaces/IReservation";
import { readableDate } from "../Tools/utils";
import { Ionicons } from "@expo/vector-icons";
import ReservationCard from "../components/ResevationCard";//@ts-ignore


export default function OrderDetailsScreen({ navigation, route }: any) {

  const [order, setOrder] = useState<IOrder>();

  const orderId = route.params.orderId;
  const userDataStore = useSelector((state: RootState) => state.user.user);

  const [getOrderById] = useLazyQuery(GET_ORDER_BY_ID);

  const handleGetOrderById = (orderId: number | undefined, userId: number | undefined) => {
    getOrderById({ variables: { orderId, userId } })
      .then(({ data }) => {
        console.log(data)
        setOrder(data.getOrderById);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetOrderById(orderId, userDataStore.id);
  }, []);

  // Function pour filtrer les reservation:
  // on crée un nouveau tableau avec un seul objet par produit reservé sur les memes dates
  // avec la quantité des produits ajoutés
  const reservationFilter = (reservations: IReservation[] | undefined) => {
    let reservationProducts: any[] = [];

    reservations?.forEach((reservation) => {
      const productId = reservation.product.id;

      // pour chaque reservation on recherche dans le tableau reservationProducts si on a déjà un produit avec le meme ID
      const existingProducts = reservationProducts.filter(
        (reservationProduct) => reservationProduct.product.id === productId
      );

      let foundSameDate = false;

      // pour tous les produits(reservations) déjà existant on regarde si on trouve les memes dates de location
      existingProducts?.forEach((existingProduct) => {
        if (
          existingProduct.reservation.start === reservation.start &&
          existingProduct.reservation.end === reservation.end
        ) {
          // si c'est le cas, on inctremente la quantité et on passe à true la variable foundSameDate
          existingProduct.quantity++;
          foundSameDate = true;
        }
      });

      // Si le dates ne sont pas les memes alors on crée un nouvel objet avec quantity = 1
      if (!foundSameDate) {
        reservationProducts.push({
          reservation: {
            id: reservation.id,
            start: reservation.start,
            end: reservation.end,
            price: reservation.price,
          },
          product: reservation.product,
          quantity: 1,
        });
      }
    });

    // Ordonner par ID de produit
    reservationProducts.sort((a, b) => {
      return a.product.id - b.product.id;
    });

    return reservationProducts;
  };

  const reservationProducts = reservationFilter(order?.reservations);
  
  
  return (
    <ScrollView>
       <View style={styles.container}>
        <View>
          <Text style={styles.title}> 
            Commande du {order && readableDate(order.created_at)}
          </Text>
          <View>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomTab", { screen: "Profile" })
          }
          style={styles.btnProfil}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="chevron-back-outline" size={28} color="#0D83AB" />
            <Text style={styles.btnProfilText} >Profil</Text>
          </View>
        </TouchableOpacity>
          </View>
          <View>
            {reservationProducts?.map((reservation) => (
              <ReservationCard
                key={reservation.reservation.id}
                reservation={reservation.reservation}
                product={reservation.product}
                quantity={reservation.quantity}
              />
            ))}
          </View>
            <View style={{flexDirection: "row",  justifyContent:"flex-end", marginTop: 10, marginHorizontal: 10, paddingRight: 20,}} ><Text style={{borderTopColor: "black", borderTopWidth: 2, paddingTop: 5, fontSize: 25 }}>Total : {order?.total_price} €</Text></View>
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
  cardTotal: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    width: 310,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "rgba(36, 36, 36, 0.46)",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTotalDetails: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  cardTotalDetailsText: {
    width: "70%",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },
  cardTotalDetailsNumber: {
    width: "30%",
    textAlign: "right",
    color: "black",
    fontWeight: "bold",
  },
  btnProfil: {
    width: "100%",
    
  },
  btnProfilText: {
    color: "#0D83AB",
    textAlign: "center",
    fontSize: 16,
  },
});
