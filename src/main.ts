import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/app.scss";
import { getCandyProductInfo, getAllCandyInfo } from "./services/candyAPI";
import { UI } from "./ui";

let candyproduct = await getCandyProductInfo();
console.log("Candyproduct", candyproduct);

console.log(candyproduct.data.images.thumbnail);
UI.exampleTitleEl.innerText = candyproduct.data.name;
UI.exampleCardTextEl.innerHTML = candyproduct.data.description;
UI.exampleThumbnailEl.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;



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
const candyIsThere = candyCart.find(item => item.id === candyId);
	if (candyIsThere) {
	candyIsThere.amount++
//annars lägg till en ny object
	} else {
	candyCart.push({
		id: candyId,
		amount: 1
	});
	}
	console.log("Candycart", candyCart);
}
addToCart(candyId);