const inputArea = document.querySelector("input");
const btnSearch = document.querySelector(".btn");
const animDisplay = document.querySelector(".all-pics");
const weatherName = document.querySelector(".name-details");
const tempDetails = document.querySelector(".celcius");
const cityName = document.querySelector(".city");
const kelvin = 273;
const humidityValue = document.getElementById("humidty");
const windValue = document.getElementById("wind-value");
const cardHeight = document.querySelector(".whole-card");
const imgDisplay = document.querySelector(".images-details");
const weatherDisplay = document.querySelector(".weather-details");

const apiKey = "3f797d892cdcb159289b85ccf606f0f6";

function requestApi(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temp = Math.floor(data.main.temp - kelvin);
      tempDetails.textContent = `${temp} °C`;
      weatherName.textContent = data.weather[0].description;
      let animatedIcons = data.weather[0].icon;
      console.log(animatedIcons);
      animDisplay.src = `animated/${animatedIcons}.svg`;
      cityName.textContent = data.name + ", " + data.sys.country;
      humidityValue.textContent = data.main.humidity + "%";
      windValue.textContent = data.wind.speed + " m/s";
      cardHeight.style.height = "380px";
    })
    .then(() => {
      imgDisplay.classList.remove("hidden");
      weatherDisplay.classList.remove("hidden");
      inputArea.value = "";
    });
}

window.addEventListener("load", () => {
  let lon;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const urlLocal = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      requestApi(urlLocal);
    });
  }
});

inputArea.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && inputArea.value != "") {
    const urlInput = `https://api.openweathermap.org/data/2.5/weather?q=${inputArea.value}&appid=${apiKey}`;
    requestApi(urlInput);
  }
});

btnSearch.addEventListener("click", () => {
  const inputValue = inputArea.value;
  const urlClick = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
  requestApi(urlClick);
});
