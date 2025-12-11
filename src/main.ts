//Function imports
import { renderOffCan } from "./components/offcan";
import { renderCartView, renderCheckoutForm } from "./components/accordian";
import { renderFooter } from "./components/footer";
import { renderNavbar } from "./components/navbar";
import { renderCarousel } from "./components/carousel";
import { renderAllCards } from "./components/renderAllCards";
import { getClickedCandyId } from "./components/getClickedCandyId";
import { initStore } from "./components/cart";

//SCSS imports
import "./assets/scss/app.scss";

window.scrollTo(0, 0);

renderCartView();
renderCheckoutForm();

//RenderAllCards
renderAllCards();
//getCandyClickedId, startar efter alla kort laddas ut
getClickedCandyId();

//Carousel hero
renderCarousel();
//Navbar
renderNavbar();
//OffCanvas cart
renderOffCan();

//Footer
renderFooter();

initStore();
