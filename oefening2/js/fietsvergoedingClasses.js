export class GefietsteKilometers {
  #jaar;
  #aantalKilometers;
  #bedragPerKilometer;
  constructor(jaar, aantalKilometers, bedragPerKilometer) {
    this.jaar = jaar;
    this.aantalKilometers = aantalKilometers;
    this.bedragPerKilometer = bedragPerKilometer;
  }

  get jaar() {
    return this.#jaar;
  }
  get aantalKilometers() {
    return this.#aantalKilometers;
  }
  get bedragPerKilometer() {
    return this.#bedragPerKilometer;
  }
  set jaar(value) {
    this.#jaar = value;
  }
  set aantalKilometers(value) {
    this.#aantalKilometers = value;
  }
  set bedragPerKilometer(value) {
    this.#bedragPerKilometer = value;
  }
  toJSON() {
    return {
      jaar: this.jaar,
      aantalKilometers: this.aantalKilometers,
      bedragPerKilometer: this.bedragPerKilometer,
    };
  }
}

export class GefietsteKilometersRepository {
  #repository;
  constructor() {
    this.#repository = [];
  }

  get repository() {
    return this.#repository;
  }
  set repository(value) {
    this.#repository = value;
  }

  geefJaren() {
    const jarenSet = this.#repository.reduce((result, value, index, array) => {
      return result.add(value.jaar);
    }, new Set());
    return [...jarenSet];
  }

  geefGefietsteKilometersVoorEenJaar(jaar) {
    return this.#repository.filter((value, index, array) => {
      return value.jaar === jaar;
    })[0].aantalKilometers;
  }

  wijzigGefietsteKilometers(jaar, waarden) {
    this.repository.find((fv) => fv.jaar === jaar).aantalKilometers = waarden;
  }

  voegToe(jaar, aantalKilometers, bedragPerKilometer) {
    this.#repository.push(
      new GefietsteKilometers(jaar, aantalKilometers, bedragPerKilometer)
    );
  }

  opvullen() {
    this.voegToe(
      2015,
      [107, 109, 183, 154, 118, 136, 104, 178, 189, 98, 107, 145],
      0.2
    );
    this.voegToe(
      2016,
      [123, 145, 178, 113, 174, 158, 149, 133, 167, 120, 166, 142],
      0.2
    );
    this.voegToe(
      2017,
      [156, 128, 129, 160, 190, 145, 155, 198, 120, 130, 140, 150],
      0.21
    );
  }
}
