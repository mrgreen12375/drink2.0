function favoritesList() {
    var favorites = document.querySelector('#favorites');

    var savedCocktail = JSON.parse(localStorage.getItem("savedCocktail"));

    console.log(savedCocktail)

    if (savedCocktail === null) {
        var favoriteEl = document.createElement('div');
        favoriteEl.innerHTML = `<div class='favoriteCardEmpty'>
                                <h1>No Favorite Cocktails Yet!</h1>
                                </div>`;

        favorites.appendChild(favoriteEl);
    } else {
        for(let i=0; i < savedCocktail.length; i++){
                    
            var favoriteEl = document.createElement('div');
            favoriteEl.setAttribute('class', 'favoriteCard')
            favoriteEl.innerHTML = `<h2>${savedCocktail[i].name}</h2>
                                    <img src="${savedCocktail[i].image}"/>
                                    <p>${savedCocktail[i].instructions}</p>`;

            favorites.appendChild(favoriteEl);

            console.log(savedCocktail[i].measurements)

            for (var j = 0; j < savedCocktail[i].measurements.length; j++) {

                var ingredientList = document.createElement('li');
                ingredientList.innerHTML = `${savedCocktail[i].measurements[j]} : ${savedCocktail[i].ingredients[j]}`;
               
                favoriteEl.appendChild(ingredientList);
            }

        }

    }
}

favoritesList()