var cocktailRandom = document.querySelector('#cocktailRandom');

var ingredients = [];
var measurements = [];

var save;
var saved = [];

function clearPriorSearch(){
    ingredientCard.innerHTML = '';
}

function emptyArray(){
    ingredients = [];
    measurements = [];
}

function getRandomCocktailInfo(event) {
    event.preventDefault();

    var randomCocktailInfo = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
  
    fetch(randomCocktailInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        clearPriorSearch()
        if(save){
            save.setAttribute('style', 'display: none;');
        }
        displayRandomCocktail(data);
    });
}

function displayRandomCocktail(display) {

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
        measurements: filteredMeasurments,
        video: display.drinks[0].strVideo
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

    if (cocktailObject.video === null) {
        console.log("no video available");
    } else {
        var videoEl = document.createElement('a');
        videoEl.href = cocktailObject.video;
        videoEl.target = "_blank";
        videoEl.textContent = "Video";
        videoEl.classList.add("video");


        card.appendChild(videoEl);
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

cocktailRandom.addEventListener('click', getRandomCocktailInfo);