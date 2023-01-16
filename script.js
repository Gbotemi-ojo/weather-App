let minTemp1 = document.querySelector('.minTemp1');
let maxTemp1 = document.querySelector('.maxTemp1');
let minTemp2 = document.querySelector('.minTemp2');
let maxTemp2 = document.querySelector('.maxTemp2');
let minTemp3 = document.querySelector('.minTemp3');
let maxTemp3 = document.querySelector('.maxTemp3');
let minTemp4 = document.querySelector('.minTemp4');
let maxTemp4 = document.querySelector('.maxTemp4');
let minTemp5 = document.querySelector('.minTemp5');
let maxTemp5 = document.querySelector('.maxTemp5');
let testImg = document.querySelector('.testImg');
const todayTempDisplay = document.querySelector('.todayTemp');
const locationBtn = document.querySelector('.LocationBtn');
const windSpeedDisplay = document.querySelector('.windSpeed');
const humidityDisplay = document.querySelector('.humidity');
const inputRange = document.querySelector('.inputRange');
const visibiltyDisplay = document.querySelector('.visibilty');
const airPressureDisplay = document.querySelector('.airPressure');
const inputLocation = document.querySelector('.inputLocation');
const searchBtn = document.querySelector('.searchLocation');
locationBtn.addEventListener('click', getWeatherData);
searchBtn.addEventListener('click',searchLocation);
const cityInfo = document.querySelector('.cityInfo');
async function getWeatherData() {
    const weatherInfo = async (location) => {
        location = await location
        const longitude = await location.coords.longitude;
        const latitude = await location.coords.latitude;
        let getUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
        let getUrlJson = await getUrl.json();
        let imgId = await getUrlJson.list[0].weather[0].icon;
        let todayTemp = await (getUrlJson.list[0].main.feels_like -273).toFixed(2)
        minTemp1.textContent = (await getUrlJson.list[8].main.temp_min - 273).toFixed(2)
        maxTemp1.textContent = (await getUrlJson.list[8].main.temp_max - 273).toFixed(2)
        minTemp2.textContent = (await getUrlJson.list[16].main.temp_min - 273).toFixed(2)
        maxTemp2.textContent = (await getUrlJson.list[16].main.temp_max - 273).toFixed(2)
        minTemp3.textContent = (await getUrlJson.list[24].main.temp_min - 273).toFixed(2)
        maxTemp3.textContent = (await getUrlJson.list[24].main.temp_max -273).toFixed(2)
        minTemp4.textContent = (await getUrlJson.list[30].main.temp_min -273).toFixed(2)
        maxTemp4.textContent = (await getUrlJson.list[30].main.temp_max -273).toFixed(2)
        minTemp5.textContent = (await getUrlJson.list[36].main.temp_min -273).toFixed(2)
        maxTemp5.textContent = (await getUrlJson.list[36].main.temp_max -273).toFixed(2)
        // a render function that takes getUrlJson as a parameter
        todayTempDisplay.textContent = todayTemp
        let windSpeed = getUrlJson.list[0].wind.speed;
        windSpeedDisplay.textContent = windSpeed
        let humidity = getUrlJson.list[0].main.humidity;
        humidityDisplay.textContent = humidity;
        inputRange.value = humidity;
        let visibility = getUrlJson.list[0].visibility;
        // convert meters to miles
        let convertedVisibility = (visibility * 0.000621371).toFixed(2)
        visibiltyDisplay.textContent = convertedVisibility;
        let airPressure = getUrlJson.list[0].main.pressure;
        airPressureDisplay.textContent = airPressure
        testImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
        cityInfo.textContent = getUrlJson.city.name;
        console.log(getUrlJson);
    }
    let failure = (err) => {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(weatherInfo, failure);
}
async function searchLocation(){
    try{
        const userData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputLocation.value}&APPID=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
        const jsonData = await userData.json();
        const latitude = jsonData.coord.lat
        const longitude = jsonData.coord.lon
        let getUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
        let getUrlJson = await getUrl.json();
        let imgId = await getUrlJson.list[0].weather[0].icon;
        let todayTemp = await (getUrlJson.list[0].main.feels_like - 273).toFixed(2)
        minTemp1.textContent = (await getUrlJson.list[8].main.temp_min - 273).toFixed(2)
        maxTemp1.textContent = (await getUrlJson.list[8].main.temp_max - 273).toFixed(2)
        minTemp2.textContent = (await getUrlJson.list[16].main.temp_min - 273).toFixed(2)
        maxTemp2.textContent = (await getUrlJson.list[16].main.temp_max - 273).toFixed(2)
        minTemp3.textContent = (await getUrlJson.list[24].main.temp_min - 273).toFixed(2)
        maxTemp3.textContent = (await getUrlJson.list[24].main.temp_max - 273).toFixed(2)
        minTemp4.textContent = (await getUrlJson.list[30].main.temp_min - 273).toFixed(2)
        maxTemp4.textContent = (await getUrlJson.list[30].main.temp_max - 273).toFixed(2)
        minTemp5.textContent = (await getUrlJson.list[36].main.temp_min - 273).toFixed(2)
        maxTemp5.textContent = (await getUrlJson.list[36].main.temp_max - 273).toFixed(2)
        // a render function that takes getUrlJson as a parameter
        todayTempDisplay.textContent = todayTemp
        let windSpeed = getUrlJson.list[0].wind.speed;
        windSpeedDisplay.textContent = windSpeed
        let humidity = getUrlJson.list[0].main.humidity;
        humidityDisplay.textContent = humidity;
        inputRange.value = humidity;
        let visibility = getUrlJson.list[0].visibility;
        // convert meters to miles
        let convertedVisibility = (visibility * 0.000621371).toFixed(2)
        visibiltyDisplay.textContent = convertedVisibility;
        let airPressure = getUrlJson.list[0].main.pressure;
        airPressureDisplay.textContent = airPressure
        testImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
        cityInfo.textContent = getUrlJson.city.name;
        console.log(getUrlJson);
        console.log(jsonData)
    }
    catch{
        console.log('not found')
    }
}
const searchHistoryContainer = document.querySelector('.searchHistoryContainer');
searchBtn.addEventListener('click', () => {
   let div =  document.createElement('div');
   div.textContent = inputLocation.value;
   searchHistoryContainer.append(div);
})
function searchHistory(location){
    this.location = location
}
let london = new searchHistory('london');

const cancelBtn = document.querySelector('.cancelBtn');
const searchForPlacesBtn = document.querySelector('.searchBtn');
const firstPage = document.querySelector('#firstPage');
const searchPageContainer = document.querySelector('.searchPageContainer');
cancelBtn.addEventListener('click', () => {
    firstPage.style.display = 'flex';
    searchPageContainer.style.display = 'none';
})
searchForPlacesBtn.addEventListener('click', () => {
    firstPage.style.display = 'none';
    searchPageContainer.style.display = 'flex';
})
firstPage.style.display = 'flex';
searchPageContainer.style.display = 'none';

let link = 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3f48274a20bac99a1e52fb12652e7fdc';

link2 = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=3f48274a20bac99a1e52fb12652e7fdc';
reverse = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=44.34&longitude=10.99&localityLanguage=en';

'BodEl6mvkYI8vSk3kzoJlHnPMs47bChX'
fetch('https://api.giphy.com/v1/gifs/translate?api_key=BodEl6mvkYI8vSk3kzoJlHnPMs47bChX&s=cats', { mode: 'cors' });
