import { getCandyProductInfo } from "./services/candyAPI";

export const addToCart = async function () {
  let candyproduct = await getCandyProductInfo(6545);

  //----ADD TO CARTtest
  let candyId: number = candyproduct.data.id;

  console.log(candyId);
  interface cartItem {
    id: number;
    amount: number;
  }
  let candyCart: cartItem[] = [];
  //finns produkten i redan? så ska deta addas på i amount i arrayen
  const candyIsThere = candyCart.find((item) => item.id === candyId);
  if (candyIsThere) {
    candyIsThere.amount++;
    //annars lägg till en ny object
  } else {
    candyCart.push({
      id: candyId,
      amount: 1,
    });
  }
  console.log("Candycart", candyCart);
};
