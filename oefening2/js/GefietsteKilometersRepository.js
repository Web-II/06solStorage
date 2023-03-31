import GefietsteKilometers from "./GefietsteKilometers.js";
export default class GefietsteKilometersRepository {
  #repository = [];
  constructor() {
    this.#opvullen();
  }

  get repository() {
    return this.#repository;
  }

  geefJaren() {
    const jarenSet = this.#repository.reduce((result, value, index, array) => {
      return result.add(value.jaar);
    }, new Set());
    return [...jarenSet];
  }

  geefGefietsteKilometersVoorEenJaar(jaar) {
    return this.#repository.filter((j) => j.jaar === jaar)[0];
  }

  wijzigGefietsteKilometers(jaar, waarden) {
    this.geefGefietsteKilometersVoorEenJaar(jaar).aantalKilometers = waarden;
    console.log(this.geefGefietsteKilometersVoorEenJaar(jaar));
  }

  voegToe(jaar, aantalKilometers, bedragPerKilometer) {
    this.#repository.push(
      new GefietsteKilometers(jaar, aantalKilometers, bedragPerKilometer)
    );
  }

  #opvullen() {
    const huidigJaar = new Date().getFullYear();
    this.voegToe(
      huidigJaar - 2,
      [107, 109, 183, 154, 118, 136, 104, 178, 189, 98, 107, 145],
      0.2
    );
    this.voegToe(
      huidigJaar - 1,
      [123, 145, 178, 113, 174, 158, 149, 133, 167, 120, 166, 142],
      0.2
    );
    this.voegToe(
      huidigJaar,
      [156, 128, 129, 160, 190, 145, 155, 198, 120, 130, 140, 150],
      0.21
    );
  }
}
