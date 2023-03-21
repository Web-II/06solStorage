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
