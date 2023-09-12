const dishContainer = document.querySelector(".dish-container");
const btnSort = document.querySelectorAll(".btnSort");
const btnChoice = document.querySelectorAll(".radio");
const dishChoice = document.querySelectorAll(".img");
let dishData = [];
let choiceMethod = "All";
let sortMethod = "alpha";

async function fetchDish() {
  await fetch("item.json")
    .then((res) => res.json())
    .then((data) => (dishData = data));
  dishDisplay();
  console.log(dishData);
}
/*Display PopUp*/

/* Display */
function dishDisplay() {
  dishContainer.innerHTML = dishData
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.price - a.price;
      } else if (sortMethod === "minToMax") {
        return a.price - b.price;
      } else if (sortMethod === "alpha") {
        return a.name.localeCompare(b.name);
      }
    })
    .filter((dish) => {
      if (choiceMethod === "plat") {
        return dish.type.includes("Plat");
      } else if (choiceMethod === "entree") {
        return dish.type.includes("Entree");
      } else if (choiceMethod === "dessert") {
        return dish.type.includes("Dessert");
      } else {
        return dish.type;
      }
    })
    .map(
      (dish) =>
        `<div class="card">
        <img src="${dish.picmini}" class="img" id="${dish.id}" alt="${dish.name}">
  <h2>${dish.name}</h2>
  <h4>${dish.price} €</h4>
  <button class="btnbasket" id="${dish.id}">by</button>
  </div>
  `
    )
    .join("");
}
/*Moteur de Recherche ( croissant décroissant)*/

window.addEventListener("load", fetchDish());

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    dishDisplay();
  });
});

btnChoice.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    choiceMethod = e.target.id;
    dishDisplay();
  });
});
