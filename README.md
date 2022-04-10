# Open-Fields

Open Fields is a gardening app that allows you to search up information on a specific vegetable or fruit you are interested in growing. We used OpenFarm as our API source, and have requested the following data upon each search:

- Picture
- Latin Name
- Description
- The Sun Requirements
- The Growth Span
- Sowing Requirements
- Seed Spacing
- Row Spacing
- Plant Height

Once you have entered the crop into the search field and clicked on the button, you will then be prompted for our site to "know your location". This is our second API call, we used Open Weather API as our API source, and an icon will appear on the screen to display the weather in your area for the day, basically letting you know if it's good gardening weather or not!

## Languages Used

Aside from the HTML, CSS and Javascript languages, we used the Spectre framework for our design structure. We used MomentJS to determine current date for the daily temperature.

We used two seperate server side API's, one to https://openfarm.cc/api/v1/crops/ to access all info veggie/fruit related, the other to https://openweathermap.org/api/one-call-api to access weather data. User will have to accept location request to have weather data displayed for their specific area. 

