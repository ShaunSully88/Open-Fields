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
    fetch(apiUrl).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response) 
    })

    //response from API
    return fetch ("https:openfarm.cc/api/v1/crops?=")
    
     .then(function (response) {
        console.log(response)
         return response.json();
     })
     
     .then(function (data) {
         showPlantInfo(data.data);
     });

};

var showPlantInfo = function(data) {
    if(data.length === 0) {
       plantCardEl.textContent = "No info for selected plant";
       return;
   }

   

  // var imageId = plantResponse.data[0].relationships.pictures.data[0].id;

   //var plantImage = "<img src='https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/" + imageId + "'.' />"

   //Displaying plant results with an image from website
   //    var image = document.createElement("img")
   //    image.innerHTML = plantImage;
   //    plantContainerEl.innerHTML = plantName + plantImage; 

   // Name pulled from OpenFarm
    var latinName = data.data[0].attributes.binomial_name
    document.createElement("p"); 
    latinName.innerHTML = "Binomial Name:" + data.data[0].attributes.binomial_name;
    plantContainerEl.appendChild(latinName);
   
   //Description pulled from OpenFarm
   var description = document.createElement("p"); 
   description.innerHTML = "Description:" + data.data[0].attributes.description;
   plantContainerEl.appendChild(description);

   // Sun info pulled from OpenFarm
   var sun = document.createElement("p");
   sun.innerHTML = "Sun:" + data.data[0].attributes.sun_requirements;
   plantContainerEl.appendChild(sun);

   // Growth Info pulled from OpenFarm
   var growth = document.createElement("p"); 
   growth.innerHTML = "Growth:" + data.data[0].attributes.growing_degree_days;
   plantContainerEl.appendChild(growth);

   // Sowing Steps pulled from OpenFarm
   var sow = document.createElement("p"); 
   sow.innerHTML = "Sowing Instructions:" + data.data[0].attributes.sowing_method;
   plantContainerEl.appendChild(sow);

   // Seed Spread pulled from OpenFarm
   var spread = document.createElement("p");  
   spread.innerHTML = "Seed Spread:" + data.data[0].attributes.spread;
   plantContainerEl.appendChild(spread);

   // Row Spacing pulled from OpenFarm
   var space = document.createElement("p")
   space.innerHTML = "Row Spacing:" + data.data[0].attributes.row_spacing;
   plantContainerEl.appendChild(space);

   // Plant Height pulled from OpenFarm
   var height = document.createElement("p");
   height.innerHTML = "Plant Height:" + data.data[0].attributes.height;
   plantContainerEl.appendChild(height); 
}
searchButtonEl.addEventListener("click", formSubmitHandler);
