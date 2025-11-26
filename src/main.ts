//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
//Bootstrap JS
import * as bootstrap from "bootstrap";

import "./assets/scss/app.scss";
import { getCandyProductInfo, getAllCandyInfo } from "./services/candyAPI";
import { UI } from "./ui";
import { renderModal } from "./modal";
import { theCartView, theCheckoutForm } from "./accordian";
import { renderFooter } from "./footer";


//EXAMPLE CARD//////
let candyproduct = await getCandyProductInfo(6545);
console.log("Candyproduct", candyproduct);

console.log(candyproduct.data.images.thumbnail);
UI.exampleTitleEl.innerText = candyproduct.data.name;
UI.exampleCardTextEl.innerHTML = candyproduct.data.description;
UI.exampleThumbnailEl.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;
///////////
// const myModal = document.getElementById("myModal");

UI.exampleThumbnailEl.addEventListener("click", async () => {
  await renderModal(candyproduct.data.id); //Change 6545 to clickedCandyId
  const exampleModal = document.getElementById("exampleModal");
  const modal = new bootstrap.Modal(exampleModal!);
  modal.show();
});

// const myInput = document.getElementById("myInput");

// myModal.addEventListener("shown.bs.modal", () => {
//   myInput.focus();
// });

//----ADD TO CARTtest
let candyId: number = candyproduct.data.id;
console.log(candyId);
interface cartItem {
  id: number;
  amount: number;
}
let candyCart: cartItem[] = [];

function addToCart(candyId: number) {
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
}
addToCart(candyId);


//Footer
renderFooter();