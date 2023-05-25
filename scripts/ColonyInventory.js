import { transientState } from "./TransientState.js";
//need to import the transient state
export const colonyInventory = async () => {
  // set a variable to === the transient state colonyId
  const colonyId = transientState.colonyId;
  // use switch to check if the id is === to whatever the colony id is, set the name
  let colonyName;
  switch (colonyId) {
    case 1:
      colonyName = "Tatooine";
      break;
    case 2:
      colonyName = "Hoth";
      break;
    case 3:
      colonyName = "Endor";
      break;
    case 4:
      colonyName = "Kashyyyk";
      break;
    case 5:
      colonyName = "Naboo";
      break;
    case 6:
      colonyName = "Mustafar";
      break;
    case 7:
      colonyName = "Coruscant";
      break;
    case 8:
      colonyName = "Dagobah";
      break;
    case 9:
      colonyName = "Alderaan";
      break;
    case 10:
      colonyName = "Kamino";
      break;
    default:
      //if nothing is === default is an unknown colony
      colonyName = "Unknown Colony";
      break;
  }
  //grab the colonyInventory
  const response = await fetch("http://localhost:8088/colonyInventory");
  // await the response
  const colonyInventory = await response.json();
  let colonyMinerals = []; // Store the minerals for the selected colony
  // iterate over the colony inventory
  for (const Colony of colonyInventory) {
    // if the colonyId === the the colonyId(the colony id we select from the transient state)
    if (Colony.colonyId === colonyId) {
      // then we need to grab the minerals
      const newResponse = await fetch("http://localhost:8088/minerals");
      //wait for the response
      const minerals = await newResponse.json();
      //iterate over the minerals
      for (const mineral of minerals) {
        //if the mineral id is ==== to the colony.mineralId(which is the iterated colonyInventory)
        if (mineral.id === Colony.mineralId) {
          // then we push an object to our array that contains the mineral.name
          //and the colony amount
          colonyMinerals.push({
            name: mineral.name,
            amount: Colony.amount,
          });
        }
      }
    }
  }
  // set up an empty string
  let colonyHtml = "";
  // if the colony minerals array(that we pushed an object to) length is greater than 0
  if (colonyMinerals.length > 0) {
    // colonyHtml += the colonyName;
    //colonyHtml += the section with the id of colonyMinerals
    colonyHtml += `<section id="colonyMinerals"> <h2>${colonyName}</h2>`;
    // then we need to loop through our colonyMinerals(the array that contains our object)
    for (const mineral of colonyMinerals) {
      // then we add to the colonyHtml the mineral.amount tons of mineral.name
      colonyHtml += `<div> ${mineral.amount} tons of ${mineral.name}</div>`;
    }
    // add the closing tag for the section

    colonyHtml += `</section>`;
  }
  // return the colony html
  return colonyHtml;
};
