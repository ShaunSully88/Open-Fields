// Plant/vegetable input in search bar
var plantInput = document.querySelector('#input')
//form set up for plant search
var plantFormEl = document.getElementById('form')
//button
var searchButtonEl = document.getElementById('button')
//container for all veggie/plant info
var plantContainerEl = document.querySelector('#container')
//card for plant info
var plantCardEl = document.getElementById('card')
//div for plant search results
var plantInfoEl = document.getElementById('info')


// Linking value of plant input to getPlantInfo function. This is a event listener linked to search button.
var formSubmitHandler = function (event) {
    event.preventDefault();

    var plant = plantInput.value.trim();
    console.log(plant)
    if(plant) {
        getPlantInfo(city);
        plantContainerEl.textContent = "";
        plantInput.value = "";
        
    } else {
        alert("Please enter a plant or vegetable.");
    }
    
};

//api call to OpenFarm

var getPlantInfo = function (plantInput) {
    var apiUrl = "https:openfarm.cc/api/v1/crops/" + plantInput;
    console.log(apiUrl)
    fetch(apiUrl).then(function(plantResponse) {
        return plantResponse.json();
    })
    .then(function(plantResponse) {

// api call to soil site needed
    
    // API response for plant input
    return fetch ()
    })
    
     .then(function (response) {
         return response.json();
     })
     .then(function (data) {
         showplantInfo(data);
     });

};

var showplantInfo = function(plant) {
    if(data.length === 0) {
       plantContainerEl.textContent = "No info for selected plant";
       return;
   }

   var imageId = plantResponse.data.pictures.data.id;

   var plantImage = "<img src='https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/" + imageId + "'.' />"

   //Displaying plant results with an image from website
   var image = document.createElement("img")
   image.id = "image";
   image.innerHTML = plantImage;
   plantContainerEl.innerHTML = plantName + plantImage; 

   // Name pulled from OpenFarm
   var name = document.createElement("p"); 
   name.innerHTML = "Plant Name:" + plant.attributes.name;
   plantContainerEl.appendChild(name);
   
   //Description pulled from OpenFarm
   var description = document.createElement("p"); 
   description.innerHTML = "Description:" + plant.attributes.description;
   plantContainerEl.appendChild(description);

   // Sun info pulled from OpenFarm
   var sun = document.createElement("p");
   sun.innerHTML = "Sun:" + plant.attributes.sun_requirements;
   plantContainerEl.appendChild(sun);

   // Water info pulled from OpenFarm
   var water = document.createElement("p"); 
   water.innerHTML = "Water:" + plant.;
   plantContainerEl.appendChild(water);

   // Growth Info pulled from OpenFarm
   var growth = document.createElement("p"); 
   growth.innerHTML = "Growth:" + plant.;
   plantContainerEl.appendChild(growth);

   // Sowing Steps pulled from OpenFarm
   var sow = document.createElement("p"); 
   sow.innerHTML = "Sowing Instructions:" + plant.attributes.sowing_method;
   plantContainerEl.appendChild(sow);

   // Seed Spread pulled from OpenFarm
   var spread = document.createElement("p");  
   spread.innerHTML = "Seed Spread:" + plant.attributes.spread;
   plantContainerEl.appendChild(spread);

   // Row Spacing pulled from OpenFarm
   var space = document.createElement("p")
   space.innerHTML = "Row Spacing:" + plant.attributes.row_spacing;
   plantContainerEl.appendChild(space);

   // Plant Height pulled from OpenFarm
   var height = document.createElement("p");
   height.innerHTML = "Plant Height:" + plant.attributes.height;
   plantContainerEl.appendChild(height);

   // Soil Type pulled from _______
   var soil = document.createElement("p");
   soil.innerHTML = "Soil Type:" + plant.;
   plantContainerEl.appendChild(soil);
}
   //  for (var i = 0; i < cities.length; i++) {
   //      //var cityName = repos[i].owner.login + "/" + repos[i].name;

   //      var cityEl = document.createElement("a");
   //      cityEl.classList = "list-item flex-row justify-space-between align-center";
   //      cityEl.setAttribute = ("href", " " + "");

   //      var titleEl = document.createElement("span");
   //      titleEl.textContent =  ""  ;

   //      cityEl.appendChild(titleEl);

   //      var statusEl = document.createElement("span");
   //      statusEl.classList ="flex-row align-center";

   //      if(cities[i].open_issues_count > 0) {
   //          statusEl.innerHTML = 
   //          "<i class='fas fa-times status-icon icon-danger'></i>" + cities[i].open_issues_count + "issue(s)";
   //      } else {
   //          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
   //      }

   //      cityEl.appendChild(statusEl);

   //      cityContainerEl.appendChild(cityEl);
   //  }
//};
searchButtonEl.addEventListener("click", formSubmitHandler);