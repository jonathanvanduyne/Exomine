import { GetPurchasePreview } from "./Cart.js";
import { setMineralChoice, transientState } from "./TransientState.js";

export const getFacilityInventory = async (chosenFacility) => {
    const response = await fetch(
        "http://localhost:8088/facilityInventory?_expand=mineral"
    );
    const facilitiesInventories = await response.json();

    const correctFacility = transientState.facilityId;
    let facilityInventoryHTML = ``;

    if (transientState.facilityId !== 0) {
        for (const facilityInventory of facilitiesInventories) {
            if (facilityInventory.facilityId === correctFacility) {
                const isChecked =
                    facilityInventory.mineral.id === transientState.mineralId
                        ? "checked"
                        : "";
                facilityInventoryHTML += `<input type="radio" name="facilityInventory" facilityId = "${facilityInventory.facilityId}" data-mineralId="${facilityInventory.mineralId}" value="${facilityInventory.id}"  ${isChecked}/>${facilityInventory.amount} tons of ${facilityInventory.mineral.name}<br>`;
            }
        }
    }
    return facilityInventoryHTML;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleFacilityInventoryChoice = (changeEvent) => {
    if (changeEvent.target.name === "facility") {
        const chosenFacility = parseInt(changeEvent.target.value);
        const facilityInventoryCustomEvent = new CustomEvent("facility-Inventory");
        document.dispatchEvent(facilityInventoryCustomEvent);
        transientState.mineralId = 0;
        return getFacilityInventory(chosenFacility);
    }
};

const HandleMineralChoice = (changeEvent) => {
    if (changeEvent.target.name === "facilityInventory") {
        const chosenMineral = changeEvent.target.dataset.mineralid;
        setMineralChoice(parseInt(chosenMineral));
    }
};

document.addEventListener("change", handleFacilityInventoryChoice);
document.addEventListener("change", GetPurchasePreview);
document.addEventListener("change", HandleMineralChoice);
