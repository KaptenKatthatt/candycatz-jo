import { renderModal } from "./components/modal";

const allCardsContainerEl = document.querySelector<HTMLDivElement>(".allCardsContainer")!;

export function getClickedCandyId() {

    allCardsContainerEl.addEventListener("click", async (e: MouseEvent) => {
        console.log("did it click?");
        const target = e.target as HTMLElement;
        const clicksnbtn = target.closest<HTMLElement>(".card-img-top, .btn-primary");
        // både click på bild och på btn - ändra klasserna till mer relevanta??

    if (!clicksnbtn) {
        console.log("NOT A BUTTON WTH AYE");
        return; 
    }

    const candyCard = clicksnbtn.closest<HTMLDivElement>(".card");
    console.log("work?", candyCard);
        // class från candyCard
    const candyId = Number(candyCard?.dataset.productId);
    console.log("finns id?", candyId);

    if (!candyId) {
        console.log("NOTHING TO FIND WTH");
        return;
    }
            await renderModal(candyId);
            console.log("fungerar det", candyId);
            // await, väntar på api svaret från Jonas rendelModal async funktion
            //renderProductId();
            
    
})};


//candyCardsContainer
//btn-primary
//allCandyCardContainer

// btn.parentelement.dataset.id