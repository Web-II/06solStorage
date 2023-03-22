import Milestone from "./Milestone.js";

export default class MilestonesComponent {
  #storage;
  #milestones = [];
  constructor(storage) {
    this.#storage = storage;
    this.#getMilestonesFromStorage();

    const addButton = document.getElementById("add");
    const clearButton = document.getElementById("clear");
    const nameText = document.getElementById("name");
    const dateText = document.getElementById("date");

    addButton.onclick = () => {
      try {
        this.#addMilestone(nameText.value, new Date(dateText.value));
        nameText.value = "";
        dateText.value = "";
      } catch (e) {
        alert(e.message);
      }
    };

    clearButton.onclick = () => {
      if (confirm("Click OK to clear all milestones")) {
        this.#clearMilestones();
      }
    };

    this.#toHTML();
  }

  #addMilestone(name, date) {
    if (!name) {
      throw new Error("Name milestone is required.");
    }

    if (!date || !(date instanceof Date) || isNaN(date)) {
      throw new Error("Date milestone is required.");
    }

    if (date < new Date()) {
      throw new Error(
        "This milestone is today or already in the past and cant't be created."
      );
    }

    this.#milestones.push(new Milestone(name, date));
    this.#setMilestonesInStorage();
    this.#toHTML();
  }
  #deleteMilestone(ind) {
    this.#milestones.splice(ind, 1);
    this.#setMilestonesInStorage();
    this.#toHTML();
  }
  #clearMilestones() {
    this.#milestones = [];
    this.#storage.removeItem("milestones");
    this.#toHTML();
  }
  #toHTML() {
    const overview = document.getElementById("overview");

    overview.innerHTML = "";

    this.#milestones.map((m, ind) => {
      const note = document.createElement("div");
      note.setAttribute("class", "notification");

      const btn = document.createElement("button");
      btn.setAttribute("class", "delete");
      btn.addEventListener("click", () => {
        if (confirm("Click OK to confirm the deletion"))
          this.#deleteMilestone(ind);
      });
      note.appendChild(btn);

      const text = document.createTextNode(
        `${m.daysUntilDeadline} days left until ${m.name}`
      );
      note.appendChild(text);

      overview.appendChild(note);
    });
  }

  #getMilestonesFromStorage() {
    this.#milestones = [];
    const milestonesAsJson = this.#storage.getItem("milestones");
    if (milestonesAsJson) {
      this.#milestones = JSON.parse(milestonesAsJson).map(
        (m) => new Milestone(m.name, m.date)
      );
      this.#milestones = this.#milestones.filter(
        (m) => m.daysUntilDeadline >= 0
      );
    }
  }
  #setMilestonesInStorage() {
    this.#milestones.sort((a, b) => a.date - b.date);
    this.#storage.setItem("milestones", JSON.stringify(this.#milestones));
  }
}
