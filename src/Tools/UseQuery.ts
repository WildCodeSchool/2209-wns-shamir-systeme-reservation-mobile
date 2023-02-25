import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_LAST_FOUR_PRODUCTS, GET_PRODUCTS_BY_DATE } from "./Query";
import { useDispatch } from 'react-redux';
import { setHomeProducts, setAllProducts, setProductsByDate } from "../stores/productReducer";
import { setAllCategories } from "../stores/categoriesReducer";


export const loadHomeProducts = () => {
  const dispatch = useDispatch();
  const {
    loading: loadingLastFourProducts,
    data: dataLastFourProducts,
    error: errorLastFourProducts,
  } = useQuery(GET_LAST_FOUR_PRODUCTS, {
    onCompleted: (dataLastFourProducts) => {
      dispatch(setHomeProducts(dataLastFourProducts.getLastFourProducts ))
    },
  });
}

export const loadAllProducts = () => {
  const dispatch = useDispatch();
  const {
    loading: loadingLastFourProducts,
    data: dataLastFourProducts,
    error: errorLastFourProducts,
  } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (dataAllProducts) => {
      dispatch(setAllProducts(dataAllProducts.getAllProducts ))
    },
  });
}

export const loadAllCategories = () => {
  const dispatch = useDispatch();
  const {
    loading: loadingCategory,
    data: dataCategory,
    error: errorCategory,
  } = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (dataCategory) => {
      dispatch(setAllCategories(dataCategory.getAllCategories));
    },
  });
}
