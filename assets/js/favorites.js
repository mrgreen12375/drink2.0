var favorites = document.querySelector('#favorites');

var favoriteEl;

var saved = [];

function init() {
    var savedCocktail = JSON.parse(localStorage.getItem("savedCocktail"));
    if (savedCocktail !== null) {
      saved = savedCocktail;
    }
    favoritesList();
  }
  
function favoritesList() {
console.log(saved);
    if (saved.length === 0) {
        favoriteEl = document.createElement('div');
        favoriteEl.innerHTML = `<div class='favoriteCardEmpty'>
                                <h1>No Favorite Cocktails Yet!</h1>
                                </div>`;

        favorites.appendChild(favoriteEl);
    } else {
        for (let i = saved.length - 1; i >= 0; i--){
                    
            favoriteEl = document.createElement('div');
            favoriteEl.setAttribute("data-index", i);
            favoriteEl.setAttribute('class', 'favoriteCard')
            favoriteEl.innerHTML = `<button>X</button>
                                    <h2>${saved[i].name}</h2>
                                    <img src="${saved[i].image}"/>
                                    <p>${saved[i].instructions}</p>`;

            favorites.appendChild(favoriteEl);

            for (var j = 0; j < saved[i].ingredients.length; j++) {

                var ingredientList = document.createElement('li');
                ingredientList.innerHTML = `${saved[i].measurements[j]} : ${saved[i].ingredients[j]}`;
               
                favoriteEl.appendChild(ingredientList);
            }

            if (saved[i].video === null) {
                console.log("no video available");
            } else {
                var videoEl = document.createElement('a');
                videoEl.href = saved[i].video;
                videoEl.target = "_blank";
                videoEl.textContent = "Video";
                videoEl.classList.add("video");
    
    
                favoriteEl.appendChild(videoEl);
            }

        }

    }
}

function deleteSavedListItems(event) {
    var element = event.target;
  
    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      saved.splice(index, 1);
      localStorage.setItem("savedCocktail", JSON.stringify(saved));
      location.reload();
    }
  }

favorites.addEventListener("click", deleteSavedListItems);

init()

