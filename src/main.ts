import { getClickedCandyId } from "./components/getClickedCandyId";
import { initStore } from "./components/cart";
import { renderAllCards } from "./components/renderAllCards";
// import { renderCartView, renderCheckoutForm } from "./components/accordion";
// import { renderFooter } from "./components/footer";
import { renderNavbar } from "./components/navbar";
import { renderOffCan } from "./components/offcan";

//SCSS imports
import "./assets/scss/app.scss";

//Global vars
export const discountMultiplier = 1;
export const shipping = 19;

export const startApp = function () {
  //Scroll to top to combat anchor links left in url
  window.scrollTo(0, 0);

  // renderCartView();
  // renderCheckoutForm();
  renderAllCards();
  getClickedCandyId();
  renderNavbar();
  renderOffCan();

  initStore();

  // Lazy loading
  import("./components/footer")
    .then(({ renderFooter }) => {
      renderFooter();
    })
    .catch((error) => {
      console.error("Failed to load footer:", error);
    });
  import("./components/accordion")
    .then(({ renderCartView, renderCheckoutForm }) => {
      renderCartView();
      renderCheckoutForm();
    })
    .catch((error) => {
      console.error("Failed to load accordion:", error);
    });
};

// Only automatically start the app when not running unit tests
if (import.meta.env.MODE !== "test") {
  startApp();
}
