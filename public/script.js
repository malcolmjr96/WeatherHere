// Geo Locate
const button = document.getElementById("checkin");

button.addEventListener("click", async (event) => {

  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition( async (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      fetchWeather();
      document.getElementById("lat").textContent = lat;
      document.getElementById("lon").textContent = lon;
      document.getElementById("spanlat").textContent = lat + '.';
      document.getElementById("spanlon").textContent = lon + ',';
      

      async function fetchWeather(){ 
        const api_url = `/weather/${lat},${lon}`;
        const weather_response = await fetch(api_url);
        const weather_data = await weather_response.json();

        let temp, aq_value, aq_date, aq_parameter, aq_units, air;
        let weather, city_name, country, weather_description;

        console.log(weather_data);
        

        weather = weather_data.weather;

        console.log(weather);

        air = weather_data.air_quality.results;

        console.log(air);


        city_name = weather.name;
        country = weather.sys.country;
        weather_description = weather.weather[0].description;
        temp = weather.main.temp;


        console.log(city_name,country,weather);
        console.log('here!');
        console.log(air)

        document.getElementById('location').textContent = city_name + ', ';
        document.getElementById('location-country').textContent = country;
        document.getElementById('weatherTemp').textContent = temp;
        document.getElementById('summary').textContent = weather_description;
        console.log(air);
try{
        if(air.length == 0){
          air = { value: -1 };
          document.getElementById('aq_date').textContent = 'unknown date ';
          document.getElementById('aq_units').textContent = 'unknown units ';
          document.getElementById('aq_parameter').textContent = 'unknown parameter ';
          document.getElementById('aq_value').textContent = 'unknown value ';
      } else if (air !== null) {
        console.log(air);
        console.log('blue');

        console.log(air[0].measurements[0].value);
        aq_value = air[0].measurements[0].value;
        aq_date = air[0].measurements[0].lastUpdated;
        aq_parameter = air[0].measurements[0].parameter;
        aq_units = air[0].measurements[0].unit;

        console.log(temp);
        console.log(aq_value);
        console.log(aq_date);
        console.log(aq_parameter);
        console.log(aq_units);


        document.getElementById('aq_date').textContent = aq_date;
        document.getElementById('aq_units').textContent = aq_units;
        document.getElementById('aq_value').textContent = aq_value;
        document.getElementById('aq_parameter').textContent = aq_parameter;
        return pushServer(air);
      };
    }catch(err){
      console.error(err);
    }
      console.log('after if statement');

    pushServer(weather, air, lat, lon);
    async function pushServer(){
      const data = { lat, lon, weather, air };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      
      const db_response = await fetch("/api", options);
      const db_json = await db_response.json();
      console.log(db_json);
      console.log('here!db');
    }
    };

    });
  } else {
    console.log("geolocation not available");
  }
});







