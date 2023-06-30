//setup saving drink names
var savedform = document.querySelector('#save-cocktail-form');
var input = document.querySelector('#save-cocktail');
var savedList = document.querySelector('#saved-cocktail-list');
var saved = []

function saveDrinkName(event) {
    event.preventDefault();
    var name = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);
    if(name == ''){
        prompt.style.display = 'block';
        promptTxt.textContent = "Alert: Please Enter Drink Name";
        exitPrompt.addEventListener('click', function() {
        prompt.style.display = 'none';
        })
        return
    }  else if (name == saved) {
        input.value = ''
        prompt.style.display = 'block';
        promptTxt.textContent = "Alert: Drink Already Saved";
        exitPrompt.addEventListener('click', function() {
        prompt.style.display = 'none';
        })
        return
    } else {
        saved.push(name);
        window.localStorage.setItem('storedSaves', JSON.stringify(saved));
        var storedSaves = window.localStorage.getItem("storedSaves")
        saved = JSON.parse(storedSaves)
        location.reload()
    }
}

function displaySavedList(){
    for(var i = 0; i < saved.length; i++){
        var savedListItem = document.createElement('li');
        var removeBtn = document.createElement('button');
        savedListItem.innerText = saved[i];
        removeBtn.innerText = 'X';
        savedList.appendChild(savedListItem);
        savedListItem.appendChild(removeBtn);
    }
}

function deleteDrinkName(event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.remove();
        var inputTask = document.getElementById('saved-cocktail');
        localStorage.setItem('storedSaves', inputTask);
    } else if (e.target.tagName === 'LI') {
        event.target.classList.toggle('task-complete');
    }
}

function previouslySaved(){ 
    var storedSaves = window.localStorage.getItem("storedSaves")
    if(storedSaves){
        saved = JSON.parse(storedSaves);
        displaySavedList();
    }
}

previouslySaved()
console.log(saved)
savedform.addEventListener('submit', saveDrinkName);
savedList.addEventListener('click', deleteDrinkName);

//---------------------------------------------------------------------------------------------------------------------------------//

//setup variables for cocktail input field and button
var cocktailName = document.querySelector('#cocktailName');
var cocktailButton = document.querySelector('#cocktailButton');
//setup variables for aleart modal
var prompt = document.getElementById('modal');
var promptTxt = document.getElementById('promptTxt');
var exitPrompt = document.getElementById('close');

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
    ingredients.innerHTML = '';
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
        displayCocktail(data);
    });
}
//setup function to create elements for the API data parameters used with a for loop and if statement for the measurements/ingredients
function displayCocktail(display) {
    console.log(display.drinks[0]);

    var ingredients = document.querySelector('#ingredients');

    var drinkName = document.createElement('h2');
    drinkName.innerHTML = display.drinks[0].strDrink;

    var img = document.createElement('img');
    img.src = display.drinks[0].strDrinkThumb;

    ingredients.appendChild(drinkName);
    ingredients.appendChild(img);

    var instructionInfo = document.createElement('p');
    instructionInfo.innerHTML = display.drinks[0].strInstructions;
        
    ingredients.appendChild(instructionInfo);

    for (var i = 1; i < 16; i++) {
        console.log(i); 

        if (display.drinks[0][`strIngredient${i}`] == null){
            return;
        } else if (display.drinks[0][`strMeasure${i}`] == null){
            return;
        }

        var ingredientLs = document.createElement('li');
        ingredientLs.innerHTML = display.drinks[0][`strMeasure${i}`] + ' : ' + display.drinks[0][`strIngredient${i}`];
       
        ingredients.appendChild(ingredientLs);
    }
}
//setup event listener for search button
cocktailButton.addEventListener('click', searchButton);

//---------------------------------------------------------------------------------------------------------------------------------//

var cocktailRandom = document.querySelector('#cocktailRandom');

function searchRandom(event){
    event.preventDefault();
    cocktail = cocktailName.value.trim();
    
    getRandomCocktailInfo()
}
//setup function to clear prior cocktail search
function clearPriorSearch(){
    ingredients.innerHTML = '';
}
//setup funtion to fetch cocktial API information, clear prior search, and display current cocktail information
function getRandomCocktailInfo() {

    var cocktailInfo = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  
    fetch(cocktailInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        clearPriorSearch()
        displayRandomCocktail(data);
    });
}
//setup function to create elements for the API data parameters used with a for loop and if statement for the measurements/ingredients
function displayRandomCocktail(display) {
    console.log(display.drinks[0]);

    var ingredients = document.querySelector('#ingredients');

    var drinkName = document.createElement('h2');
    drinkName.innerHTML = display.drinks[0].strDrink;

    var img = document.createElement('img');
    img.src = display.drinks[0].strDrinkThumb;

    ingredients.appendChild(drinkName);
    ingredients.appendChild(img);

    var instructionInfo = document.createElement('p');
    instructionInfo.innerHTML = display.drinks[0].strInstructions;
        
    ingredients.appendChild(instructionInfo);

    for (var i = 1; i < 16; i++) {
        console.log(i); 

        if (display.drinks[0][`strIngredient${i}`] == null){
            return;
        } else if (display.drinks[0][`strMeasure${i}`] == null){
            return;
        }

        var ingredientLs = document.createElement('li');
        ingredientLs.innerHTML = display.drinks[0][`strMeasure${i}`] + ' : ' + display.drinks[0][`strIngredient${i}`];
       
        ingredients.appendChild(ingredientLs);
    }
}
//setup event listener for search button
cocktailRandom.addEventListener('click', searchRandom);