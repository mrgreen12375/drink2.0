//setup variables for cocktail input field and button
var cocktailName = document.querySelector('#cocktailName');
var cocktailButton = document.querySelector('#cocktailButton');
//setup variables for aleart modal
var prompt = document.getElementById('modal');
var promptTxt = document.getElementById('promptTxt');
var exitPrompt = document.getElementById('close');

var ingredients = [];
var measurements = [];

var save;
var saved = [];

//setup function to initiate modal if field is empty or get cocktail information
function searchButton(event){
    event.preventDefault();
    cocktail = cocktailName.value.trim();
    if(cocktail == ''){
        prompt.style.display = 'block';
            promptTxt.textContent = "Alert: Please Enter Drink Name";
            exitPrompt.addEventListener('click', function() {
                prompt.style.display = 'none';
        })
        return
    } 
    getCocktailInfo()
}
//setup function to clear prior cocktail search
function clearPriorSearch(){
    ingredientCard.innerHTML = '';
}

function emptyArray(){
    ingredients = [];
    measurements = [];
}

//setup funtion to fetch cocktial API information, clear prior search, and display current cocktail information
function getCocktailInfo() {

    var cocktailInfo = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
  
    fetch(cocktailInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        clearPriorSearch()
        if(save){
            save.setAttribute('style', 'display: none;');
        }
        displayCocktail(data);
    });
}
//setup function to create elements for the API data parameters used with a for loop and if statement for the measurements/ingredients
function displayCocktail(display) {

    console.log(display)

    cocktailName.value = '';

    for (var i = 1; i < 16; i++) {
        ingredients.push(display.drinks[0][`strIngredient${i}`]);
        measurements.push(display.drinks[0][`strMeasure${i}`]);
    }

    var filteredIngredients = ingredients.filter(function (el) {
        return el != null;
    });

    var filteredMeasurments = measurements.filter(function (el) {
        return el != null;
    });

    var cocktailObject  = {
        name: display.drinks[0].strDrink,
        image: display.drinks[0].strDrinkThumb,
        instructions: display.drinks[0].strInstructions, 
        ingredients: filteredIngredients,
        measurements: filteredMeasurments
    }

    console.log(cocktailObject);

    var ingredientCard = document.querySelector('#ingredientCard');

    var card = document.createElement('div');
    card.setAttribute('class', 'order');
    card.innerHTML =  ` <h2>${cocktailObject.name}</h2>
                        <img src="${cocktailObject.image}"/>
                        <p>${cocktailObject.instructions}</p> `;

    ingredientCard.appendChild(card);

    for (var i = 0; i < cocktailObject.measurements.length; i++) {

        var ingredientList = document.createElement('li');
        ingredientList.innerHTML = `${cocktailObject[i].measurements} : ${cocktailObject[i].ingredients}`;
       
        ingredientCard.appendChild(ingredientList);
    }

    emptyArray()
    saveButton(cocktailObject)
}

function saveButton(cocktailObject) {
    
    var form = document.querySelector("#form");

    save = document.createElement('button');
    save.textContent = "Save";

    form.appendChild(save);

    save.addEventListener('click', function(event){
        event.preventDefault();

        var savedCocktail = JSON.parse(localStorage.getItem("savedCocktail"))
        if (savedCocktail !== null) {
            saved = savedCocktail;
        }

        if(!saved.includes(cocktailObject)){
        saved.push(cocktailObject);
        window.localStorage.setItem('savedCocktail', JSON.stringify(saved));
        save.setAttribute('style', 'display: none;');
        }
    })
}
//setup event listener for search button
cocktailButton.addEventListener('click', searchButton);