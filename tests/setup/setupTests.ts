import { vi } from "vitest";

// Mock bootstrap to avoid executing DOM dependent code during module pre-bundling
vi.mock("bootstrap", () => {
  return {};
});

// Provide minimal DOM elements used during module initialization
if (typeof document !== "undefined") {
  document.body.innerHTML = `
    <nav class="navbar"></nav>
    <main></main>
    <div class="all-cards-container"></div>
    <div class="heart-cat-container"></div>
    <div class="cart-container"></div>
    <div id="cartView"></div>
    <div id="checkoutForm"></div>
    <div id="placedOrderView"></div>
    <div id="offCan"></div>
    <div class="carousel"></div>
    <div class="scroll-container"></div>
  `;
}

// Mock window.scrollTo (not implemented in jsdom env)
if (typeof window !== "undefined") {
  window.scrollTo = vi.fn();
}
