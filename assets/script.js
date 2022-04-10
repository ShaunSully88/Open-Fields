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
// search historu
var searchHistory = [];
// button for items in search history
var veggieButton = document.querySelector("#veggie-btn")
// Clear Search History
var historyCardEl = document.querySelector("#searchHistory")
//trash icon
var trashEl = document.querySelector("#trash")
//Defining weatherIcon
var weatherIconEl = document.querySelector("#weather-icon")
// search history results
var searchHistoryEl = document.createElement('button')
// Invalid message
var invalidInputEl = document.querySelector('#invalid-input')

var tempIconEl = document.querySelector("#temp-icon")
// Linking value of plant input to getPlantInfo function. This is a event listener linked to search button.
var formSubmitHandler = function (event) {
  var plant = plantInput.value.trim();
  if (plant) {

    searchHistory.push(plant);
    
        localStorage.setItem("VeggieSearch", JSON.stringify(searchHistory));
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("veggieData", plant)
        searchHistoryEl.innerHTML = plant;
        searchHistoryEl.style.borderRadius = "10px";
        veggieButton.appendChild(searchHistoryEl);
        
    getPlantInfo(plant);
    plantInput.value = "";
  } else {
    var invalidInput = document.createElement("p")
    invalidInput.innerHTML = "Please enter a fruit or vegetable.";
    invalidInputEl.appendChild(invalidInput);
  }
};

//api call to OpenFarm

var getPlantInfo = function (plantInput) {
    var apiUrl = "https://openfarm.cc/api/v1/crops?filter=" + plantInput;
    fetch(apiUrl).then(function(response) {
    // Clear data after search
        plantImageContainerEl.textContent = "";
        plantCardContainerEl.textContent = "";
        plantInfoContainerEl.textContent = "";
        
        return response.json();
    })
    .then(function(data) {

         //create card div
      var introPlantCardEl = document.createElement("div");
      //create header and body for card
      var introCardHeaderEl = document.createElement("h2");
      introCardHeaderEl.innerHTML = "Showing information for: " + plantInput;
      var introCardBodyEl = document.createElement("p");

      

      //create Info card and body
      var infoCardEl = document.createElement("div");
      var infoCardBodyEl = document.createElement("div");

   // Displaying plant results with an image from website
      
     var image = document.createElement("img");
     image.src = data.data[0].attributes.main_image_path; 
     image.setAttribute('width', '400px');
     image.setAttribute('height', '200px');
     image.style.border = "4px solid white";
     image.style.borderRadius = "10px";
     image.innerHTML = image;
     plantImageContainerEl.appendChild(image); 

        // Name pulled from OpenFarm
        var latinName = data?.data[0]?.attributes?.binomial_name;
        var plantName = document.createElement("p");
        if (!latinName)
          plantName.innerHTML =
            "<u><b>BINOMIAL NAME:</b></u> Sorry, no information available.";
        else plantName.innerHTML = "<u><b>BINOMIAL NAME:</b></u> " + latinName;
        infoCardBodyEl.appendChild(plantName);
  
        //Description pulled from OpenFarm
        var description = data?.data[0]?.attributes?.description;
        var plantDescription = document.createElement("p");
        if (!description)
          plantDescription.innerHTML =
            "<u><b>DESCRIPTION:</b></u> Sorry, no information available.";
        else
          plantDescription.innerHTML =
            "<u><b>DESCRIPTION:</b></u> " + description;
            introCardBodyEl.appendChild(plantDescription);
  
        // Sun info pulled from OpenFarm
        var sun = data?.data[0]?.attributes?.sun_requirements;
        var plantSun = document.createElement("p");
        if (!sun)
          plantSun.innerHTML =
            "<u><b>SUN REQUIREMENTS:</b></u> Sorry, no information available.";
        else plantSun.innerHTML = "<u><b>SUN REQUIREMENTS:</b></u> " + sun;
        infoCardBodyEl.appendChild(plantSun);
  
        // Growth Info pulled from OpenFarm
        var growth = data?.data[0]?.attributes?.growing_degree_days;
        var plantGrowth = document.createElement("p");
        if (!growth)
          plantGrowth.innerHTML =
            "<u><b>GROWTH:</b></u> Sorry, no information available.";
        else plantGrowth.innerHTML = "<u><b>GROWTH:</b></u> " + growth + " days";
        infoCardBodyEl.appendChild(plantGrowth);
  
        // Sowing Steps pulled from OpenFarm
        var sow = data?.data[0]?.attributes?.sowing_method;
        var plantSow = document.createElement("p");
        if (!sow)
          plantSow.innerHTML =
            "<u><b>SOWING INSTRUCTIONS:</b></u> Sorry, no information available.";
        else plantSow.innerHTML = "<u><b>SOWING INSTRUCTIONS:</b></u> " + sow;
        infoCardBodyEl.appendChild(plantSow);
  
        // Seed Spread pulled from OpenFarm
        var spread = data?.data[0]?.attributes?.spread;
        var plantSpread = document.createElement("p");
        if (!spread)
          plantSpread.innerHTML =
            "<u><b>SEED SPREAD:</b></u> Sorry, no information available.";
        else
          plantSpread.innerHTML =
            "<u><b>SEED SPREAD:</b></u> Plant seeds " + spread + "cm";
            infoCardBodyEl.appendChild(plantSpread);
  
        // Row Spacing pulled from OpenFarm
        var space = data?.data[0]?.attributes?.row_spacing;
        var plantSpace = document.createElement("p");
        if (!space)
          plantSpace.innerHTML =
            "<u><b>ROW SPACING:</b></u> Sorry, no information available.";
        else
          plantSpace.innerHTML =
            "<u><b>ROW SPACING:</b></u> Make sure rows are " +
            space +
            "cm apart.";
            infoCardBodyEl.appendChild(plantSpace);
  
        // Plant Height pulled from OpenFarm
        var height = data?.data[0]?.attributes?.height;
        var plantHeight = document.createElement("p");
        if (!height)
          plantHeight.innerHTML =
            "<u><b>PLANT HEIGHT:</b></u> Sorry, no information available.";
        else
          plantHeight.innerHTML =
            "<u><b>PLANT HEIGHT:</b></u> " + height + "cm tall.";
            infoCardBodyEl.appendChild(plantHeight);


      //append dynamic elements to html
      introPlantCardEl.appendChild(introCardHeaderEl);
      introPlantCardEl.appendChild(introCardBodyEl);
      plantCardContainerEl.appendChild(introPlantCardEl);
      infoCardEl.appendChild(infoCardBodyEl);
      plantInfoContainerEl.appendChild(infoCardEl);
    })
}
searchButtonEl.addEventListener("click", formSubmitHandler);
// adding geolocation using the latitude and longitude.
// grabbed the data using fetch
navigator.geolocation.getCurrentPosition(function(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  const response = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=9d88bd6fdf0dea57ceacfd94f52fe0b0&units=metric`, {
method: 'POST', // *GET, POST, PUT, DELETE, etc.
}) .then(async function(data){
const json = await data.json()
setWeatherIcon(json);
setWeatherTemperture(json);
});
});
function setWeatherTemperture(data) {
  const tempEl = document.createElement('p');
  const temp = Math.floor(data.current.temp);
  tempEl.innerText = `${temp} °C`;
  tempEl.style.margin = '0px';
  tempEl.style.fontSize = '25px';
  tempIconEl.appendChild(tempEl);
 }
function setWeatherIcon(data) {
const imageEl = document.createElement('img');
imageEl.src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
weatherIconEl.appendChild(imageEl);
};

// Handler for Search History Results
var historyHandler = function (event) {
  var plant = event.target.getAttribute("veggieData");
  if (plant) {
      getPlantInfo(plant);
  }
}

// Clearing History via Trash Button
var clearHistory = function () {
  localStorage.removeItem("VeggieSearch");
  searchHistoryEl.setAttribute("style", "display: none");

}

searchButtonEl.addEventListener("click", formSubmitHandler);
veggieButton.addEventListener("click", historyHandler );
trashEl.addEventListener("click", clearHistory);


