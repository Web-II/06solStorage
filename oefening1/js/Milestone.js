export default class Milestone {
  #name;
  #date;

  constructor(name, date) {
    this.name = name;
    this.date = date;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get date() {
    return this.#date;
  }
  set date(value) {
    this.#date = new Date(value);
  }

  get daysUntilDeadline() {
    const ONE_DAY_IN_MILLSECONDS = 24 * 60 * 60 * 1000;
    const today = Date.now();
    const days = Math.ceil((this.#date - today) / ONE_DAY_IN_MILLSECONDS);
    return days;
  }

  toJSON() {
    return {
      name: this.name,
      date: this.date,
    };
  }
}
