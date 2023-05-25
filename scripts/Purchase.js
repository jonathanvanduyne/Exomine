import { transientState } from "./TransientState.js";

export const purchaseButtonTransfer = async (clickEvent) => {
    // Ensure a radio button is checked,

    //On purchase button click,
    const responseFacility = await fetch(
        "http://localhost:8088/facilityInventory"
    );
    const facilityInventories = await responseFacility.json();
    const responseColony = await fetch("http://localhost:8088/colonyInventory");
    const colonyInventories = await responseColony.json();

    //reduce the facilityInventory amount of the checked mineral by 1 and if there were none of that mineral, create it
    // Iterate through the inventory so as to get an actual object
    const matchingFacilityInventories = facilityInventories
        .filter((inventory) => inventory.facilityId === transientState.facilityId)
        .filter((inventory) => inventory.mineralId === transientState.mineralId);

    if (matchingFacilityInventories.length > 0) {
        const facilityInventory = matchingFacilityInventories[0];
        if (facilityInventory.amount !== 0) {
            facilityInventory.amount--; // Walked through the debugger and this does happen but we need to post it so it becomes real

            const facilityInventoryUpdateOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(facilityInventory),
            };
            await fetch(
                `http://localhost:8088/facilityInventory/${facilityInventory.id}`,
                facilityInventoryUpdateOptions
            );

            const matchingColonyInventories = colonyInventories
                .filter((inventory) => inventory.colonyId === transientState.colonyId)
                .filter(
                    (inventory) => inventory.mineralId === transientState.mineralId
                );
            if (matchingColonyInventories.length > 0) {
                const colonyInventory = matchingColonyInventories[0];
                colonyInventory.amount++;

                const colonyInventoryUpdateOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(colonyInventory),
                };
                await fetch(
                    `http://localhost:8088/colonyInventory/${colonyInventory.id}`,
                    colonyInventoryUpdateOptions
                );
            } else {
                const colonyInventoryObject = {
                    colonyId: transientState.colonyId,
                    mineralId: transientState.mineralId,
                    amount: 1,
                };
                //POST the object to colonyInventory
                const postOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(colonyInventoryObject),
                };
                await fetch("http://localhost:8088/colonyInventory", postOptions);
            }
        }
    }
    const customEvent = new CustomEvent("newMineralPurchased");
    document.dispatchEvent(customEvent);
}

document.addEventListener("click", (clickEvent) => {
    if (transientState.mineralId !== 0) {
        if (transientState.governorId !== 0) {
            if (clickEvent.target.id === "purchase") {
                purchaseButtonTransfer();
            }
        }
    }
});
