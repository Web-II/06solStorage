class Milestone {
  #name;
  #date;
  constructor(name, date) {
    this.name = name;
    this.date = date;
  }

  get name() {
    return this.#name;
  }
  get date() {
    return this.#date;
  }

  set name(value) {
    this.#name = value;
  }
  set date(value) {
    this.#date = value;
  }
  toJSON() {
    return {
      name: this.name,
      date: this.date,
    };
  }
}

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
  calculateDiffDays(d) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.ceil(
      Math.abs((new Date().getTime() - new Date(d).getTime()) / oneDay)
    );
  }
  addMilestone(name, date) {
    if (name === '' || name === null || date === null)
      alert('Name/Date milestone required');
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
    this.#storage.removeItem('milestones');
    this.toHTML();
  }
  toHTML() {
    document.getElementById('overview').innerHTML = '';
    this.#milestones.map((m, ind) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'list-group-item col-sm-8');
      li.appendChild(
        document.createTextNode(
          this.calculateDiffDays(m.date) + ' days left until ' + m.name
        )
      );
      const btn = document.createElement('button');
      btn.setAttribute('class', 'btn btn-default');
      btn.setAttribute('style', 'margin-left:20px');
      btn.innerText = '-';
      btn.addEventListener('click', () => {
        this.deleteMilestone(ind);
      });
      li.appendChild(btn);
      document.getElementById('overview').appendChild(li);
    });
  }
  getMilestonesFromStorage() {
    this.#milestones = [];
    const mA = this.#storage.getItem('milestones');
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
    this.#storage.setItem('milestones', JSON.stringify(this.#milestones));
  }
}

function init() {
  const milestonesComponent = new MilestonesComponent(this.localStorage);
  const addButton = document.getElementById('add');
  const clearButton = document.getElementById('clear');
  const nameText = document.getElementById('name');
  const dateText = document.getElementById('date');

  if (!milestonesComponent.storage) {
    //browser ondersteunt geen storage
    alert('no storage available. ');
    addButton.disabled = true;
    clearButton.disabled = true;
    return;
  }

  milestonesComponent.getMilestonesFromStorage();
  milestonesComponent.toHTML();

  addButton.onclick = () => {
    milestonesComponent.addMilestone(nameText.value, dateText.value);
    nameText.value = '';
  };

  clearButton.onclick = () => {
    milestonesComponent.clearMilestones();
  };
}
window.onload = init;
