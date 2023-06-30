//setup saving drink names
var saveInput = document.querySelector('#save-cocktail');
var saveForm = document.querySelector("#save-cocktail-form");
var savedList = document.querySelector('#saved-cocktail-list');

var saved = [];

function renderSaved() {
    savedList.innerHTML = "";
    for (var i = 0; i < saved.length; i++) {
        var save = saved[i];
        var li = document.createElement("li");
        li.textContent = save;
        li.setAttribute("data-index", i);
        var button = document.createElement("button");
        button.textContent = "X";
        li.appendChild(button);
        savedList.appendChild(li);
    }
}

function init() {
  var storedSaved = JSON.parse(localStorage.getItem("saved"));
  if (storedSaved !== null) {
    saved = storedSaved;
  }
  renderSaved();
}

function displaySavedList(event) {
    event.preventDefault();
    var saveText = saveInput.value.trim().charAt(0).toUpperCase() + saveInput.value.trim().slice(1);
    if(saveText == ''){
        prompt.style.display = 'block';
        promptTxt.textContent = "Alert: Please Enter Drink Name";
        exitPrompt.addEventListener('click', function() {
        prompt.style.display = 'none';
        })
        return
    } else {
        saved.push(saveText);
        saveInput.value = "";
        localStorage.setItem("saved", JSON.stringify(saved));
        renderSaved();
    }
  }

  function deleteSavedListItems(event) {
    var element = event.target;
  
    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      saved.splice(index, 1);
      localStorage.setItem("saved", JSON.stringify(saved));
      renderSaved();
    }
  }

saveForm.addEventListener("submit", displaySavedList);

savedList.addEventListener("click", deleteSavedListItems);

init()