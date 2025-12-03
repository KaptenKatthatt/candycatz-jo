export function saveCandyToLocalStorage(cartArray: string) {
     //göra om till sträng -- local tar bara emoit strängar
        // localStorage.setItem 
    try {
        const savedCandys = JSON.stringify(cartArray); // ska ta emot cart array
        localStorage.setItem("candyCart", savedCandys);
    } catch (error){
    console.log("gick inte att spara but why", error);}
}

export function getLocalStorageCandy(): string[] {
        const getCart = localStorage.getItem("candyCart");
        return getCart ? JSON.parse(getCart) : [];
        // om cart finns parsea annars returnera tom array
}