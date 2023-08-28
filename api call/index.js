const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recepiclosebtn = document.getElementById("recipe-close-btn");

// event lister
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recepiclosebtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// meal list match ingri
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meal-item" data-id="${meal.idMeal}">
          <div class="meal-img">
            <img src="${meal.strMealThumb}" rel="food" />
          </div>
          <div class="meal-name">
            <h3>${meal.strMeal}</h3>
            <a href="#" class="recipe-btn"> Get recipe </a>
          </div>
        </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry,we didnot find any &#127843";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// get recipe

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        mealRecipeModal(data.meals);
      });
  }
}

// creat model
function mealRecipeModal(meal) {
  // console.log(meal);
  meal = meal[0];
  let html = `
   <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instructions:</h3>
    <p>
      ${meal.strInstructions}
    </p>
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="" />
  </div>
  <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch vedio</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
