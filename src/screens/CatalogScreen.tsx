import { StyleSheet, Text, View } from "react-native";

export default function CatalogScreen({}) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Catalogue des produits</Text>
     
      
        {/*   <SearchProduct
          categories={categories}
          findBySearchTerm={findBySearchTerm}
          findByCategory={findByCategory}
          handleFindByDate={handleFindByDate}
          reloadAllProducts={reloadAllProducts}
          productsByDate={productsByDate}
          resetProductsView={resetProductsView}
          categoriesFromHome={categoriesFromHome}
          dateFromHome={dateFromHome}
          dateToHome={dateToHome}
          isSearchFromHome={isSearchFromHome}
        /> */}
        
          {/*   {isShowProducts &&
            productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productsByDate={productsByDate}
                isSearchFromHome={isSearchFromHome}
              />
            ))} */}
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title :{
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: "#0D83AB",
    marginTop: 20
  }
});
