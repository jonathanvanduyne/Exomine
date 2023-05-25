import { transientState } from "./TransientState.js";

export const PurchaseButton = () => {
    let buttonClass = "purchase-btn";
    if (!transientState.mineralId || !transientState.facilityId) {
        buttonClass += " hidden-btn";
    }
    return `<div><button class='${buttonClass}' id='purchase'>Purchase Mineral</button></div>`;
    //return `<div><button class="hiddin-btn"class='purchase-btn' id='purchase'>Purchase Mineral</button></div>`;
};

export const GetPurchasePreview = async () => {
    const responseMineral = await fetch("http://localhost:8088/minerals");
    const minerals = await responseMineral.json();
    const responseFacility = await fetch("http://localhost:8088/facilities");
    const facilities = await responseFacility.json();

    let PurchasePreviewHTML = "";

    const PurchasePreview = () => {
        // 1 ton of iron from Ganymede `<div>1 ton of ${mineral.name} from ${facility.name}</div>`
        // Listen for a custom event inside of HandleMineralChoice
        minerals.map((mineral) => {
            if (mineral.id === transientState.mineralId) {
                facilities.map((facility) => {
                    if (facility.id === transientState.facilityId) {
                        PurchasePreviewHTML = `<div>1 ton of ${mineral.name} from ${facility.location}</div>`;
                    }
                });
            }
        });
        return PurchasePreviewHTML;
    };
    PurchasePreview();
    return PurchasePreviewHTML;
};
