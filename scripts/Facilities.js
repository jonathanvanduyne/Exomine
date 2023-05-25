import { setFacilityChoice, transientState } from "./TransientState.js"

export const GetFacilities = async () => {
  const response = await fetch("http://localhost:8088/facilities");
  const facilities = await response.json();
  const activeFacilities = facilities.filter(
    (facility) => facility.status === true
  );
  const allFacilities = activeFacilities
    .map(
      (facility) => {
        if (transientState.facilityId === facility.id) {
          return `<option value="${facility.id}" selected="selected">${facility.location}</option>`
        } else {
          return `<option value="${facility.id}">${facility.location}</option>`
        }
      }
    )
    .join("");

  const dropDown = `<select name="facility">
<option value="0" name='facility'> Choose a facility...</option>
${allFacilities}
</select>`;
  return dropDown;
}

const handleFacilityChoice = (changeEvent) => {
  if (changeEvent.target.name === "facility") {
    const chosenFacility = changeEvent.target.value
    setFacilityChoice(parseInt(chosenFacility))
  }
}

document.addEventListener("change", handleFacilityChoice)