import type { CandyDataID } from "../services/candyApiTypes";
import type { OrderItems } from "../services/candyApiTypes";
import { type CartProduct } from "../services/candyApiTypes";

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
