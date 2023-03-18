var data = [];
getreciepe("cinnamon");
var links = document.querySelectorAll("a");

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    var currentMeal = e.target.text;
    getreciepe(currentMeal);
  });
}

function getreciepe(meal) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open(
    "Get",
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  httpRequest.send();
  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4) {
      data = JSON.parse(httpRequest.response).recipes;
    }
    displaydata();
  });
}

function displaydata() {
  var box = ``;
  for (var i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-3" >
        <img src="${data[i].image_url}" class='w-100 pic-height' id='cols'>
        <h4 class=' mb-2  text-center'> ${data[i].title}</h4>
        <a class='btn btn-primary mt-3' target='_blank' href='${data[i].source_url}'>Source</a>
      
      <a class='btn btn-success mt-3' onclick='getRecipeDetails(${data[i].recipe_id})'  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>

           
        </div>
        `;
  }
  document.getElementById("dataRow").innerHTML = box;
}

async function getRecipeDetails(recipeId) {
  var details = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
  );
  var detailsJson = await details.json();
  console.log(recipeId);
  var title = 
  `
<h1 class="modal-title fs-5" >${detailsJson.recipe.title}</h1>
`;
  var detailsCard =
   `
<img class='w-100 pic-height' src='${detailsJson.recipe.image_url}'>
<h4 class='text-info'>Publisher: ${detailsJson.recipe.publisher}</h4>
<h5 class='text-info'> Social Rank:${Math.round(detailsJson.recipe.social_rank)}</h5>
<a class='btn btn-primary mt-3' target='_blank' href='${data[i].source_url}'>Source</a>
<a class='btn btn-warning mt-3' target='_blank' href='${data[i].publisher_url}'>publisher Url</a>
<button type="button" class="btn btn-danger mt-3" data-bs-dismiss="modal">Close</button>


`;
  document.getElementById("exampleModalLabel").innerHTML = title;
  document.getElementById("detailsCard").innerHTML = detailsCard;
}
