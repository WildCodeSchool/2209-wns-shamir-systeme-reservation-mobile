import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import ICategory from "../interfaces/ICategory";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ISearchTermProps from "../interfaces/ISearchProductProps";

const FilterProduct = ({categories,
  findBySearchTerm,
  findByCategory,
  //handleFindByDate,
  //reloadAllProducts,
  productsByDate,
  resetProductsView,
  categoriesFromHome,
  dateFromHome,
  dateToHome,
  isSearchFromHome}: ISearchTermProps) => {

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categoriesFiltered, setCategoriesFiltered] = useState<ICategory[]>([]);
  const [isCategoriesFiltered, setIsCategoriesFiltered] =
    useState<boolean>(false);
  const [isProductsByDate, setIsProductsByDate] = useState<boolean>(false);

  const categoryList = Object.values(categories);
  // On recupere seulement les categories qui ont minimum un produit lié
  const categoriesArray = categoryList.filter((cat: any) => {
    return cat.products.length > 0;
  });

  useEffect(() => {
    if (categoriesFromHome.length > 0) {
      setCategoriesFiltered(categoriesFromHome);
    }
    if (dateFromHome !== '') {
    
      setDateFrom(dateFromHome);
      setDateTo(dateToHome);
      setIsProductsByDate(true)
    }
  }, [isSearchFromHome]);

  // On controle si on a des produits recherchés par dates et si c est le cas on affiche le boutton "Réinitialiser"
  // sinon on le cache
  useEffect(() => {
    if (productsByDate.length === 0) {
      setIsProductsByDate(false);
    } else {
      setIsProductsByDate(true);
    }
  }, [productsByDate]);

  // Pour chaque categorie selectionnée ou deselectionnée on appelle une function pour trier les produits
  useEffect(() => {
    findByCategory(categoriesFiltered);
    if (categoriesFiltered.length > 0) {
      setIsCategoriesFiltered(true);
    } else {
      setIsCategoriesFiltered(false);
    }
  }, [categoriesFiltered]);

  // Function qui returne un true ou false selon l'etat (selectionné ou pas) d'un checkbox categories
  const isChecked = (categoryName: string): boolean => {
    // On controle dans la liste des categories selectionnées si la catageorie passée en argument est presente
    if (
      categoriesFiltered.find(
        (categoryFiltred) => categoryFiltred.name === categoryName
      )
    ) {
      // Si c'est le cas la case checkbox sera cochée
      return true;
    }
    // Sinon la case checkbox sera decochée
    return false;
  };

  // Function qui permet de stoker ou enlever du state les categories selectionnées dans les checkbox
  const handleCheckbox = (nameCategoryToAdd: string): void => {

    // On controle l'état du checkbox
    if (isChecked(nameCategoryToAdd)) {
      // Si il etait dejà coché, on le decoché en créant une nouvelle liste de categories selectionnées sans la categorié que on vient de traiter
      const newCategoriesToAdd: ICategory[] = categoriesFiltered.filter(
        (categoryFiltred) => categoryFiltred.name !== nameCategoryToAdd
      );
      setCategoriesFiltered(newCategoriesToAdd);
      setSearchTerm("");
    } else {
      // Si il etait decoché, on le coche en créant une nouvelle categorie
      const newCategory: ICategory | undefined = categories.find(
        (category: ICategory) => category.name === nameCategoryToAdd
      );
      if (newCategory) {
        // On ajoute cette nouvelle categorie à la liste des filtres des produits "findByCategory(categoriesFiltered);"
        setCategoriesFiltered([...categoriesFiltered, newCategory]);
        setSearchTerm("");
      }
    }
  };

  const handleSearchTerm = (e: any): void => {
    setSearchTerm(e.target.value);
    findBySearchTerm(e.target.value.toLowerCase(), isCategoriesFiltered);
  };

  const handleDateFrom = (e: any): void => {
    setDateFrom(e.target.value);
  };
  const handleDateTo = (e: any): void => {
    setDateTo(e.target.value);
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    // On controle si la date de debut et la date de fin on été selectionnées
    if (dateFrom && dateTo) {
      const timestampFrom = new Date(dateFrom).getTime();
      const timestampTo = new Date(dateTo).getTime();
      // On verifie si la date de debut est superieure à la date de fin
      if (timestampFrom > timestampTo) {
        // Si c'est le cas on affiche un message d'erreur
        setErrorMessage("Dates non conformes");
      } else {
        setErrorMessage("");
        //handleFindByDate(dateFrom, dateTo);
        setCategoriesFiltered([]);
        setSearchTerm("");
      }
    } else {
      // Si c'est pas le cas on affiche un message d'erreur
      setErrorMessage("Sélectionner deux dates");
    }
  };

  // On gére la réinitialisation des produis à afficher
  function handleClickreloadProducts() {
    setDateFrom("");
    setDateTo("");
    setCategoriesFiltered([]);
    setSearchTerm("");
    resetProductsView();
    //reloadAllProducts();
  }

  return (
    <View style={{height: 100}}>
    <ScrollView >
      <View style={styles.filterContainer}>
        <View style={styles.checkboxContainer}>
          <ScrollView horizontal style={styles.scrollCategories}>
            <Text style={styles.activities}>Activités :</Text>
            {categoriesArray.map((category: any) => (
              <BouncyCheckbox
              onPress={() => handleCheckbox(category.name)} //
              isChecked={isChecked(category.name)}
                key={category.id}
                textStyle={{
                  textDecorationLine: "none",
                  textAlign: "center",
                  fontSize: 14,
                }}
                style={styles.bouncyCheckbox}
                size={25}
                fillColor="#0D83AB"
                unfillColor="#FFFFFF"
                text={category.name}
                iconStyle={{ borderColor: "#0D83AB" }}
                innerIconStyle={{ borderWidth: 2 }}
              />
            ))}
          </ScrollView>
        </View>
       {/*  <View>
          <TextInput
           placeholder="Chaussures... Casque... "
            onChange={handleSearchTerm}
            value={searchTerm}
          />
        </View> */}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginVertical: 10,
  },
  checkboxContainer: {},
  bouncyCheckbox: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
  },
  activities: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollCategories: {
    paddingHorizontal: 15,
    opacity: 0.8,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#0D83AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "transparent",
  },
});

export default FilterProduct;
