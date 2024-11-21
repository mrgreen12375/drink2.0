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
        for (let i = savedCocktail.length - 1; i >= 0; i--){
                    
            var favoriteEl = document.createElement('div');
            favoriteEl.setAttribute('class', 'favoriteCard')
            favoriteEl.innerHTML = `<h2>${savedCocktail[i].name}</h2>
                                    <img src="${savedCocktail[i].image}"/>
                                    <p>${savedCocktail[i].instructions}</p>`;

            favorites.appendChild(favoriteEl);

            for (var j = 0; j < savedCocktail[i].ingredients.length; j++) {

                var ingredientList = document.createElement('li');
                ingredientList.innerHTML = `${savedCocktail[i].measurements[j]} : ${savedCocktail[i].ingredients[j]}`;
               
                favoriteEl.appendChild(ingredientList);
            }

            if (savedCocktail[i].video === null) {
                console.log("no video available");
            } else {
                var videoEl = document.createElement('a');
                videoEl.href = savedCocktail[i].video;
                videoEl.target = "_blank";
                videoEl.textContent = "Video";
                videoEl.classList.add("video");
    
    
                favoriteEl.appendChild(videoEl);
            }

        }

    }
}

favoritesList()