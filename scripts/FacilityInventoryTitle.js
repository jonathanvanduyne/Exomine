  import { transientState } from "./TransientState.js";
  
  export const getFacilityInventoryTitle = async () => {
    const response = await fetch("http://localhost:8088/facilities");
    const facilities = await response.json();

    let facilitiesInventoryTitleHTML = `<h2>Facility Minerals</h2>`
    facilities
    .map(
      (facility) => {
        if (transientState.facilityId === facility.id) {
          return facilitiesInventoryTitleHTML = `<h2>Facility Minerals for ${facility.location}</h2>`
        }
      }
    )
    return facilitiesInventoryTitleHTML
  }