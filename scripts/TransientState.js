export const transientState = {
  governorId: 0,
  colonyId: 0,
  facilityId: 0,
  mineralId: 0,
};

export const setGovernorChoice = (chosenGovernor) => {
  transientState.governorId = chosenGovernor;
  console.log(transientState);
};

export const setColonyChoice = (chosenColony) => {
  transientState.colonyId = chosenColony;
  console.log(transientState);
  // need to set up a custom event to "say" something in the code happened
  const customEvent = new CustomEvent("colony-choosen");
  //dispatch it
  document.dispatchEvent(customEvent);
};

export const setFacilityChoice = (chosenFacility) => {
  transientState.facilityId = chosenFacility;
  console.log(transientState);
};

export const setMineralChoice = (chosenMineral) => {
  transientState.mineralId = chosenMineral;
  console.log(transientState);

  const customEvent = new CustomEvent("mineralChosen")
  document.dispatchEvent(customEvent)
};


