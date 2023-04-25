import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import ICategory from "../interfaces/ICategory";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ISearchTermProps from "../interfaces/ISearchProductProps";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import {
  setCategoriesFiltered,
  setEndDate,
  setErrorMessage,
  setIsCategoriesFiltered,
  setIsFilterUsed,
  setSearchTerm,
  setStartDate,
} from "../stores/filterReducer";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_DATE } from "../Tools/Query";
import { setProductsByDate } from "../stores/productReducer";

const FilterProduct = ({
  categories,
  findBySearchTerm,
  findByCategory,
}: ISearchTermProps) => {
  const [isStartDateVisible, setStartDateVisibility] = useState(false);
  const [isEndDateVisible, setEndDateVisibility] = useState(false);

  const dispatch = useDispatch();

  const categoryList = Object.values(categories);
  // On recupere seulement les categories qui ont minimum un produit lié
  const categoriesArray = categoryList.filter((cat: any) => {
    return cat.products.length > 0;
  });

  const isCategoriesFiltered = useSelector(
    (state: RootState) => state.filter.isCategoriesFiltered
  );

  const categoriesFiltered = useSelector(
    (state: RootState) => state.filter.categoriesFiltered
  );

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

  const startDate = useSelector((state: RootState) => state.filter.startDate);

  const endDate = useSelector((state: RootState) => state.filter.endDate);
  const errorMessage = useSelector(
    (state: RootState) => state.filter.errorMessage
  );

  //======================================================================//
  //======================== GESTION DES DATES ===========================//
  //======================================================================//

  const showStartDate = () => {
    setStartDateVisibility(true);
  };

  const hideStartDate = () => {
    setStartDateVisibility(false);
  };

  const handleConfirmStartDate = (date: any) => {
    const serializedDate = date.toISOString();
    const startDate = serializedDate.substring(0, 10);
    dispatch(setStartDate(startDate));
    hideStartDate();
  };

  const showEndDate = () => {
    setEndDateVisibility(true);
  };

  const hideEndDate = () => {
    setEndDateVisibility(false);
  };

  const handleConfirmEndDate = (date: any) => {
    const serializedDate = date.toISOString();
    const endDate = serializedDate.substring(0, 10);
    dispatch(setEndDate(endDate));
    hideEndDate();
  };

  const formatDate = (date: string) => {
    const parts = date.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const [getProductsByDate] = useLazyQuery(GET_PRODUCTS_BY_DATE);
  const loadProductsByDate = (dateFrom: string, dateTo: string) => {
    getProductsByDate({ variables: { dateFrom, dateTo } })
      .then(({ data }) => {
        dispatch(setProductsByDate(data.getProductsByDate));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (startDate && endDate) {
      const timestampStart = new Date(startDate).getTime();
      const timestampEnd = new Date(endDate).getTime();
      // On verifie si la date de debut est superieure à la date de fin
      if (timestampStart > timestampEnd) {
        // Si c'est le cas on affiche un message d'erreur
        dispatch(setErrorMessage("Dates non conformes"));
      } else {
        loadProductsByDate(startDate, endDate);
      }
    }
  }, [startDate, endDate]);

  //======================================================================//

  // On check si on utilise les filtres
  useEffect(() => {
    if (
      categoriesFiltered.length ||
      searchTerm.length ||
      startDate.length ||
      endDate.length
    ) {
      dispatch(setIsFilterUsed(true));
    } else {
      dispatch(setIsFilterUsed(false));
    }
  }, [categoriesFiltered, searchTerm, startDate, endDate]);

  // Pour chaque categorie selectionnée ou deselectionnée on appelle une function pour trier les produits
  useEffect(() => {
    findByCategory(categoriesFiltered);
    if (categoriesFiltered.length > 0) {
      dispatch(setIsCategoriesFiltered(true));
    } else {
      dispatch(setIsCategoriesFiltered(false));
    }
  }, [categoriesFiltered]);

  //======================================================================//
  //======================== GESTION DES CHECKBOX ========================//
  //======================================================================//

  // Function qui returne un true ou false selon l'etat (selectionné ou pas) d'un checkbox categories
  const isChecked = (categoryName: string): boolean => {
    // On controle dans la liste des categories selectionnées si la catageorie passée en argument est presente
    if (
      categoriesFiltered.find(
        //@ts-ignore
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
        //@ts-ignore
        (categoryFiltred) => categoryFiltred.name !== nameCategoryToAdd
      );
      dispatch(setCategoriesFiltered(newCategoriesToAdd));
      dispatch(setSearchTerm(""));
    } else {
      // Si il etait decoché, on le coche en créant une nouvelle categorie
      const newCategory: ICategory | undefined = categories.find(
        (category: ICategory) => category.name === nameCategoryToAdd
      );
      if (newCategory) {
        // On ajoute cette nouvelle categorie à la liste des filtres des produits "findByCategory(categoriesFiltered);"
        dispatch(setCategoriesFiltered([...categoriesFiltered, newCategory]));
        dispatch(setSearchTerm(""));
      }
    }
  };
  //======================================================================//

  // Toutes les fois qu'on recherche un produit en tappant sûr des lettres on appelle la function "findBySearchTerm"
  useEffect(() => {
    findBySearchTerm(searchTerm.toLowerCase(), isCategoriesFiltered);
  }, [searchTerm]);

  const handleSearchTerm = (term: string): void => {
    dispatch(setSearchTerm(term));
    findBySearchTerm(term.toLowerCase(), isCategoriesFiltered);
  };

  return (
    <View style={{ height: 140 }}>
      <View style={styles.filterContainer}>
        <View style={styles.datesContainer}>
          <Text
            style={{
              width: 113,
              color: "red",
              position: "absolute",
              zIndex: -1,
              borderColor: "white",
              borderTopWidth: 2,
              left: 10,
              top: -2,
            }}
          ></Text>
          <Text style={styles.dateText}>Dates Location :</Text>
          <View style={styles.dates}>
            <TouchableOpacity onPress={showStartDate} style={{ width: 100 }}>
              {startDate ? (
                <Text style={styles.date}> {formatDate(startDate)}</Text>
              ) : (
                <Text style={styles.date}>Debut location</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={showEndDate} style={{ width: 100 }}>
              {endDate ? (
                <Text style={styles.date}>{formatDate(endDate)}</Text>
              ) : (
                <Text style={styles.date}>Fin location</Text>
              )}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDateVisible}
              mode="date"
              onConfirm={handleConfirmStartDate}
              onCancel={hideStartDate}
            />
            <DateTimePickerModal
              isVisible={isEndDateVisible}
              mode="date"
              onConfirm={handleConfirmEndDate}
              onCancel={hideEndDate}
            />
          </View>
          {errorMessage ? (
            <View>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          ) : (
            ""
          )}
        </View>
        <View style={styles.checkboxContainer}>
          <Text
            style={{
              width: 73,
              color: "red",
              position: "absolute",
              zIndex: -1,
              borderColor: "white",
              borderTopWidth: 2,
              left: 10,
              top: -2,
            }}
          ></Text>
          <Text style={styles.activityText}>Activités :</Text>
          <ScrollView horizontal>
            {categoriesArray.map((category: any) => (
              <BouncyCheckbox
                onPress={() => handleCheckbox(category.name)} //
                isChecked={isChecked(category.name)}
                key={category.id}
                textStyle={{
                  textDecorationLine: "none",
                  textAlign: "center",
                  fontSize: 14,
                  color: "#0D83AB",
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
        <View>
          <TextInput
            label="Quel produit ?"
            mode="outlined"
            onChangeText={(text) => handleSearchTerm(text)}
            value={searchTerm}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 3,
    marginTop: 5,
    backgroundColor: "white",
    zIndex: 1,
  },
  datesContainer: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#7500be",
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 15,
    marginTop: 10,
    minHeight: 50,
    borderRadius: 5,
  },
  dates: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  date: {
    width: 120,
    borderWidth: 2,
    borderColor: "#7500be",
    textAlign: "center",
    borderRadius: 5,
    color: "#7500be",
    paddingTop: 3,
  },
  errorMessage: {
    width: "100%",
    textAlign: "center",
    color: "red",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    left: 10,
    color: "#7500be",
    zIndex: 10,
    paddingHorizontal: 3,
    backgroundColor: "white",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0D83AB",
    paddingHorizontal: 5,
    marginBottom: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  bouncyCheckbox: {
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 10,
  },
  activityText: {
    fontSize: 13,
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    left: 10,
    color: "#0D83AB",
    zIndex: 10,
    paddingHorizontal: 3,
    backgroundColor: "white",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: "0D83AB",
  },
  close: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 10,
  },
});

export default FilterProduct;
