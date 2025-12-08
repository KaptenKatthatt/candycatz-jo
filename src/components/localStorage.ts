import type { CandyDataID } from "../services/candyApiTypes";
import type { OrderItems } from "./ApiTest";
import { type CartProduct } from "./cart";

export function saveCartArrayToLocalStorage(cartArray: CartProduct[]): void {
  console.log(cartArray);

  try {
    const savedCandys = JSON.stringify(cartArray);
    localStorage.setItem("candyCartArray", savedCandys);
  } catch (error) {
    console.log("Could not save to local storage", error);
  }
}

export function getCartArrayFromLocalStorage(): CartProduct[] {
  const getCart = localStorage.getItem("candyCartArray");
  return getCart ? JSON.parse(getCart) : [];
}

export function getCartArrayFromLocalStorageToCheckout(): CartProduct[] {
  const getCart = localStorage.getItem("candyCartArray");
  return getCart ? JSON.parse(getCart) : [];
}
