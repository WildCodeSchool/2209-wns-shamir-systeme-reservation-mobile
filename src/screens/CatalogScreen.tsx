import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FilterProduct from "../components/FilterProduct";
import ProductCard from "../components/ProductCard";
import ICategory from "../interfaces/ICategory";
import IProduct from "../interfaces/IProduct";
import { RootState } from "../stores"; //@ts-ignore
import open from "../../assets/images/openFilter.png"; //@ts-ignore
import close from "../../assets/images/closeFilter.png";

import { loadAllCategories, loadAllProducts } from "../Tools/UseQuery";
import {
  setCategoriesFiltered,
  setEndDate,
  setErrorMessage,
  setIsCategoriesFiltered,
  setIsFilterShow,
  setIsFilterUsed,
  setSearchTerm,
  setStartDate,
} from "../stores/filterReducer";
import { setIsProductsByDate, setProductsByDate } from "../stores/productReducer";

export default function CatalogScreen({}) {
  const dispatch = useDispatch();
  loadAllProducts();
  loadAllCategories();

  const [productsCatalog, setProductsCatalog] = useState<IProduct[]>([]);
  const [productsByCat, setProductsByCat] = useState<IProduct[]>([]);
  const [productsByTerm, setProductsByTerm] = useState<IProduct[]>([]);
  const [productsByCatTerm, setProductsByCatTerm] = useState<IProduct[]>([]);
  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);
  const [isShowProducts, setIsShowProduct] = useState<boolean>(true);
  const [isResetProducts, setIsResetProducts] = useState<boolean>(false);

  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const categories = useSelector(
    (state: RootState) => state.categories.allCategories
  );

  const productsByDate = useSelector(
    (state: RootState) => state.products.productsByDate
  );

  const isFilterShow = useSelector(
    (state: RootState) => state.filter.isFilterShow
  );

  const isFilterUsed = useSelector(
    (state: RootState) => state.filter.isFilterUsed
  );

  // On gére la réinitialisation des produis à afficher et on set à 0 les filtres
  const handleResetFilter = () => {
    dispatch(setCategoriesFiltered([]));
    dispatch(setIsCategoriesFiltered(false));
    dispatch(setSearchTerm(""));
    dispatch(setStartDate(""));
    dispatch(setEndDate(""));
    dispatch(setIsFilterUsed(false));
    dispatch(setErrorMessage(""));
    setIsResetProducts(!isResetProducts);
    setProductsByCat([]);
    setProductsByTerm([]);
    setProductsByCatTerm([]);
    dispatch(setIsFilterShow(false));
    dispatch(setProductsByDate([]));
  };

  // On check si on dois gérer les produis triés par date ou tous les produits
  useEffect(() => {
    if (productsByDate.length) {
      setProductsCatalog(productsByDate);
      setProductsToShow(productsCatalog);
      dispatch(setCategoriesFiltered([]));
      dispatch(setIsCategoriesFiltered(false));
      dispatch(setSearchTerm(""));
      dispatch(setIsFilterShow(false));
      dispatch(setIsFilterUsed(true));
      dispatch(setErrorMessage(""));
      dispatch(setIsProductsByDate(true));
      setProductsByCat([]);
      setProductsByTerm([]);
      setProductsByCatTerm([]);

    } else {
      setProductsByCat([]);
      setProductsByCatTerm([]);
      setProductsByTerm([]);
      setProductsCatalog(products);
      setProductsToShow(productsCatalog);
      setIsShowProduct(true);
      dispatch(setIsProductsByDate(false))
    }
  }, [products, productsByDate, isResetProducts, productsCatalog]);

  // On decide quelle liste de produits afficher
  useEffect(() => {
    if (productsByCatTerm.length > 0) {
      setProductsToShow(productsByCatTerm);
    } else if (productsByCat.length > 0) {
      setProductsToShow(productsByCat);
    } else if (productsByTerm.length > 0) {
      setProductsToShow(productsByTerm);
    } else {
      setProductsToShow(productsCatalog);
    }
  }, [productsByCat, productsByTerm, productsByCatTerm, productsCatalog]);

  //======================================================================//
  //================= GESTION DU FILTRE FINDBYSEARCHTERM =================//
  //======================================================================//

  // On récupere le terme de recherche de l'utilisateur
  const findBySearchTerm = (
    searchTerm: string,
    isCategoriesFiltered: boolean
  ): void => {
    // On commence à filtrer les produits à partir du 3me caractere saisi
    if (searchTerm.length > 2) {
      // On récupere les produits trouvés et on les stock dans le state pour les afficher

      // On recherche dans les produit déjà filtrés par categorie si au moins une categorie a été selectionnée
      if (isCategoriesFiltered) {
        let productsFiltered = productsByCat.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        if (searchTerm.length >= 3 && productsFiltered.length === 0) {
          setIsShowProduct(false);
        } else if (searchTerm.length < 3 && productsFiltered.length === 0) {
          setProductsToShow(productsByCat);
          setProductsByTerm([]);
          setProductsByCatTerm([]);
          setIsShowProduct(true);
        } else {
          setProductsByCatTerm(productsFiltered);
          setProductsByTerm([]);
          setIsShowProduct(true);
        }
        // Sinon on recherche dans les produit du catalogue qui n'ont pas encore été filtrés par categorie
      } else {
        let productsFiltered = productsCatalog.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );

        if (searchTerm.length >= 3 && productsFiltered.length === 0) {
          setIsShowProduct(false);
        } else if (searchTerm.length < 3 && productsFiltered.length === 0) {
          setProductsToShow(productsCatalog);
          setIsShowProduct(true);
        } else {
          setProductsByTerm(productsFiltered);
          setProductsByCat([]);
          setProductsByCatTerm([]);
          setIsShowProduct(true);
        }
      }
      // Si le caracteres saisis sont inferieurs de 3 on affiche tous les produits
    } else {
      if (isCategoriesFiltered) {
        setIsShowProduct(true);
        setProductsToShow(productsByCat);
      } else {
        setIsShowProduct(true);
        setProductsToShow(productsCatalog);
      }
    }
  };

  //======================================================================//

  //======================================================================//
  //================= GESTION DU FILTRE FINDBYCATEGORY  ==================//
  //======================================================================//

  // On récupere les categories selectionnées par l'utilisateur
  const findByCategory = (categories: ICategory[]): void => {
    // On controle si il y a au moins une categorie selectionnée
    if (categories.length) {
      const productsByCategories: IProduct[] = [];

      // On controle si le nom de la categorie de chaque produit correspond aux categories selectionnées
      productsCatalog.forEach((product) => {
        categories.forEach((category) => {
          if (category.name === product.category.name) {
            // Si c'est le cas, on stock les produis dans un tableau
            productsByCategories.push(product);
          }
        });
      });
      // On passe le tableau avec le produits triés dans le state pour les afficher
      setProductsByCat(productsByCategories);
      setProductsByTerm([]);
      setProductsByCatTerm([]);
      setIsShowProduct(true);

      // Si aucune categorie a été selectionnée on affiche tous les produits
    } else {
      setProductsToShow(productsCatalog);
    }
  };

  //======================================================================//

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue des produits</Text>
      {isFilterShow && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity style={{}} onPress={handleResetFilter}>
            {isFilterUsed && (
              <Text
                style={{
                  padding: 2,
                  color: "#0D83AB",
                  marginLeft: 5,
                  marginBottom: 5,
                }}
              >
                Supprimer les filtres
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setIsFilterShow(!isFilterShow))}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 5,
                color: "#0D83AB",
                fontSize: 12,
                marginBottom: 5,
              }}
            >
              fermer
            </Text>
            <Image style={styles.filterClose} source={close} />
          </TouchableOpacity>
        </View>
      )}
      {!isFilterShow && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity style={{}} onPress={handleResetFilter}>
            {isFilterUsed && (
              <Text style={{ padding: 2, color: "#0D83AB", marginLeft: 5 }}>
                Supprimer les filtres
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setIsFilterShow(!isFilterShow))}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 5, color: "#0D83AB", fontSize: 12 }}>
              filtres
            </Text>
            <Image style={styles.filterOpen} source={open} />
          </TouchableOpacity>
        </View>
      )}
      {isFilterShow && (
        <View style={{ marginBottom: 50 }}>
          <FilterProduct
            categories={categories}
            findBySearchTerm={findBySearchTerm}
            findByCategory={findByCategory}
          />
        </View>
      )}

      <ScrollView style={{ marginTop: 5 }}>
        <View style={styles.productsList}>
          {isShowProducts &&
            productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productsByDate={productsByDate}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cat: {},
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0D83AB",
    marginVertical: 10,
  },
  productsList: {
    flex: 1,
    minWidth: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 7,
    marginTop: 5,
  },
  filterOpen: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  filterClose: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginBottom: 5,
  },
});
