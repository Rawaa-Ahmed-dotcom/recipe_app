// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

let searchInput = document.querySelector(".search-input");
let searchIcon = document.querySelector(".search-icon");
let recipeDetails = document.querySelector(".recipe-details");
let resultsArea = document.querySelector(".results-area");


async function getRecipes() {
    let searchTerm = searchInput.value.trim();
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`);
    let body = await data.json();
    displayRecipes(body.meals);
    console.log(body.meals);
}

searchIcon.addEventListener("click",getRecipes);
function displayRecipes(data) {
    if(data == null) {
        resultsArea.innerHTML = ``;
        let messageEle = document.createElement("h2");
        let message = document.createTextNode("...No Data Found");
        messageEle.append(message);
        resultsArea.append(messageEle);
        
    }
    else {
        resultsArea.innerHTML = ``;
        data.forEach((recipe) => {
            resultsArea.innerHTML += `
                <div class="card">
                    <div class="card-image">
                        <img src="${recipe.strMealThumb}" alt="">
                    </div>
                    <div class="card-info">
                        <h2 class="title">${recipe.strMeal}</h2>
                        <a href="#" class ="get-recipe-btn" data-slug = "${recipe.idMeal}">Get Recipe</a>
                    </div>
                </div>
                `
            
        })
    }
    
}
resultsArea.addEventListener("click",getRecipeDetails);
         
function getRecipeDetails (event){
   if(event.target.classList.contains("get-recipe-btn")) {
    getRecipeDetailsBySlug(event.target.dataset.slug);
   }
}
async function getRecipeDetailsBySlug(slug) {
   let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`);
   let body = await data.json();
   console.log(body.meals);
   recipeDetails.innerHTML = `
        <i class="fa-solid fa-circle-xmark" id="close-icon"></i>
        <h2>${body.meals[0].strMeal}</h2>
        <h3>instructions : </h3>
        <p class="instructions">${body.meals[0].strInstructions}</p>
        <a href="${body.meals[0].strYoutube}" class="watch_video">Watch Video</a>
   `;
   recipeDetails.classList.remove("remove-details");
}
recipeDetails.addEventListener("click",closeRecipeDetails);
function closeRecipeDetails(event) {
  if(event.target.id === "close-icon") {
    recipeDetails.classList.add("remove-details");
  }
}