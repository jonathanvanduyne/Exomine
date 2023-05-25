import {
    setColonyChoice,
    setGovernorChoice,
    transientState,
} from "./TransientState.js";

export const GetGovernors = async () => {
    const response = await fetch("http://localhost:8088/governors");
    const governors = await response.json();

    let governorHTML = `<select name="governor">
    <option value="0" data-colonyId="0">Choose a governor...</option>`;

    const divStringArray = governors.map((governor) => {
        if (governor.status === true) {
            const isSelected =
                governor.id === transientState.governorId ? "selected" : "";
            return `<option value='${governor.id}' data-colonyid='${governor.colonyId}'${isSelected}>${governor.name}</option>`;
        }
    });
    governorHTML += divStringArray.join("");
    governorHTML += "</select>";

    return governorHTML;
};

const handleGovernorChoice = (changeEvent) => {
    if (changeEvent.target.name === "governor") {
        const chosenGovernor = changeEvent.target.value;
        setGovernorChoice(parseInt(chosenGovernor));
    }
};

document.addEventListener("change", handleGovernorChoice);

export const handleColonyChoice = (changeEvent) => {
    if (changeEvent.target.name === "governor") {
        const i = parseInt(changeEvent.target.value);
        const chosenColony = changeEvent.target[i].dataset.colonyid;
        setColonyChoice(parseInt(chosenColony));
    }
};

document.addEventListener("change", handleColonyChoice);
