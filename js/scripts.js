

var ingredients = [
  {
     ingredient:  "Spinach",
     quantity: 0,
     vitamin_A: 20,
     vitamin_B: 30,
     modified_vitamin_A: 0,

  },

  {
     ingredient: "Carrots",
     quantity: 0,
     vitamin_A: 10,
     vitamin_B: 40,

  },

  {
     ingredient: "Milk",
     quantity: 0,
     vitamin_A: 5,
     vitamin_B: 8,

  }

];


// array to push selected ingredients, so that a for loop may be run to add all the elements in the array.
var sampleMeal = [];

// variables selecting each ingredient's checkbox id: i will later test for .checked status.
var spinachBox = document.querySelector("#spinach");
var carrotBox = document.querySelector("#carrot");
var milkBox = document.querySelector("#milk");


// variables selecting each ingredients textbox:  i will test for textbox.value later.
var spinach_textbox = document.querySelector("#spinach_textbox");
var carrot_textbox = document.querySelector("#carrot_textbox");
var milk_textbox = document.querySelector("#milk_textbox");

// variable selecting the div to hold detailed results of each nutrient ingredient.
var resultsDiv2 = document.querySelector('#resultsDetailed');

// button to hold event handler and test for each checkbox's checked state.

var addIngredientButton = document.querySelector("#addIngredientBTN");
var dropdown_menu_spinach = document.querySelector("#select-menu-spinach");
var dropdown_menu_carrot = document.querySelector("#select-menu-carrot");
var dropdown_menu_milk = document.querySelector("#select-menu-milk");// event handler with event listener for button click:  purpose of script is to add ingredients to a sample meal.



var messageDetailedPrint = '<h1 class="detailedHeadline">Detailed Ingredient Totals</h1>';



function quantityCalc(ingredients, textbox) {
  // converting grams to ounces if dropdown_menu is set to grams:  1 gram = .03527396 ounces
  if (dropdown_menu_spinach.value === "grams") {
    // using Math.round to effectively truncate the result to 2 decimal places.
    ingredients.quantity = parseFloat(textbox.value * 0.03527396);
    ingredients.quantity = Math.round((ingredients.quantity + 0.00001) * 100) / 100;
  }
  else if (dropdown_menu_spinach.value === "ounces") {
    // using Math.round to effectively truncate the result to 2 decimal places.
    ingredients.quantity = parseFloat(textbox.value);
    ingredients.quantity = Math.round((ingredients.quantity + 0.00001) * 100) / 100;
  }
  // converting milliliters to ounces if dropdown_menu is set to grams:  1 gram = .03527396 ounces
  else if (dropdown_menu_milk.value === "milliliters") {
    // using Math.round to effectively truncate the result to 2 decimal places.
    ingredients[2].quantity = parseFloat(milk_textbox.value * 0.033814);
    ingredients[2].quantity = Math.round((ingredients[2].quantity + 0.00001) * 100) / 100;
  }
  else if (dropdown_menu_milk.value === "fluid ounces") {
    // using Math.round to effectively truncate the result to 2 decimal places.
    ingredients[2].quantity = parseFloat(milk_textbox.value);
    ingredients[2].quantity = Math.round((ingredients[2].quantity + 0.00001) * 100) / 100;
  }
}

function printOut(ingredients, modifiedVitaminString, ingredientsModifiedVitaminX, ingredientsVitaminX, ingredientsQuantity) {
  var message = "";
  message += ingredients.ingredient + ": " + modifiedVitaminString + " = " + ingredientsModifiedVitaminX;
  message += "%<br>" + "[Base USRDA Nutrient Value Per Ounce: " + ingredientsVitaminX + "% * ";
  message += ingredientsQuantity + " Ounce(s)]<br><br>";
  return message;
}


// creating functions to calculate the various nutrient values.
  function calcNutrientX(ingredients) {
    ingredients.modified_vitamin_A = (ingredients.vitamin_A * ingredients.quantity);
    // truncating results to 2 decimal places
    ingredients.modified_vitamin_A =  Math.round((ingredients.modified_vitamin_A + 0.00001) * 100) / 100;

    ingredients.modified_vitamin_B = (ingredients.vitamin_B * ingredients.quantity);
    // truncating results to 2 decimal places
    ingredients.modified_vitamin_B =  Math.round((ingredients.modified_vitamin_B + 0.00001) * 100) / 100;

    messageDetailedPrint += printOut(ingredients, "Modified Vitamin A", ingredients.modified_vitamin_A, ingredients.vitamin_A, ingredients.quantity);
    messageDetailedPrint += printOut(ingredients, "Modified Vitamin B", ingredients.modified_vitamin_B, ingredients.vitamin_B, ingredients.quantity);


    resultsDiv2.innerHTML = messageDetailedPrint;
    // push the modified ingredient to the sampleMeal array.
    sampleMeal.push(ingredients);
  }


addIngredientButton.addEventListener('click', () => {
  sampleMeal = [];

  if (spinachBox.checked === true && spinach_textbox.value > 0) {
    quantityCalc(ingredients[0], spinach_textbox);
    calcNutrientX(ingredients[0]);
  }

  if (carrotBox.checked === true && carrot_textbox.value > 0) {
    quantityCalc(ingredients[1], carrot_textbox);
    calcNutrientX(ingredients[1]);
  }

  if (milkBox.checked === true && milk_textbox.value > 0) {
    quantityCalc(ingredients[2], milk_textbox);
    calcNutrientX(ingredients[2]);
  }  // end event listener function for create meal button.


// at the end of the 'if' checkbox.checked condition, build the resultsDiv2.innerHTML to the page.
// This info will consist of the detailed invividual ingredient nutrients and their base and modified USRDA values.
resultsDiv2.style.display = "block";

// this section will take the sampleMeal[array] and process the total meal results.
var resultsDivA = document.querySelector('#resultsDivA');
var resultsDivB = document.querySelector('#resultsDivB');


  var resultsA = 0;
  var resultsB = 0;
  for (var i = 0; i < sampleMeal.length; i += 1) {
    // Vitamin A results
    resultsA += sampleMeal[i].modified_vitamin_A;
    console.log(sampleMeal[i].modified_vitamin_A);

    // Vitamin B results
    resultsB += sampleMeal[i].modified_vitamin_B;
    console.log(sampleMeal[i].modified_vitamin_B);
    // continue to add all of the ingredients.
  }

  //  truncating values to 2 decimal places for accumulated and modified results
  resultsA = Math.round((resultsA + 0.00001) * 100) / 100;
  resultsB = Math.round((resultsB + 0.00001) * 100) / 100;
  // setting var for mealResultHeadline div, so that I can place headline there on meal generation results
  var mealResultHeadline = document.querySelector("#mealResultHeadline");
  var mealTotalBackground = document.querySelector("#mealTotalBackground");
  mealTotalBackground.style.display = "block";
  // setting variables for messages, and will style them green if values are >= 100% USRDA
  mealResultHeadline.innerHTML  = '<h1 class="mealResultHeadline">Meal Nutrient Totals</h1>';

  var aResults = "";
  var bResults = "";

  aResults += "Your meal satisfies " + resultsA + "% of the USRDA for Vitamin A.<br>";

  bResults += "Your meal satisfies " + resultsB + "% of the USRDA for Vitamin B.<br>";




  //  set the innerHTML property of the 'results'  div to the 'message' variable
  resultsDivA.innerHTML = aResults;
  if (resultsA >= 100) {
  resultsDivA.style.color = "yellow";
  resultsDivA.innerHTML += resultsA + '% is cause for concern as Vitamin A can build up in the body over time; too much Vitamin A can poison the human system!';
  }
  resultsDivB.innerHTML = bResults;
  if (resultsB >= 100) {
    resultsDivB.style.color = "lime";
  }
  // continue to add a div for each nutrient, and a condition for >= 100 to style green.


});  /*  end of event listener/handler for addIngredientButton click  */
