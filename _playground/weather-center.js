var weatherCenter = (function() {
  var weatherData = {}, lat, lon;

  function WeatherCenter() {
    // 구글 지오로케이션 api로부터 지역 정보(위치)를 가져오는 메소드, 순서 1번
    this.getLocation = function() {
      $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA_3mlUgaVTJwbitAvE3T5V-szKuIcAfC4", function(position) {
        lat = position.location.lat;
        lon = position.location.lng;
      });
    };

    // openweathermap api로부터 기상 정보(날씨)를 가져오는 메소드, 순서 2번
    this.getWeather = function () {
      var key = '226348949859717c36bf5cea47b691bc';
      var weatherJson = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon  + "&APPID=" + key;
      $.getJSON(weatherJson, function(obj) {
        weatherData.main = obj.weather[0].main;
        weatherData.icon = obj.weather[0].icon;
        weatherData.location = obj.name + ", " + obj.sys.country;
        if (!weatherData.temp) {
          weatherData.temp = (obj.main.temp - 273.15).toFixed(1);
          weatherData.tempFlag = "°C";
        }
      });
    };

    // 새로운 기상 정보를 갱신하기 위한 메소드
    this.toggleMeasurement = function() {
      if(weatherData.tempFlag === "°C") {
        weatherData.temp = ((weatherData.temp * 1.8) + 32).toFixed(1);
        weatherData.tempFlag = "°F";
      } else {
        weatherData.temp = ((weatherData.temp - 32) / 1.8).toFixed(1);
        weatherData.tempFlag = "°C";
      }
      this.showWeather();
    };

    // 데이터를 화면에 출력해주는 메소드, 순서 3번
    this.showWeather = function() {
      $("#data").html(weatherData.location + "<br>" +
      weatherData.temp + weatherData.tempFlag + "<br>" +
      weatherData.main + "<img src='http://openweathermap.org/img/w/" + weatherData.icon + ".png'>");
    };
  }
  return new WeatherCenter();
})();


if (navigator.geolocation) {
  setTimeout(weatherCenter.getLocation,10);
  setTimeout(weatherCenter.getWeather,500);
  setTimeout(weatherCenter.showWeather,1000);
}

$(document).ready(function() {
  $('#title').on('click', function() {
    weatherCenter.showWeather();
  });
  $('#data').on('click', function() {
    weatherCenter.toggleMeasurement();
  });
});
