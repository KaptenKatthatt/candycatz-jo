//Function imports
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
