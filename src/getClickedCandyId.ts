import { renderModal } from "./modal";

const allCandyCardsContainerEl = document.querySelector<HTMLDivElement>(".allCandyCardsContainer")!;

export function getCandyClickedId() {

    allCandyCardsContainerEl.addEventListener("click", async (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clicksnbtn = target.closest<HTMLElement>(".card-img-top, .btn-secondary");
        // både click på bild och på btn - ändra klasserna till mer relevanta??

    if (!clicksnbtn) {
        console.log("NOT A BUTTON WTH AYE");
        return; 
    }

    const candyCard = clicksnbtn.closest<HTMLDivElement>(".card");
        // class från candyCard
    const candyId = Number(candyCard?.dataset.productId);

    if (!candyId) {
        console.log("NOTHING TO FIND WTH");
        return;
    }
            console.log("fungerar det", candyId);
            await renderModal(candyId);
            // await, väntar på api svaret från Jonas rendelModal async funktion
            //renderProductId();
            
    
})};


//candyCardsContainer
//btn-primary
//allCandyCardContainer

// btn.parentelement.dataset.id