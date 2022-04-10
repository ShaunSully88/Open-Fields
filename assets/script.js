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

// Linking value of plant input to getPlantInfo function. This is a event listener linked to search button.
var formSubmitHandler = function (event) {
  var plant = plantInput.value.trim();
  console.log(plantInput);
  if (plant) {

    searchHistory.push(plant);
    
        localStorage.setItem("VeggieSearch", JSON.stringify(searchHistory));
        var searchHistoryEl = document.createElement('button');
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("veggieData", plant)
        searchHistoryEl.innerHTML = plant;
        veggieButton.appendChild(searchHistoryEl)
        
    getPlantInfo(plant);
    plantInput.value = "";
  } else {
    alert("Please enter a  or vegetable.");
  }
};

//api call to OpenFarm

var getPlantInfo = function (plantInput) {
    var apiUrl = "https://openfarm.cc/api/v1/crops?filter=" + plantInput;
    console.log(apiUrl)
    fetch(apiUrl).then(function(response) {
    // Clear data after search
        plantImageContainerEl.textContent = "";
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
      plantCardContainerEl.appendChild(introPlantCard);

      //create Info card and body
      var infoCard = document.createElement("div");
      var infoCardBody = document.createElement("div");

   // Displaying plant results with an image from website
      
     var image = document.createElement("img");
     image.src = data.data[0].attributes.main_image_path; 
     image.setAttribute('width', '250px');
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
        plantContainerEl.appendChild(plantName);
  
        //Description pulled from OpenFarm
        var description = data?.data[0]?.attributes?.description;
        var plantDescription = document.createElement("p");
        if (!description)
          plantDescription.innerHTML =
            "<u><b>DESCRIPTION:</b></u> Sorry, no information available.";
        else
          plantDescription.innerHTML =
            "<u><b>DESCRIPTION:</b></u> " + description;
        plantContainerEl.appendChild(plantDescription);
  
        // Sun info pulled from OpenFarm
        var sun = data?.data[0]?.attributes?.sun_requirements;
        var plantSun = document.createElement("p");
        if (!sun)
          plantSun.innerHTML =
            "<u><b>SUN REQUIREMENTS:</b></u> Sorry, no information available.";
        else plantSun.innerHTML = "<u><b>SUN REQUIREMENTS:</b></u> " + sun;
        plantContainerEl.appendChild(plantSun);
  
        // Growth Info pulled from OpenFarm
        var growth = data?.data[0]?.attributes?.growing_degree_days;
        var plantGrowth = document.createElement("p");
        if (!growth)
          plantGrowth.innerHTML =
            "<u><b>GROWTH:</b></u> Sorry, no information available.";
        else plantGrowth.innerHTML = "<u><b>GROWTH:</b></u> " + growth + " days";
        plantContainerEl.appendChild(plantGrowth);
  
        // Sowing Steps pulled from OpenFarm
        var sow = data?.data[0]?.attributes?.sowing_method;
        var plantSow = document.createElement("p");
        if (!sow)
          plantSow.innerHTML =
            "<u><b>SOWING INSTRUCTIONS:</b></u> Sorry, no information available.";
        else plantSow.innerHTML = "<u><b>SOWING INSTRUCTIONS:</b></u> " + sow;
        plantContainerEl.appendChild(plantSow);
  
        // Seed Spread pulled from OpenFarm
        var spread = data?.data[0]?.attributes?.spread;
        var plantSpread = document.createElement("p");
        if (!spread)
          plantSpread.innerHTML =
            "<u><b>SEED SPREAD:</b></u> Sorry, no information available.";
        else
          plantSpread.innerHTML =
            "<u><b>SEED SPREAD:</b></u> Plant seeds " + spread + "cm";
        plantContainerEl.appendChild(plantSpread);
  
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
        plantContainerEl.appendChild(plantSpace);
  
        // Plant Height pulled from OpenFarm
        var height = data?.data[0]?.attributes?.height;
        var plantHeight = document.createElement("p");
        if (!height)
          plantHeight.innerHTML =
            "<u><b>PLANT HEIGHT:</b></u> Sorry, no information available.";
        else
          plantHeight.innerHTML =
            "<u><b>PLANT HEIGHT:</b></u> " + height + "cm tall.";
        plantContainerEl.appendChild(plantHeight);

   infoCard.appendChild(infoCardBody);
   plantInfoContainerEl.appendChild(infoCard);
    })
}
searchButtonEl.addEventListener("click", formSubmitHandler);
// adding geolocation using the latitude and longitude.
// grabbed the data using fetch
navigator.geolocation.getCurrentPosition(function(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat, long)
  const response = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=9d88bd6fdf0dea57ceacfd94f52fe0b0&units=metric`, {
method: 'POST', // *GET, POST, PUT, DELETE, etc.
}) .then(async function(data){
console.log(data)
console.log(data.body)
const json = await data.json()
console.log(json)
setWeatherIcon(json);
setWeatherTemperture(json);
});
});
function setWeatherTemperture(data) {
  const tempEl = document.createElement('h3');
  console.log(tempEl)
  const temp = Math.floor(data.current.temp);
  tempEl.innerText = `${temp} C`;
  console.log(data.current.temp);
  weatherIconEl.appendChild(tempEl);
 }
function setWeatherIcon(data) {
const imageEl = document.createElement('img');
console.log(imageEl);
imageEl.src=`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
console.log(data.current.weather[0].icon);
weatherIconEl.appendChild(imageEl);
};

// Handler for Search History Results
var historyHandler = function (event) {
  var plant = event.target.getAttribute("veggieData");
  if (plant) {
      getPlantInfo(plant);
  }
}


var clearHistory = function (event) {
  localStorage.removeItem("veggieSearch");
  historyCardEl.setAttribute("style", "display: none");
}

searchButtonEl.addEventListener("click", formSubmitHandler);
veggieButton.addEventListener("click", historyHandler );
trashEl.addEventListener("click", clearHistory);


