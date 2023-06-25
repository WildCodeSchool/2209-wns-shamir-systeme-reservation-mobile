import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ProductCart from "../components/ProductCart";
import { CREATE_ORDER } from "../Tools/Mutation";
import { IOrderReservation } from "../interfaces/IOrderReservation";
import { getPeriod } from "../Tools/utils";
import { reset } from "../stores/cartReducer";
import { setProductsByDate } from "../stores/productReducer";
import IProduct from "../interfaces/IProduct";
import { resetFilter } from "../stores/filterReducer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CartScreen() {
  const productsStore = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const userStore = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  // permet de trier les produits par id avant de les afficher dans le panier
  const sortedItems = [...cartStore].sort((a, b) => a.id - b.id);

  // permet de récupérer le total des prix de chaque produit du panier
  let totalPrice = 0;
  sortedItems.forEach((element) => (totalPrice += element.subtotal));

  // permet de récupérer le nombre de produit dans le panier
  let totalQtyInCart = 0;
  sortedItems.forEach((element) => (totalQtyInCart += element.qtyInCart));

  const [createOrder] = useMutation(CREATE_ORDER);
  // on crée un tableau de réservations
  const reservations: IOrderReservation[] = [];
  // on boucle dans le cartStore pour récupérer chaque réservation et l'envoyer dans le tableau
  cartStore.map((productCart) => {
    const productOrder = productsStore.find(
      (product: IProduct) => product.id === productCart.id
    );
    if (productOrder) {
      for (let index = 0; index < productCart.qtyInCart; index++) {
        const reservation: IOrderReservation = {
          start: productCart.dateFrom,
          end: productCart.dateTo,
          price:
            productCart.price *
            getPeriod(productCart.dateFrom, productCart.dateTo),
          product: productOrder,
        };
        reservations.push(reservation);
      }
    }
  });
  // action de création de la commande puis on vide le panier
  const handleOrder = async () => {
    try {
      if (!await AsyncStorage.getItem("orderToConfirm")) {
        const result = await createOrder({ variables: {userId: userStore.id, reservations: reservations}})
        await AsyncStorage.setItem("orderIdToConfirm", result.data.createOrder.toString());
      }
      navigation.navigate("OrderConfirm", { screen: "OrderConfirmScreen" })
      
    } catch (error) {
      console.log(error);
    }
  };

  // permet de vider le panier
  const handleEmpty = () => {
    dispatch(reset());
  };

  return (
    <ScrollView>
      <View style={styles.container}>
       
        <Text style={styles.title}>Mon panier</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CustomTab", { screen: "Catalogue" })
          }
          style={styles.btnCatalogue}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Ionicons name="chevron-back-outline" size={28} color="#0D83AB" />
            <Text style={styles.btnCatalogueText}>Catalogue</Text>
          </View>
        </TouchableOpacity>
        {/* affichage ou non du bouton 'vider le panier' */}
        {sortedItems.length !== 0 ? (
          <TouchableOpacity onPress={handleEmpty}>
            <Text style={styles.button}>Vider mon panier</Text>
          </TouchableOpacity>
        ) : null}

        {/* affichage ou non de la liste des produits dans le panier */}
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

          {/* affichage ou non du total du panier */}
          {totalQtyInCart ? (
            <View style={styles.cardTotal}>
              <View>
                <View style={styles.cardTotalDetails}>
                  <Text style={styles.cardTotalDetailsText}>
                    Nombre de produits :{" "}
                  </Text>
                  <Text style={styles.cardTotalDetailsNumber}>
                    {totalQtyInCart}
                  </Text>
                </View>
                <View style={styles.cardTotalDetails}>
                  <Text style={styles.cardTotalDetailsText}>Prix total :</Text>
                  <Text style={styles.cardTotalDetailsNumber}>
                    {totalPrice} €
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={handleOrder}
                >
                  <Text style={styles.button}>Valider ma commande</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={{marginTop: 60}}>Votre panier est vide.</Text>
          )}
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
  btnCatalogue: {
    width: "100%",
    
  },
  btnCatalogueText: {
    color: "#0D83AB",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CartScreen;
