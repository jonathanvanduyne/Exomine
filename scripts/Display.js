import { GetPurchasePreview, PurchaseButton } from "./Cart.js";
import { GetFacilities } from "./Facilities.js";
import { getFacilityInventory } from "./FacilitiesInventory.js";
import { GetGovernors } from "./Govenors.js";
import { colonyInventory } from "./ColonyInventory.js";
import { getFacilityInventoryTitle } from "./FacilityInventoryTitle.js";

export const display = async () => {
    const governorsHTML = await GetGovernors();
    const facilitiesHTML = await GetFacilities();
    const facilityInventoryHTML = await getFacilityInventory();
    const purchaseButtonHTML = PurchaseButton();
    const purchasePreviewHTML = await GetPurchasePreview();
    const colonyHtml = await colonyInventory();
    const facilityInventoryTitleHTML = await getFacilityInventoryTitle();

    return `
        <header>
        <h1>Solar System Mining Marketplace </h1>
        </header>
        <section class="choosen">
        <section class="right-container">
        <section class="choose_governor">
            <h2>Choose Governor:</h2>
        ${governorsHTML}
        </section>
        
        <section class="choose_facility">
            <h2>Choose Facility:</h2>
        ${facilitiesHTML}
        </section>
        </section>

        <section class="colony_minerals_chosen">
        ${colonyHtml}
        </section>
        </section>
        <section class="bottom">
        <section id="facility_inventory">
            ${facilityInventoryTitleHTML}
        ${facilityInventoryHTML}
        </section>

        <section id="purchase">
        <h3 class="space-cart">Space Cart<h3>
        ${purchasePreviewHTML}
        ${purchaseButtonHTML}   
        </section> 
    `;
};
