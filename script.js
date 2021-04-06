// load the airtable library, call it "Airtable" 
// var and let is interchangable. let is more modern verion
//console.log is to make sure aritable is working
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
//connect our airtable base to our website using ur unique API key
// usually API key is kept private bc it can be hacked
// click "help" and "API Documentation"
// if API doesnt show, go to account and click generate API Key and refresh
var base = new Airtable({ apiKey: "keyoBnsbDmjnnwAGR" }).base(
  "appXcwyRQzv6xKBVi"
);

// get our airtable data, specify how to retrieve it
// if name of base has space in between words, replace space to underscore
// e.g. if name is pretty cakes, it becomes base("pretty_cakes")
// base name and column names has to be lowercase ^
base("my_cakes").select({}).eachPage(gotPageOfCakes, gotAllCakes);

// an empty array to hold our cake data
// an array is a list of things that's written in square brackets in js
// e.g. ["cake"], but this is an empty array so left blank
// const is another variable. alternative to var
const cakes = [];

// callback function that receives our data
function gotPageOfCakes(records, fetchNextPage) {
    console.log("gotPageOfCakes()");
    // add the records from this page to our books array
    // push is another word for add
    cakes.push(...records);
    // request more pages
    fetchNextPage();
  }

  // call back function that is called when all pages are loaded
function gotAllCakes(err) {
    console.log("gotAllCakes()")

 // report an error, you'd want to do something better than this in production
 if (err) {
    console.log("error loading cakes");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogCakes();
  showCakes(); 
};

// just loop through the books and console.log them
function consoleLogCakes() {
    console.log("consoleLogCakes()");
    cakes.forEach((cake) => {
      console.log("Cakes:", cake);
    });
  }
  
  // loop through the books, create an h2 for each one, and add it to the page
  // cake.fields.____ blank should be name of first column
  function showCakes() {
    console.log("showCakes()");
    cakes.forEach((cake) => {

      //creating div container
      var cakeContainer = document.createElement("div");
      cakeContainer.classList.add("cake-container");
      document.querySelector(".container").append(cakeContainer);

      //adding 1rst column (bakery)
      var cakeBakery = document.createElement("h2");
      cakeBakery.classList.add("bakery");
      cakeBakery.innerText = cake.fields.bakery;
      cakeContainer.append(cakeBakery);

     //adding 2nd column (from)
     var cakeFrom = document.createElement("p");
     cakeFrom.classList.add("from");
     cakeFrom.innerText = cake.fields.from;
     cakeContainer.append(cakeFrom);

     //adding 3rd column(pix) for images using "img" and src 
     var cakePix = document.createElement("img");
     cakePix.classList.add("pix");
     cakePix.src = cake.fields.pix[0].url;
     cakeContainer.append(cakePix);

      // add event listener
      // when user clicks on cake container
      //img and description will appear or disappear
      cakeContainer.addEventListener("click", function(){
        cakeFrom.classList.toggle("active");
        cakePix.classList.toggle("active");
      })

    });
  }
  
