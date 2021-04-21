/*

side-by-side-by-side in the browser window.

By default, the user should be presented with 25 rounds of voting

Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.

NOTE: Displayed product names should match the file name for the product. Example: the product represented with dog-duck.jpg should be displayed to the user as exactly “dog-duck” when the results are shown.

*/


//====================Global Variables====================
'use strict';

//Pointer Setup
const productDivHead = document.getElementById('productContainerDiv');
const resultDiv = document.getElementById('resultsDiv');
const canvasDiv = document.getElementById('chartJSDiv');

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
  this.timesSeen = 0;

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

//Save current choices array as previous state, generate next product, and compare that vs previous and new choices
function selectRandom () {

  //Set up the previous choices and new choices array
  let lastChoices = choices;
  let newChoices = [];
  
  //Create an array of new index
  while(newChoices.length < numChoices){

    //pick new product object as an option
    let singleChoice = Products.productArray[productSelectRandom()];

    //If the single choice is NOT in the array we are looking at return true
    let backwardCheck = !(lastChoices.includes(singleChoice));
    let forwardCheck = !(newChoices.includes(singleChoice));

    //Check to make sure the lastChoices array and newChoices array do not include the singleChoice
    if(backwardCheck && forwardCheck){
      
      //Add the proven unique item to newChoices array
      newChoices.push(singleChoice);
    }

  }

  //We now have the array of objects, update choices array
  choices = newChoices;
  
}

//Takes in the array of products and updates the productDiv elements.
function renderProducts(){

  //Create array of unique products
  selectRandom();

  //Increment the products at the selected indexs
  for (let product of choices){
    product.timesSeen++;
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
function printDataLI(){

  //clear resultsDiv to make sure we avoid complication on possible repeat cases later
  resultsDiv.innerHTML = '';

  const listTableHeader = document.createElement('h2');
  listTableHeader.textContent = 'Raw Data: Chosen/Seen';
  resultDiv.appendChild(listTableHeader);

  //Create li item and add it to resultsDiv for each product
  for(let product of Products.productArray){
    const productInfo = document.createElement('li');
    productInfo.textContent = `${product.name}:${product.clickCount}/${product.timesSeen}`;
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
    printDataLI();
    printDataChart ();
    //console.log(Products.productArray);
  }

}

function printDataChart () {

  //Initialize arrays for chart constructor
  let chartNameArray = [];
  let chartSeenArray = [];
  let chartClickedArray = [];
  let chartColorArray = [];
  let chartColorArrayMinor = [];

  //for each object in Products.productArray
  for( let product of Products.productArray){

    //add in relevant properties of each product
    chartNameArray.push(product.name);
    chartSeenArray.push(product.timesSeen);
    chartClickedArray.push(product.clickCount);

  }
  


  //create color arrays
  for ( let i = 0; i < Products.productArray.length; i++){

    //Modulo operator will give back 0 and 1 which the if sees as a boolean
    if(i % 2){
      chartColorArrayMinor.push('#3fb3da'); 
      chartColorArray.push('#7bd5f3');  
    }else{
      chartColorArrayMinor.push('#3e5ec1');
      chartColorArray.push('#6a8bee');
    }
  }

  //Alright, actual chart time, just a copy and paste from chartjs examples
  //Note: to add dataset add in something into datasets section like "datasets: [{X},{Y},{Z}]"
  var context = document.getElementById('chartJSDiv').getContext('2d');

  var myChart = new Chart(context, {
      type: 'bar',
      data: {
        labels: chartNameArray,
        datasets: [{
          label: 'Times Seen',
          data: chartSeenArray,
          backgroundColor: chartColorArray,
        },{
          label: 'Times Chosen',
          data: chartClickedArray,
          backgroundColor: chartColorArrayMinor,
        }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

}

//Local storage
//Do this when we are going to generate the graphs and info to have persistent info
function updateStoredData () {
 
  //Look up previous data
  let oldData = localStorage.getItem('storedData');

  //If stored data is empty and returns null just throw in current data set
  if(oldData == null){


  //Add current data set to stored data if both are present
  }else{
    //parse out previous info
    
    //Add previous values to current dataset
    //parse current data set to load into storage
    //overwrite stored data automatically by using same key
    //clear out current data to not have it double or triple adding values with possible repeated runs
  }
}


//====================Calling====================

//This function only needs to be run once
productDivSetup();

//First run to have options to start with
renderProducts();



//====================The End====================