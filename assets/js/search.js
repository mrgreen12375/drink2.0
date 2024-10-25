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
        if (data.length > 1) {
            prompt.style.display = 'block';
            promptTxt.textContent = 'There are multiple results with that name, did you mean...'
            var promptList = document.createElement('ol');
            promptTxt.append(promptList);
            for (let i = 0; i < data.length; i++) {
                var listItem = document.createElement('li');
                listItem.textContent = data[i].strDrink;
                promptList.append(listItem)

            }
            exitPrompt.addEventListener('click', function() {
                prompt.style.display = 'none';
            })                
        } else {
            displayCocktail(data);
        }
    });
}
//setup function to create elements for the API data parameters used with a for loop and if statement for the measurements/ingredients
function displayCocktail(display) {
    console.log(display.drinks)

    if (display.drinks.length > 1) {
        prompt.style.display = 'block';
        promptTxt.textContent = 'There are multiple results with that name, did you mean...'
        var promptList = document.createElement('ol');
        promptTxt.append(promptList);
        for (let i = 0; i < display.drinks.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = display.drinks[i].strDrink;
            promptList.append(listItem)
            listItem.style.cursor = 'pointer'
            listItem.onclick = function() {
            cocktailName.value = display.drinks[i].strDrink
            prompt.style.display = 'none';
            cocktailButton.click();
            }
        }
        exitPrompt.addEventListener('click', function() {
            prompt.style.display = 'none';
        })                
    } else {
        console.log(display)

        cocktailName.value = '';
    
        for (var i = 0; i < 16; i++) {
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
        card.setAttribute('class', 'favoriteCard');
        card.innerHTML =  ` <h2>${cocktailObject.name}</h2>
                            <img src="${cocktailObject.image}"/>
                            <p>${cocktailObject.instructions}</p> `;
    
        ingredientCard.appendChild(card);
    
        for (var i = 0; i < cocktailObject.ingredients.length; i++) {

            if (cocktailObject.measurements[i] == undefined) {
                cocktailObject.measurements[i] = "add";
            }
    
            var ingredientList = document.createElement('li');
            ingredientList.innerHTML = `${cocktailObject.measurements[i]} : ${cocktailObject.ingredients[i]}`;
           
            card.appendChild(ingredientList);
        }
    
        emptyArray()
        saveButton(cocktailObject)
    }

    
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