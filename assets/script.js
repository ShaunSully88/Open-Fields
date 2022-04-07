// Plant/vegetable input in search bar
var plantInput = document.querySelector('#plant-input')
//form set up for plant search
var plantFormEl = document.getElementById('plant-form')
//button
var searchButtonEl = document.getElementById('button')
//container for all veggie/plant info
var plantContainerEl = document.querySelector('#plant-container')
//card for plant info
var plantCardEl = document.getElementById('plant-card')
//div for plant search results
var plantInfoEl = document.getElementById('info')


// Linking value of plant input to getPlantInfo function. This is a event listener linked to search button.
var formSubmitHandler = function (event) {
    

    var plant = plantInput.value.trim();
    console.log(plantInput)
    if(plant) {
        getPlantInfo(plant);
        plantInput.value = "";   
    } else {
        alert("Please enter a plant or vegetable.");
    }
    
};

//api call to OpenFarm

var getPlantInfo = function (plantInput) {
    var apiUrl = "https:openfarm.cc/api/v1/crops?filter=" + plantInput;
    console.log(apiUrl)
    fetch(apiUrl).then(function(plantResponse) {
        return plantResponse.json();
    })
    .then(function(plantResponse) {
        console.log(plantResponse) 
    })

    //response from API
    return fetch ("https:openfarm.cc/api/v1/crops?=")
    
     .then(function (response) {
         return response.json();
     })
     .then(function (data) {
         showPlantInfo(data);
     });

};

var showPlantInfo = function(data) {
    if(data.length === 0) {
       plantContainerEl.textContent = "No info for selected plant";
       return;
   }

   

  // var imageId = plantResponse.data[0].relationships.pictures.data[0].id;

   //var plantImage = "<img src='https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/" + imageId + "'.' />"

   //Displaying plant results with an image from website
//    var image = document.createElement("img")
//    image.innerHTML = plantImage;
//    plantContainerEl.innerHTML = plantName + plantImage; 

   // Name pulled from OpenFarm
    var latinName = document.createElement("p"); 
    latinName.innerHTML = "Binomial Name:" + data[0].attributes.binomial_name;
    plantContainerEl.appendChild(latinName);
   
   //Description pulled from OpenFarm
   var description = document.createElement("p"); 
   description.innerHTML = "Description:" + data.attributes.description;
   plantContainerEl.appendChild(description);

   // Sun info pulled from OpenFarm
   var sun = document.createElement("p");
   sun.innerHTML = "Sun:" + data.attributes.sun_requirements;
   plantContainerEl.appendChild(sun);

   // Growth Info pulled from OpenFarm
   var growth = document.createElement("p"); 
   growth.innerHTML = "Growth:" + data.attributes.growing_degree_days;
   plantContainerEl.appendChild(growth);

   // Sowing Steps pulled from OpenFarm
   var sow = document.createElement("p"); 
   sow.innerHTML = "Sowing Instructions:" + data.attributes.sowing_method;
   plantContainerEl.appendChild(sow);

   // Seed Spread pulled from OpenFarm
   var spread = document.createElement("p");  
   spread.innerHTML = "Seed Spread:" + data.attributes.spread;
   plantContainerEl.appendChild(spread);

   // Row Spacing pulled from OpenFarm
   var space = document.createElement("p")
   space.innerHTML = "Row Spacing:" + data.attributes.row_spacing;
   plantContainerEl.appendChild(space);

   // Plant Height pulled from OpenFarm
   var height = document.createElement("p")
   height.innerHTML = "Plant Height:" + data.attributes.height;
   plantContainerEl.appendChild(height); 

searchButtonEl.addEventListener("click", formSubmitHandler);

navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat, long)
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&onecall?lat=${lat}&lon=${long}&appid=9d88bd6fdf0dea57ceacfd94f52fe0b0&units=metric`, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
}) .then(function(data){
  console.log(data)
});
  });


