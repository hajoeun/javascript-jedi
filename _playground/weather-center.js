if (navigator.geolocation) {
  $.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU", getWeather);
}

function getWeather(position) {
  var lat = position.location.lat;
  var lon = position.location.lng;
  var key = '226348949859717c36bf5cea47b691bc';
  var weatherJson = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon  + "&APPID=" + key;
  var weatherData = {};

  $.getJSON(weatherJson, function(obj) {
    weatherData.main = obj.weather[0].main;
    weatherData.location = obj.name + ", " + obj.sys.country;
    weatherData.temp = (obj.main.temp - 273.15).toFixed(1);
    showWeather(weatherData);
  });
}

function showWeather(data) {
  $("#data").html("Weather: " + data.main + " " + data.temp + "°C<br>Location: " + data.location);
}
