import { renderModal } from "./modal";

const allCardsContainerEl = document.querySelector<HTMLDivElement>(
  ".all-cards-container"
)!;

export function getClickedCandyId() {
  allCardsContainerEl.addEventListener("click", async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clicksnbtn = target.closest<HTMLElement>(
      ".card-img-top, .card-title, .btn-primary"
    );

    if (!clicksnbtn) {
      return;
    }

    const candyCard = clicksnbtn.closest<HTMLDivElement>(".card");
    const candyId = Number(candyCard?.dataset.productId);
    if (!candyId) {
      return;
    }
    await renderModal(candyId);
  });
}
