import { getClickedCandyId } from "./components/getClickedCandyId";
import { initStore } from "./components/cart";
import { renderAllCards } from "./components/renderAllCards";
import { renderCarousel } from "./components/carousel";
import { renderCartView, renderCheckoutForm } from "./components/accordian";
import { renderFooter } from "./components/footer";
import { renderNavbar } from "./components/navbar";
import { renderOffCan } from "./components/offcan";

//SCSS imports
import "./assets/scss/app.scss";

//Global vars
export const discountMultiplier = 0.7;
export const shipping = 19;

//Scroll to top to combat anchor links left in url
window.scrollTo(0, 0);

renderCartView();
renderCheckoutForm();
renderAllCards();
getClickedCandyId();
renderCarousel();
renderNavbar();
renderOffCan();
renderFooter();

initStore();
