/*

side-by-side-by-side in the browser window.

By default, the user should be presented with 25 rounds of voting

Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.

*/


//====================Global Variables====================

//Pointer Setup
const productDivHead = document.getElementById('productContainerDiv');
const resultDiv = document.getElementById('resultsDiv');

//Variables to be used by others
const numChoices = 3;
const maxClicks = 25; //down to 10 for testing purposes
productDivHead.addEventListener('click', selectProduct);

//Variables others use
let userSelections = 0;
let choices = [];


//====================Constructors and Methods====================

function Products (name, imgFilePath){

  //Set up basic info
  this.name = name;
  this.imgFilePath = imgFilePath;
  this.clickCount = 0;
  this.timesCalled = 0;

  //Adding itself to the array of all products
  Products.productArray.push(this);
}

//====================Object Setup====================

//Getting the array ready
Products.productArray = [];

//Call the constructor a bunch
new Products('bag','img/bag.jpg');
new Products('banana','img/banana.jpg');
new Products('bathroom','img/bathroom.jpg');
new Products('boots','img/boots.jpg');
new Products('breakfast','img/breakfast.jpg');
new Products('bubblegum','img/bubblegum.jpg');
new Products('chair','img/chair.jpg');
new Products('cthulhu','img/cthulhu.jpg');
new Products('dog-duck','img/dog-duck.jpg');
new Products('dragon','img/dragon.jpg');
new Products('pen','img/pen.jpg');
new Products('pet-sweep','img/pet-sweep.jpg');
new Products('scissors','img/scissors.jpg');
new Products('shark','img/shark.jpg');
new Products('sweep','img/sweep.png');
new Products('tauntaun','img/tauntaun.jpg');
new Products('unicorn','img/unicorn.jpg');
new Products('usb','img/usb.gif');
new Products('water-can','img/water-can.jpg');
new Products('wine-glass','img/wine-glass.jpg');

//====================Functions====================

//Create the different sections based on the number of products to be viewed
function productDivSetup(){

  for(let i = 0; i < numChoices; i++){

    //Setup new elements and add class to make them selectable later
    let prodDiv = document.createElement('div');
    prodDiv.className = 'productDiv';

    //Append it to productDivHead
    productDivHead.appendChild(prodDiv);

  }
}

//Get a random number for an index of the productsArray
function productSelectRandom (){
  let target = Math.floor(Math.random()*Products.productArray.length);
  return target;
}

//Returns an array of unique numbers that map within productArray
function selectRandom (){

  //Setup the return array of choices
  choicesTemp = [];

  //first selection doesn't need validation
  let choice = productSelectRandom();
  choicesTemp.push(choice);

  //As long as the choices array is still not to the set length
  while(choicesTemp.length < numChoices){

    //Setup variable for the comparison loop
    let theSame = false;

    //pick a new choice
    choice = productSelectRandom();

    //create local variable 'check' which will cycle through all values in choices
    for (let check of choicesTemp){

      //If they are equal set the check to false
      if(check === choice){
        theSame = true;
      }
    }

    //Push value in to choices array if we never found an equal selection
    if(!theSame){
      choicesTemp.push(choice);
    }
  }

  //Alright, so this code changes the global array choices to be the objects and not just an index 
  for(let i = 0; i < choicesTemp.length; i++){
    choices[i] = Products.productArray[choicesTemp[i]];
  }
}

//Takes in the array of products and updates the productDiv elements.
function renderProducts(){

  //Create array of unique indexes
  selectRandom();

  //Increment the products at the selected indexs
  for (let product of choices){
    product.timesCalled++;
    //console.log(Products.productArray[index]);
  }

  //Setup up array of product divs
  let productDivsArray = document.getElementsByClassName('productDiv');
  //console.log(productDivsArray);

  //Clear out the stuff from the previous product selection
  for (let clearDiv of productDivsArray){
    clearDiv.innerHTML = '';
  }

  //Using the array of divs made above, add text and image to each
  for (let i = 0; i < productDivsArray.length; i++){
    
    //look at current div and Product
    let workingDiv = productDivsArray[i];
    let workingProduct = choices[i];

    //Create image element, set the source, and add it on
    //Added the name of the product as an id to this field for ease of comparison later
    let workingImg = document.createElement('img');
    workingImg.src = workingProduct.imgFilePath;
    workingImg.id = workingProduct.name;
    workingDiv.appendChild(workingImg);

    //Create h2 element, its name, and append that
    let workingName = document.createElement('h2');
    workingName.textContent = workingProduct.name;
    workingDiv.appendChild(workingName);
    
  }

}

//Add list items to resultsDiv
function printData(){

  //clear resultsDiv to make sure we avoid complication on possible repeat cases later
  resultsDiv.innerHTML = '';

  //Create li item and add it to resultsDiv for each product
  for(let product of Products.productArray){
    const productInfo = document.createElement('li');
    productInfo.textContent = `${product.name} had ${product.clickCount} votes and was seen ${product.timesCalled} times`;
    resultDiv.appendChild(productInfo);
  }
}

// handle the result of the click
function selectProduct(event) {

  //the product name that was selected and we are searching for
  const imageID = event.target.id;

  //check it against all the object in array of current choices available
  for(let i = 0; i < choices.length; i++){

    //If correct increment clickCount of product
    if(imageID == choices[i].name){
      choices[i].clickCount++;
    }
  }

  //increment user selections because a selection was made
  userSelections++;

  //Display new products if still picks left, otherwise shut off listener and show data
  if(userSelections < maxClicks){
    renderProducts();
  } else {
    productDivHead.removeEventListener('click', selectProduct);
    printData();
  }

}


//====================Calling====================

//This function only needs to be ran once
productDivSetup();

//First run to have options to start with
renderProducts();



//====================The End====================