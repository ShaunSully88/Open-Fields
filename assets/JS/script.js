// Plant/vegetable input in search bar
var plantInput = document.querySelector('______')
//form set up for plant search
var plantFormEl = document.getElementById('____')
//button
var searchButtonEl = document.getElementById('_____')
//container for all veggie/plant info
var plantContainerEl = document.querySelector('______')
//card for plant info
var plantCardEl = document.getElementById('_____')
//div for plant search results
var plantInfoEl = document.getElementById('_____')


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
    var apiUrl = "https:openfarm.cc/api/v1/crops/";
    console.log(apiUrl)
    fetch(apiUrl).then(function(plantResponse) {
        return plantResponse.json();
    })
    .then(function(plantResponse) {

// api call to soil site needed
    
    // API response for plant input
    return fetch ()
    })
    
    //  .then(function (response) {
    //      return response.json();
    //  })
    //  .then(function (response) {
    //      showplantInfo(response);
    //  });

};

var showplantInfo = function(plant) {
    if(plant.length === 0) {
       plantContainerEl.textContent = "No info for selected plant";
       return;
   }

   var plantImage = "<img src='https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/" + dataId + "'.' />"

   //Displaying plant results with an image from website
   var image = document.createElement("img")
   image.id = "image";
   image.innerHTML = plantImage;
   plantInfo.innerHTML = plantName + plantImage; 

   // Name pulled from OpenFarm
   var name = document.createElement("p");
   name.id = "name";
   name.innerHTML = "Plant Name:" + plant.attributes.name;
   plantInfoEl.appendChild(name);
   
   //Description pulled from OpenFarm
   var description = document.createElement("p");
   description.id = "description";
   description.innerHTML = "Description:" + plant.attributes.description;
   plantInfoEl.appendChild(description);

   // Sun info pulled from OpenFarm
   var sun = document.createElement("p");
   sun.id = "sun";
   sun.innerHTML = "Sun:" + plant.attributes.sun_requirements;
   plantInfoEl.appendChild(sun);

   // Water info pulled from OpenFarm
   var water = document.createElement("p");
   water.id = "water";
   water.innerHTML = "Water:" + plant.;
   plantInfoEl.appendChild(water);

   // Growth Info pulled from OpenFarm
   var growth = document.createElement("p");
   growth.id = "growth";
   growth.innerHTML = "Growth:" + plant.;
   plantInfoEl.appendChild(growth);

   // Sowing Steps pulled from OpenFarm
   var sow = document.createElement("p");
   sow.id = "sow";
   sow.innerHTML = "Sowing Instructions:" + plant.attributes.sowing_method;
   plantInfoEl.appendChild(sow);

   // Seed Spread pulled from OpenFarm
   var spread = document.createElement("p");
   spread.id = "spread";
   spread.innerHTML = "Seed Spread:" + plant.attributes.spread;
   plantInfoEl.appendChild(spread);

   // Row Spacing pulled from OpenFarm
   var space = document.createElement("p")
   space.id = "space";
   space.innerHTML = "Row Spacing:" + plant.attributes.row_spacing;
   plantInfoEl.appendChild(space);

   // Plant Height pulled from OpenFarm
   var height = document.createElement("p");
   height.id = "height";
   height.innerHTML = "Plant Height:" + plant.attributes.height;
   plantInfoEl.appendChild(height);

   // Soil Type pulled from _______
   var soil = document.createElement("p");
   soil.id = "soil";
   soil.innerHTML = "Soil Type:" + plant.;
   plantInfoEl.appendChild(soil);
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