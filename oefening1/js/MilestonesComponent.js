import Milestone from "./Milestone.js";

export default class MilestonesComponent {
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
  calculateDiffDays(d) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil(
      Math.abs((new Date().getTime() - new Date(d).getTime()) / oneDay)
    );
  }
  addMilestone(name, date) {
    if (name === "" || date === "") alert("Name/Date milestone required");
    else if (new Date(date) < new Date())
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
      const note = document.createElement("div");
      note.setAttribute("class", "notification");

      const btn = document.createElement("button");
      btn.setAttribute("class", "delete");
      btn.addEventListener("click", () => {
        if (confirm("Click OK to confirm the deletion"))
          this.deleteMilestone(ind);
      });

      note.appendChild(btn);

      note.appendChild(
        document.createTextNode(
          this.calculateDiffDays(m.date) + " days left until " + m.name
        )
      );

      document.getElementById("overview").appendChild(note);
    });
  }
  getMilestonesFromStorage() {
    this.#milestones = [];
    const mA = this.#storage.getItem("milestones");
    if (mA) {
      this.#milestones = JSON.parse(mA).map(
        (m) => new Milestone(m.name, m.date)
      );
      this.#milestones = this.#milestones.filter(
        (m) => this.calculateDiffDays(m.date) >= 0
      );
    }
  }
  setMilestonesInStorage() {
    this.#milestones.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.#storage.setItem("milestones", JSON.stringify(this.#milestones));
  }
}
