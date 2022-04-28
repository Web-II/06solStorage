import {
  GefietsteKilometers,
  GefietsteKilometersRepository,
} from "./fietsvergoedingClasses.js";

class GefietsteKilometersComponent {
  #gefietsteKilometersRepository;
  #storage;
  constructor(storage) {
    this.gefietsteKilometersRepository = new GefietsteKilometersRepository();
    this.storage = storage;
    this.getFromStorage();
  }

  get gefietsteKilometersRepository() {
    return this.#gefietsteKilometersRepository;
  }
  get storage() {
    return this.#storage;
  }

  set gefietsteKilometersRepository(value) {
    this.#gefietsteKilometersRepository = value;
  }
  set storage(value) {
    this.#storage = value;
  }

  /* De keuzelijst met jaren dynamisch genereren */
  jarenToHtml() {
    this.gefietsteKilometersRepository.geefJaren().forEach((value) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", value);
      const optionTekst = document.createTextNode(value);
      optionElement.appendChild(optionTekst);
      document.getElementById("jaar").appendChild(optionElement);
    });
  }

  /* De tekstvakken dynamisch invullen */
  gefietsteKilometersToHtml(jaar) {
    const waarden =
      this.gefietsteKilometersRepository.geefGefietsteKilometersVoorEenJaar(
        jaar
      );
    waarden.forEach((value, index, array) => {
      document.getElementById(index).value = value;
    });
  }

  getFromStorage() {
    if (this.#storage.getItem("gefietsteKilometersRepo")) {
      this.gefietsteKilometersRepository.repository = JSON.parse(
        this.#storage.getItem("gefietsteKilometersRepo")
      ).map(
        (f) =>
          new GefietsteKilometers(
            f.jaar,
            f.aantalKilometers,
            f.bedragPerKilometer
          )
      );
      console.log(this.gefietsteKilometersRepository);
    } else {
      this.gefietsteKilometersRepository.opvullen();
      this.setInStorage();
    }
  }

  setInStorage() {
    try {
      this.#storage.setItem(
        "gefietsteKilometersRepo",
        JSON.stringify(this.gefietsteKilometersRepository.repository)
      );
    } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) alert("Out of storage!");
    }
  }
}

function init() {
  const gefietsteKilometersComponent = new GefietsteKilometersComponent(
    localStorage
  );
  const jaarSelect = document.getElementById("jaar");

  gefietsteKilometersComponent.jarenToHtml();
  gefietsteKilometersComponent.gefietsteKilometersToHtml(
    parseInt(jaarSelect.value)
  );
  document.getElementById("jaar").onchange = () => {
    gefietsteKilometersComponent.gefietsteKilometersToHtml(
      parseInt(jaarSelect.value)
    );
  };
  document.getElementById("opslaan").onclick = () => {
    let nieuw = [];
    for (let i = 0; i < 12; i++) {
      nieuw.push(parseInt(document.getElementById(i).value));
    }
    gefietsteKilometersComponent.gefietsteKilometersRepository.wijzigGefietsteKilometers(
      parseInt(jaarSelect.value),
      nieuw
    );
    gefietsteKilometersComponent.setInStorage();
  };
}

window.onload = init;
