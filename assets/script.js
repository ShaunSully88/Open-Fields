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
    .then(function(data) {
        console.log(data) 

        
     
   // Displaying plant results with an image from website
      
     var image = document.createElement("img");
     image.src = data.data[0].attributes.main_image_path; 
     image.setAttribute('width', '250px');
     image.setAttribute('height', '200px');
     image.innerHTML = image;
     plantContainerEl.appendChild(image); 

    
    // Name pulled from OpenFarm
    var latinName = data.data[0].attributes.binomial_name
    var plantName = document.createElement("p"); 
    plantName.innerHTML = "<b>Binomial Name:</b> " + latinName;
    plantContainerEl.appendChild(plantName);
   
   //Description pulled from OpenFarm
   var description = data.data[0].attributes.description
   var plantDescription = document.createElement("p"); 
   plantDescription.innerHTML = "<b>Description:</b> " + description;
   plantContainerEl.appendChild(plantDescription);

   // Sun info pulled from OpenFarm
   var sun = data.data[0].attributes.sun_requirements;
   var plantSun = document.createElement("p")
   plantSun.innerHTML = "<b>Sun Requirements:</b> " + sun;
   plantContainerEl.appendChild(plantSun);

   // Growth Info pulled from OpenFarm
   var growth = data.data[0].attributes.growing_degree_days;    
   var plantGrowth = document.createElement("p");
   plantGrowth.innerHTML = "<b>Growth:</b> " + growth + " days";
   plantContainerEl.appendChild(plantGrowth);

   // Sowing Steps pulled from OpenFarm
   var sow = data.data[0].attributes.sowing_method; 
   var plantSow = document.createElement("p");
   plantSow.innerHTML = "<b>Sowing Instructions:</b> " + sow;
   plantContainerEl.appendChild(plantSow);

   // Seed Spread pulled from OpenFarm
   var spread = data.data[0].attributes.spread;
   var plantSpread = document.createElement("p");
   plantSpread.innerHTML = "<b>Seed Spread:</b> Plant seeds " + spread + "cm";
   plantContainerEl.appendChild(plantSpread);

   // Row Spacing pulled from OpenFarm
   var space = data.data[0].attributes.row_spacing;
   var plantSpace = document.createElement("p");
   plantSpace.innerHTML = "<b>Row Spacing:</b> Make sure rows are " + space + "cm apart.";
   plantContainerEl.appendChild(plantSpace);

   // Plant Height pulled from OpenFarm
   var height = data.data[0].attributes.height;
   var plantHeight = document.createElement("p");
   plantHeight.innerHTML = "<b>Plant Height:</b> " + height + "cm tall.";
   plantContainerEl.appendChild(plantHeight); 

   
    })



navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat, long)
    const response = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=9d88bd6fdf0dea57ceacfd94f52fe0b0&units=metric`, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
}) .then(function(data){
  console.log(data)
});
  });




searchButtonEl.addEventListener("click", formSubmitHandler);
