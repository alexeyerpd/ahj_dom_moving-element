import Image from "../../img/goblin.png";

import "./field.css";

export class Field {
  constructor() {
    this.columns = [];
    this.currentElement = null;
    this.image = null;
    this.field = null;
    this.btnRestart = null;

    this.intervalId = null;
  }

  init() {
    this.createField();
    this.setEvents();
    this.runGame();
  }

  createField() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container">
        <table class="field">
            <tbody>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
            </tbody>
        </table>
        <button class="btn-restart">Заново</button>
      </div>
    `
    );
    this.field = document.querySelector(".field");
    this.columns = document.querySelectorAll(".column");
    this.btnRestart = document.querySelector(".btn-restart");
  }

  setEvents() {
    this.field.addEventListener("click", (e) => {
      if (e.target.classList.contains("img")) {
        clearInterval(this.intervalId);
        this.image.remove();

        this.currentElement = null;
        this.image = null;
      }
    });

    this.btnRestart.addEventListener("click", () => {
      this.runGame();
    });
  }

  createImage() {
    const image = document.createElement("img");
    image.classList.add("img");
    image.setAttribute("src", Image);

    this.image = image;
  }

  insertImage(element) {
    this.currentElement = element;

    if (!this.image) {
      this.createImage();
    }
    element.appendChild(this.image);
  }

  runGame() {
    clearInterval(this.intervalId);

    const run = () => {
      this.insertImage(this.getRandomElement());
    };

    run();
    this.intervalId = setInterval(run, 1000);
  }

  getRandomElement(currentElement) {
    const index = this.getRandomElementIndex();
    const element = this.columns[index];
    if (currentElement === element) {
      return this.getRandomElement(currentElement);
    }
    return element;
  }

  getRandomElementIndex() {
    return Math.floor(Math.random() * this.columns.length);
  }
}
