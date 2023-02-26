import ICategory from "./ICategory";
import IProduct from "./IProduct";

export default interface ISearchTermProps {
  findBySearchTerm: (searchTerm: string, isCategoriesFiltered: boolean) => void,
  findByCategory: (categories: ICategory[]) => void,
  categories: ICategory[],
}