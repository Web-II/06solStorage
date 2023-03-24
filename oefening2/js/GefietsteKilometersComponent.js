import GefietsteKilometersRepository from "./GefietsteKilometersRepository.js";
export default class GefietsteKilometersComponent {
  #gefietsteKilometersRepository;
  #storage;
  constructor() {
    this.#gefietsteKilometersRepository = new GefietsteKilometersRepository();
    this.#storage = window.localStorage;

    const jaarSelect = document.getElementById("jaar");
    this.#jarenToHtml();
    this.#getJaarFromStorage();
    this.#gefietsteKilometersToHtml(parseInt(jaarSelect.value));
    jaarSelect.onchange = () => {
      this.#gefietsteKilometersToHtml(parseInt(jaarSelect.value));
      this.#setJaarInStorage();
    };

    document.getElementById("opslaan").onclick = () => {
      let nieuw = [];
      for (let i = 0; i < 12; i++) {
        nieuw.push(parseInt(document.getElementById(i).value));
      }
      this.#gefietsteKilometersRepository.wijzigGefietsteKilometers(
        parseInt(jaarSelect.value),
        nieuw
      );
      this.#gefietsteKilometersToHtml(parseInt(jaarSelect.value));
    };
  }

  /* De keuzelijst met jaren dynamisch genereren */
  #jarenToHtml() {
    this.#gefietsteKilometersRepository.geefJaren().forEach((value) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", value);
      const optionTekst = document.createTextNode(value);
      optionElement.appendChild(optionTekst);
      document.getElementById("jaar").appendChild(optionElement);
    });
  }

  /* De tekstvakken dynamisch invullen */
  #gefietsteKilometersToHtml(jaar) {
    const waarden =
      this.#gefietsteKilometersRepository.geefGefietsteKilometersVoorEenJaar(
        jaar
      );
    waarden.aantalKilometers.forEach((value, index, array) => {
      document.getElementById(index).value = value;
    });
  }

  #getJaarFromStorage() {
    if (this.#storage.getItem("jaarGefietsteKilometers")) {
      document.getElementById("jaar").value = this.#storage.getItem(
        "jaarGefietsteKilometers"
      );
    }
  }

  #setJaarInStorage() {
    try {
      this.#storage.setItem(
        "jaarGefietsteKilometers",
        document.getElementById("jaar").value
      );
    } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) alert("Out of storage!");
    }
  }
}
