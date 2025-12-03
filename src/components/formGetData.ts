
import { renderCheckoutForm } from "./accordian";


const submitFormBtn = document.querySelector<HTMLButtonElement>(".submitFormBtn")!;

submitFormBtn.addEventListener("click",(e)=>{
    e.preventDefault();

const inputName = document.querySelector<HTMLInputElement>("#inputName")!;
const inputNameValue = inputName.value;

console.log(inputNameValue)

}); 

