import MilestonesComponent from "./MilestonesComponent.js";

function init() {
  const milestonesComponent = new MilestonesComponent(this.localStorage);
  const addButton = document.getElementById("add");
  const clearButton = document.getElementById("clear");
  const nameText = document.getElementById("name");
  const dateText = document.getElementById("date");

  if (!milestonesComponent.storage) {
    //browser ondersteunt geen storage
    alert("no storage available. ");
    addButton.disabled = true;
    clearButton.disabled = true;
    return;
  }

  milestonesComponent.getMilestonesFromStorage();
  milestonesComponent.toHTML();

  addButton.onclick = () => {
    milestonesComponent.addMilestone(nameText.value, dateText.value);
    nameText.value = "";
  };

  clearButton.onclick = () => {
    if (confirm("Click OK to clear all milestones"))
      milestonesComponent.clearMilestones();
  };
}
window.onload = init;
