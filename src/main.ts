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
