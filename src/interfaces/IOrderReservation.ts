import IProduct from "./IProduct";

export interface IOrderReservation {
  start: string;
  end: string;
  price: number;
  product: IProduct;
}