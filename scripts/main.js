import { display } from "./Display.js";
import { purchaseButtonTransfer } from "./Purchase.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
  mainContainer.innerHTML = await display();
};

renderAllHTML();


document.addEventListener("colony-choosen", (event) => {
  renderAllHTML();
});

renderAllHTML()

document.addEventListener("facility-Inventory", (event) => {
    renderAllHTML()
})

document.addEventListener("mineralChosen", (event) => {
    renderAllHTML()
})

document.addEventListener("newMineralPurchased", (event) => {
  renderAllHTML()
})

