function update(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.temperature.current);
    let temp = document.querySelector("#numerical-value");
    temp.innerHTML = `${temperature}`;
    let emoji = document.querySelector("#emoji");
    let emojiDescription = response.data.condition.icon_url;
    emoji.innerHTML = `<img src = "${emojiDescription}" alt ="weather icon" style = "width:50px; hight:50px">`;
    let humidity = document.querySelector("#humidity");
    let humidityApi = response.data.temperature.humidity;
    let speed = response.data.wind.speed;
    humidity.innerHTML = `${humidityApi}%`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${speed}km/hr`;
    let description = document.querySelector("#weather-description")
    let weatherDescription = response.data.condition.description;
    description.innerHTML = `${weatherDescription}`;
    getForecastData(response.data.city);    

}
function searchCity(city) {
    let apiKey = "8f60e4179bbf68bea9tcd3bo5ad07f58";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    //console.log(url);
    axios.get(url).then(update);
    
}
function search(event) {
    event.preventDefault();
    let input = document.querySelector("#search-input");
    console.log(input.value);
    let h1 = document.querySelector("h1");
    h1.innerHTML= `${input.value}`
    searchCity(input.value);
    getForecastData(input.value);
}
function formatDate(timestamp) {
    let date = new Date(timestamp*1000);
    let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
    return days[date.getDay()];
}
function getForecastData(city) {
    let forecastApiKey = "8f60e4179bbf68bea9tcd3bo5ad07f58";
    forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${forecastApiKey}&units=metric`;
   // console.log(forecastUrl);
    axios(forecastUrl).then(displayForecast);

}
function displayForecast(response) {

    console.log(response.data);
    let forecast = document.querySelector("#forecast");
    let day = ["Tue", "Wed", "Thr", "Fir", "Sat"];
    forecasthtml = "";
    response.data.daily.forEach(function (dayss, index) {
        if (index < 5) {
            forecasthtml = forecasthtml + `<div class="weather-forcast-each">
             <div class="day">${formatDate(dayss.time)}</div>
             <div class="icon"><img src="${dayss.condition.icon_url}" style ="width:60px; height:100px class="icon-img" /></div>
             <div class="temperature">${Math.round(dayss.temperature.maximum)}° ${Math.round(dayss.temperature.minimum)}° </div>
          </div> `;
        }
        });
    forecast.innerHTML = forecasthtml;
} 
let current = new Date();
 let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
let day = days[current.getDay()];
let tday = document.querySelector("#day");
tday.innerHTML = `${day}`;
let hour = document.querySelector("#hour");
let time = current.getHours();
hour.innerHTML = `${time}`;
let minute = document.querySelector("#minute");
let min = current.getMinutes();
minute.innerHTML = `${min}`;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
//displayForecast();
getForecastData("paris");
