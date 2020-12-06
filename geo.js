// weather
const weather = document.querySelector(".js_weather");
const COORDS = 'coords';
const API_KEY = "60c6dae3be78fd1c0974d93eba2238f4";

function getWeather(lat, lng){
  fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
      ).then(function(response){
          return response.json();
      }).then(function(json){
          const temperature = json.main.temp;
          const place = json.name;
          console.log(`${temperature} @ ${place}`)
          weather.innerText = `${temperature} @ ${place}`;
      })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
      latitude : latitude,
      longitude : longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Can't access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS); 
  if(loadedCoords === null){
      askForCoords();
  } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}


function init(){
  loadCoords();
}

init();
