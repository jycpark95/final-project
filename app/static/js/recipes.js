$( document ).ready(function() {
//Api- key = 'a9a17bf634eb7ab8498dabf5969d0ea0'
console.log("Doc has loaded!");


$("#submit").click( function() {
      console.log("Submit button was clicked!");
      $('#query').val('');
      callAPI(getInput());
    });

  //Show query input to user
// $(document).ready(function() {
//   $('#query').change(function() {
//     $('#displayQuery').html('Search results for: ' + "'" + $('#query').val() + "'");
//   });
// });

$(document).keypress(function(e) {
    if(e.which == 13) {
    // console.log("You pressed enter!");
      $('#displayQuery').html('Search results for: ' + "'" + $('#query').val() + "'");
      callAPI(getInput());
      $('#query').val("");
    }
});
function getInput() {
	// console.log("Get input was called!");
	return $('#query').val();
}

// Event handler for calling the API using the user's search query
function callAPI(query) {
	$.get("http://food2fork.com/api/search?key=a9a17bf634eb7ab8498dabf5969d0ea0",
		{'q': query,
		'limit': '200'},

		function(data) {
			// console.log("Call API was called!");
			processData(data);
		},'json'
	);
}

//Should get list of ingredients for a specific Recipe using the ID.
function getIngredients(data) {
	$.get("http://food2fork.com/api/get?key=a9a17bf634eb7ab8498dabf5969d0ea0",
		{'rId': data,
		'limit': '200'},
		function(data) {
			// console.log("Getting ingredients.");
      // searchResults();
			process(data);
		},'json'
	);
}

	$( ".food-item" ).click(function() {
    	// console.log("Recipe was clicked!");
      	getIngredients(getRecipeId())
	});

function getRecipeId() {
	// console.log("Getting recipe ID.");
	var recipeID = $(this).attr("alt");
	// console.log(recipeID);
	return recipeID
}

function process(data) {
	for (var i = 5; i >= 0; i--) {
		// console.log(data)
		// console.log(data.recipes[i].ingredients)
		var title = data.recipes[i]['title'];
		var food_img = data.recipes[i]['image_url'];
		var recipe_ingredients = data.recipes[i]['ingredients'];
	}
}

function foodClicked() {
	console.log("Recipe was clicked!");
}



// This function will go through the data object and take out the image and recipe link.
function processData(data){
	//Clears the table after each submit for a new artists search.
	$('#recipes').empty().append(
    '<div class="recipe_grid"><h2> Search results for: </h2></div>'
  );


	var htmlElements = "";
	for (var i = 29; i >= 0; i--) {
		var title = data.recipes[i]['title'];
		var food_img = data.recipes[i]['image_url'];
		var recipe_link = data.recipes[i]['source_url'];
		var recipe_id = data.recipes[i]['recipe_id'];

   		htmlElements += '<div class="ind_recipe"> <tr> <td><img id="food_image" id="' + recipe_id + '" src="' + food_img + '"></td><td><a href="'+ recipe_link + '"target="_blank"></td> <td><img class="link" src="./static/img/link2.png" title="See recipe" style="width:20px !important;height:20px !important; border:none"></a></td> <td><button class="thumbtack"><img src="./static/img/tack1.png" style="width:20px !important;height:20px !important; border:none; !important;justify-content:right;"></button></td></tr></div>';

   		// htmlElements += '<div class="food-item"><img id="' + recipe_id + '" src="' + food_img + '"><br><a href="'+ recipe_link +'"target="_blank"><b>Recipe Link</b></a><br><br><a href=./templates/base.html>Save to profile.</a></div>';

	}

	var container = document.getElementById("recipes");
	// var container = document.getElementsByTagName("section");
	// console.log(container);
	container.innerHTML = htmlElements;

	}

});


// Move saved recipes to separate list <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< FIX <<<<<<<<<<<
$('.thumbtack').on('click', function() {
  alert("Recipe is saved!");
  var row = $(this).parents('tr').clone().find('td:last').remove().end();
  row.append('<td><input type = "image" src="./static/img/trash.png" class="delete" /></td></tr>');
  $('savedRecipes').prepend($(row));
})
