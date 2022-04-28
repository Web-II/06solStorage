import { calculateDiffDays } from "./calcDiffDays.js";
import { Milestone } from "./mileStone.js";

class MilestonesComponent {
  #storage;
  #milestones = [];
  constructor(storage) {
    this.#storage = storage;
  }

  get storage() {
    return this.#storage;
  }

  get milestones() {
    return this.#milestones;
  }

  addMilestone(name, date) {
    if (!name || !date) alert("Name/Date milestone required");
    else if (calculateDiffDays(date) < 1)
      alert("This milestone is today or already in the past and isn't added");
    else {
      this.#milestones.push(new Milestone(name, date));
      this.setMilestonesInStorage();
      this.toHTML();
    }
  }
  deleteMilestone(ind) {
    this.#milestones.splice(ind, 1);
    this.setMilestonesInStorage();
    this.toHTML();
  }
  clearMilestones() {
    this.#milestones = [];
    this.#storage.removeItem("milestones");
    this.toHTML();
  }
  toHTML() {
    document.getElementById("overview").innerHTML = "";
    this.#milestones.map((m, ind) => {
      const li = document.createElement("li");
      li.setAttribute("class", "list-group-item col-sm-8");
      li.appendChild(
        document.createTextNode(
          calculateDiffDays(m.date) + " days left until " + m.name
        )
      );
      const btn = document.createElement("button");
      btn.setAttribute("class", "btn btn-default");
      btn.setAttribute("style", "margin-left:20px");
      btn.innerText = "-";
      btn.addEventListener("click", () => {
        if (confirm("Click OK to confirm the deletion"))
          this.deleteMilestone(ind);
      });
      li.appendChild(btn);
      document.getElementById("overview").appendChild(li);
    });
  }
  getMilestonesFromStorage() {
    this.#milestones = [];
    const mA = this.#storage.getItem("milestones");
    if (mA) {
      this.#milestones = JSON.parse(mA)
        .map((m) => new Milestone(m.name, m.date))
        .filter((m) => calculateDiffDays(m.date) > 0);
    }
  }
  setMilestonesInStorage() {
    this.#milestones.sort((a, b) => calculateDiffDays(a.date, b.date));
    this.#storage.setItem("milestones", JSON.stringify(this.#milestones));
  }
}

function init() {
  const milestonesComponent = new MilestonesComponent(this.localStorage);
  const addButton = document.getElementById("add");
  const clearButton = document.getElementById("clear");
  const nameText = document.getElementById("name");
  const dateText = document.getElementById("date");

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
