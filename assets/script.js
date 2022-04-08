// Plant/vegetable input in search bar
var plantInput = document.querySelector('#plant-input')
//button
var searchButtonEl = document.querySelector('#search-button')
//container for all plant info
var plantContainerEl = document.querySelector('#plant-container')
//container for plant image
var plantImageContainerEl = document.querySelector('#plant-image-container')
//container for plant card
var plantCardContainerEl = document.querySelector('#plant-card-container')
//container for plant info
var plantInfoContainerEl = document.querySelector('#plant-info-container')

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
    // Clear data after search
  
    plantContainerEl.textContent ="";
        plantImageContainerEl.textContent ="";
        plantCardContainerEl.textContent = "";
        plantInfoContainerEl.textContent = "";

        return response.json();
    })
    .then(function(data) {
        console.log(data) 

         //create card div
      var introPlantCard = document.createElement("div");
      //create header and body for card
      var introCardHeader = document.createElement("h2");
      introCardHeader.innerHTML = "Showing information for: " + plantInput;
      var introCardBody = document.createElement("p");

      //append header to card
      introPlantCard.appendChild(introCardHeader);
      //append body to card
      introPlantCard.appendChild(introCardBody);
      //append card to container
      plantContainerEl.appendChild(introPlantCard);

      //create Info card and body
      var infoCard = document.createElement("div");
      var infoCardBody = document.createElement("div");

   // Displaying plant results with an image from website
      
     var image = document.createElement("img");
     image.src = data.data[0].attributes.main_image_path; 
     image.setAttribute('width', '400px');
     image.setAttribute('height', '200px');
      image.innerHTML = image;
     plantImageContainerEl.appendChild(image); 

    
    // Name pulled from OpenFarm
    var latinName = data.data[0].attributes.binomial_name
    var plantName = document.createElement("p"); 
    plantName.innerHTML = "<u><b>Binomial Name:</b></u> " + latinName;
    introCardBody.appendChild(plantName);
   
   //Description pulled from OpenFarm
   var description = data.data[0].attributes.description
   var plantDescription = document.createElement("p"); 
   plantDescription.innerHTML = "<u><b>Description:</b></u> " + description;
   introCardBody.appendChild(plantDescription);

   // Sun info pulled from OpenFarm
   var sun = data.data[0].attributes.sun_requirements;
   var plantSun = document.createElement("p")
   plantSun.innerHTML = "<u><b>Sun Requirements:</b></u> " + sun;
   infoCardBody.appendChild(plantSun);

   // Growth Info pulled from OpenFarm
   var growth = data.data[0].attributes.growing_degree_days;    
   var plantGrowth = document.createElement("p");
   plantGrowth.innerHTML = "<u><b>Growth:</b></u> " + growth + " days";
   infoCardBody.appendChild(plantGrowth);

   // Sowing Steps pulled from OpenFarm
   var sow = data.data[0].attributes.sowing_method; 
   var plantSow = document.createElement("p");
   plantSow.innerHTML = "<u><b>Sowing Instructions:</b></u> " + sow;
   infoCardBody.appendChild(plantSow);

   // Seed Spread pulled from OpenFarm
   var spread = data.data[0].attributes.spread;
   var plantSpread = document.createElement("p");
   plantSpread.innerHTML = "<u><b>Seed Spread:</b></u> Plant seeds " + spread + "cm";
   infoCardBody.appendChild(plantSpread);

   // Row Spacing pulled from OpenFarm
   var space = data.data[0].attributes.row_spacing;
   var plantSpace = document.createElement("p");
   plantSpace.innerHTML = "<u><b>Row Spacing:</b></u> Make sure rows are " + space + "cm apart.";
   infoCardBody.appendChild(plantSpace);

   // Plant Height pulled from OpenFarm
   var height = data.data[0].attributes.height;
   var plantHeight = document.createElement("p");
   plantHeight.innerHTML = "<u><b>Plant Height:</b></u> " + height + "cm tall.";
   infoCardBody.appendChild(plantHeight); 

   infoCard.appendChild(infoCardBody);
   plantContainerEl.appendChild(infoCard);
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
// adding icons
function setWeatherIcon(data) {
  const imageEl = document.querySelector('.weather-icon');
  console.log(imageEl)
  imageEl.src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
  console.log(data.current.weather[0].icon)
}
//Weather temperature 
function setWeatherTemperture(data) {
  const tempEl = document.querySelector('.weather-temp');
  console.log(tempEl)
  const temp = Math.floor(data.current.temp);
  tempEl.innerText = `${temp} C`;
  console.log(data.current.temp);
}

}

searchButtonEl.addEventListener("click", formSubmitHandler);
