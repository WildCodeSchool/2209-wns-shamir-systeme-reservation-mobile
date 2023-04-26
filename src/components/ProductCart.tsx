import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IProductCartProps from "../interfaces/IProductCartProps";
import { RootState } from "../stores";
import { getPeriod, readableDate } from "../Tools/utils";
import { setCart } from "../stores/cartReducer";
import { useRoute } from "@react-navigation/native";

export default function ProductCart({ cartItem }: IProductCartProps) {
  const route = useRoute().name;

  const cartStore = useSelector((state: RootState) => state.cart.cart);

  const dispatch = useDispatch();

  // ajoute au panier sur bouton +
  const addToCart = () => {
    if (cartItem.qtyInCart < cartItem.quantity) {
      const newQtyInCart = cartItem.qtyInCart + 1;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter(
        (product) => product.id !== cartItem.id
      );
      dispatch(setCart([...updatedCart, updatedProduct]));
      updateQtyInCart(cartItem.id, newQtyInCart);
    } else {
      window.alert("Vous avez atteint le stock disponible !");
    }
  };

  // retire du panier sur bouton -
  const removeFromCart = () => {
    if (cartItem.qtyInCart <= 0) {
      cartItem.qtyInCart = 0;
    } else {
      const newQtyInCart = cartItem.qtyInCart - 1;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter(
        (product) => product.id !== cartItem.id
      );
      dispatch(setCart([...updatedCart, updatedProduct]));
      updateQtyInCart(cartItem.id, newQtyInCart);
    }
  };

  // met à jour la quantité du produit au lieu de dupliquer le produit
  const updateQtyInCart = (productId: number, value: number) => {
    let selectedProduct = cartStore.find((product) => product.id === productId);
    if (selectedProduct && selectedProduct.qtyInCart) {
      const newQtyInCart = value;
      const period = getPeriod(cartItem.dateFrom, cartItem.dateTo);
      const newProductPrice = cartItem.price * newQtyInCart * period;
      const updatedProduct = {
        ...cartItem,
        qtyInCart: newQtyInCart,
        subtotal: newProductPrice,
      };
      let updatedCart = cartStore.filter((product) => product.id !== productId);
      newQtyInCart > 0
        ? dispatch(setCart([...updatedCart, updatedProduct]))
        : dispatch(setCart([...updatedCart]));
    }
  };

  // supprime le produit du panier
  const deleteItem = () => {
    /*const reallyDelete = window.confirm(
      "Souhaitez-vous confirmer la suppression de ce produit ?"
    );*/
    let updatedCart = cartStore.filter((product) => product.id !== cartItem.id);
    dispatch(setCart([...updatedCart]));
  };

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemLeft}>
        <Image style={styles.productImage} source={{ uri: cartItem.image }} />
        <View style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center" }}>Quantité</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {route === "Cart" && (
              <TouchableOpacity onPress={removeFromCart}>
                <Ionicons
                  name="remove-circle-outline"
                  size={35}
                  color="#0D83AB"
                />
              </TouchableOpacity>
            )}
            <Text
              style={{ textAlign: "center", marginHorizontal: 5, fontSize: 15 }}
            >
              {cartItem.qtyInCart}
            </Text>
            {route === "Cart" && (
              <TouchableOpacity onPress={addToCart}>
                <Ionicons name="add-circle-outline" size={35} color="#0D83AB" />
              </TouchableOpacity>
            )}
          </View>
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
          <Text>du {readableDate(cartItem.dateFrom)}</Text>
          <Text>au {readableDate(cartItem.dateTo)}</Text>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text>
            soit {getPeriod(cartItem.dateFrom, cartItem.dateTo)} jour(s)
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text>Prix : {cartItem.subtotal} €</Text>
        </View>
        {route === "Cart" && (
          <View>
            <TouchableOpacity onPress={deleteItem} style={{ marginTop: 10 }}>
              <Ionicons name="trash-bin-outline" size={30} color="#0D83AB" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cartItem: {
    margin: 10,
    paddingRight: 20,
    padding: 10,
    backgroundColor: "#fff",
    width: 310,
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
    width: 100,
    height: 100,
  },
  cartItemLeft: {
    flex: 1,
    alignItems: "center",
  },
  cartItemRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
});
