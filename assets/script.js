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
        debugger;
        console.log(data) 

//     var imageId = plantResponse.data[0].relationships.pictures.data[0].id;

//     var plantImage = "<img src='https://s3.amazonaws.com/openfarm-project/production/media/pictures/attachments/" + imageId + "'.' />"

//   // Displaying plant results with an image from website
//       var image = document.createElement("img")
//       image.innerHTML = plantImage;
//       plantContainerEl.innerHTML = plantName + plantImage; 

    
    // Name pulled from OpenFarm
    var latinName = data.data[0].attributes.binomial_name
    var plantName = document.createElement("p"); 
    plantName.innerHTML = " Binomial Name: " + latinName;
    plantContainerEl.appendChild(plantName);
   
   //Description pulled from OpenFarm
   var description = data.data[0].attributes.description
   var plantDescription = document.createElement("p"); 
   plantDescription.innerHTML = " Description: " + description;
   plantContainerEl.appendChild(plantDescription);

   // Sun info pulled from OpenFarm
   var sun = data.data[0].attributes.sun_requirements;
   var plantSun = document.createElement("p")
   plantSun.innerHTML = " Sun: " + sun;
   plantContainerEl.appendChild(plantSun);

   // Growth Info pulled from OpenFarm
   var growth = data.data[0].attributes.growing_degree_days;    
   var plantGrowth = document.createElement("p");
   plantGrowth.innerHTML = " Growth: " + growth + " days";
   plantContainerEl.appendChild(plantGrowth);

   // Sowing Steps pulled from OpenFarm
   var sow = data.data[0].attributes.sowing_method; 
   var plantSow = document.createElement("p");
   plantSow.innerHTML = " Sowing Instructions: " + sow;
   plantContainerEl.appendChild(plantSow);

   // Seed Spread pulled from OpenFarm
   var spread = data.data[0].attributes.spread;
   var plantSpread = document.createElement("p");
   plantSpread.innerHTML = " Seed Spread: Plant seeds " + spread + "cm";
   plantContainerEl.appendChild(plantSpread);

   // Row Spacing pulled from OpenFarm
   var space = data.data[0].attributes.row_spacing;
   var plantSpace = document.createElement("p");
   plantSpace.innerHTML = " Row Spacing: Make sure rows are " + space + "cm apart.";
   plantContainerEl.appendChild(plantSpace);

   // Plant Height pulled from OpenFarm
   var height = data.data[0].attributes.height;
   var plantHeight = document.createElement("p");
   plantHeight.innerHTML = " Plant Height: " + height + "cm tall.";
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
}


searchButtonEl.addEventListener("click", formSubmitHandler);
