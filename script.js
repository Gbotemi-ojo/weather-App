let minTemp = document.querySelectorAll('.minTemp');
let maxTemp = document.querySelectorAll('.maxTemp');
let futureCastImg = document.querySelectorAll('.futureCastImg');
const tempDetailDisplay = document.querySelector('.tempDetail');
const dayValues = document.querySelectorAll('.dayValue');
const celciusBtn = document.querySelector('.celciusBtn');
const farenheitBtn = document.querySelector('.farenheitBtn');
const todayTempDisplay = document.querySelector('.todayTemp');
const locationBtn = document.querySelector('.LocationBtn');
const windSpeedDisplay = document.querySelector('.windSpeed');
const humidityDisplay = document.querySelector('.humidity');
const inputRange = document.querySelector('.inputRange');
const visibiltyDisplay = document.querySelector('.visibilty');
const airPressureDisplay = document.querySelector('.airPressure');
const inputLocation = document.querySelector('.inputLocation');
const searchBtn = document.querySelector('.searchLocation');
const todayWeatherImg = document.querySelector('.todayWeatherImg');
locationBtn.addEventListener('click', getWeatherData);
searchBtn.addEventListener('click', searchLocation);
const cityInfo = document.querySelector('.cityInfo');
async function getWeatherData() {
    const weatherInfo = async (location) => {
        location = await location
        const longitude = await location.coords.longitude;
        const latitude = await location.coords.latitude;
        let getUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
        let getUrlJson = await getUrl.json();
        let imgId = await getUrlJson.list[0].weather[0].icon;
        const weatherIconImg1 = await getUrlJson.list[8].weather[0].icon;
        const weatherIconImg2 = await getUrlJson.list[16].weather[0].icon;
        const weatherIconImg3 = await getUrlJson.list[24].weather[0].icon;
        const weatherIconImg4 = await getUrlJson.list[30].weather[0].icon;
        const weatherIconImg5 = await getUrlJson.list[36].weather[0].icon;
        let todayTemp =   (await getUrlJson.list[0].main.feels_like - 273).toFixed(2)
        const tempDetail = await getUrlJson.list[0].weather[0].description
        const minTemp1 = (await getUrlJson.list[8].main.temp_min - 273).toFixed(2);
        const maxTemp1 = (await getUrlJson.list[8].main.temp_max - 273).toFixed(2);
        const minTemp2 = (await getUrlJson.list[16].main.temp_min - 273).toFixed(2);
        const maxTemp2 = (await getUrlJson.list[16].main.temp_max - 273).toFixed(2);
        const minTemp3 = (await getUrlJson.list[24].main.temp_min - 273).toFixed(2);
        const maxTemp3 = (await getUrlJson.list[24].main.temp_max - 273).toFixed(2);
        const minTemp4= (await getUrlJson.list[30].main.temp_min - 273).toFixed(2);
        const maxTemp4 = (await getUrlJson.list[30].main.temp_max - 273).toFixed(2);
        const minTemp5 = (await getUrlJson.list[36].main.temp_min - 273).toFixed(2);
        const maxTemp5 = (await getUrlJson.list[36].main.temp_max - 273).toFixed(2);
        let minTempArray = [
            minTemp1,minTemp2,minTemp3,minTemp4,minTemp5
        ]
        let maxTempArray = [
            maxTemp1,maxTemp2,maxTemp3,maxTemp4,maxTemp5
        ]
        let futureCastArray = [
            weatherIconImg1,
            weatherIconImg2,
            weatherIconImg3,
            weatherIconImg4,
            weatherIconImg5
        ]
        console.log(tempDetail)
        tempDetailDisplay.textContent = tempDetail
        // a render function that takes getUrlJson as a parameter
        todayTempDisplay.textContent = todayTemp
        let windSpeed = getUrlJson.list[0].wind.speed;
        windSpeedDisplay.textContent = windSpeed;
        let humidity = getUrlJson.list[0].main.humidity;
        humidityDisplay.textContent = humidity;
        inputRange.value = humidity;
        let visibility = getUrlJson.list[0].visibility;
        // convert meters to miles
        let convertedVisibility = (visibility * 0.000621371).toFixed(2)
        visibiltyDisplay.textContent = convertedVisibility;
        let airPressure = getUrlJson.list[0].main.pressure;
        airPressureDisplay.textContent = airPressure;
        todayWeatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
        cityInfo.textContent = getUrlJson.city.name;
        console.log(getUrlJson);
        for (let i = 0; i <= 5; i++) {
            futureCastImg[i].setAttribute('src', `http://openweathermap.org/img/wn/${futureCastArray[i]}@2x.png`);
            minTemp[i].textContent = minTempArray[i];
            maxTemp[i].textContent = maxTempArray[i];
        }
    }
    let failure = (err) => {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(weatherInfo, failure);
}
async function searchLocation() {
    try {
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
        todayWeatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
        cityInfo.textContent = getUrlJson.city.name;
        console.log(getUrlJson);
        console.log(jsonData)
    }
    catch {
        console.log('not found')
    }
}
const searchHistoryContainer = document.querySelector('.searchHistoryContainer');
searchBtn.addEventListener('click', () => {
    let searchText = document.createElement('div');
    searchText.textContent = inputLocation.value;
    let deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'X';
    searchText.setAttribute('class', 'previousSearch');
    deleteBtn.setAttribute('class', 'deleteBtn');
    searchHistoryContainer.append(searchText);
    searchText.append(deleteBtn);
})
searchHistoryContainer.addEventListener('click', (e) => {
    if (e.target.className === 'deleteBtn') {
        e.target.parentElement.remove();
    }
})
searchHistoryContainer.addEventListener('click', async (e) => {
    try {
        const userData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.firstChild.textContent}&APPID=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
        const jsonData = await userData.json();
        const latitude = jsonData.coord.lat;
        const longitude = jsonData.coord.lon;
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
        todayTempDisplay.textContent = todayTemp;
        let windSpeed = getUrlJson.list[0].wind.speed;
        windSpeedDisplay.textContent = windSpeed;
        let humidity = getUrlJson.list[0].main.humidity;
        humidityDisplay.textContent = humidity;
        inputRange.value = humidity;
        let visibility = getUrlJson.list[0].visibility;
        // convert meters to miles
        let convertedVisibility = (visibility * 0.000621371).toFixed(2)
        visibiltyDisplay.textContent = convertedVisibility;
        let airPressure = getUrlJson.list[0].main.pressure;
        airPressureDisplay.textContent = airPressure
        todayWeatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
        cityInfo.textContent = getUrlJson.city.name;
        console.log(getUrlJson);
        console.log(jsonData)
    }
    catch {
        console.log('not found')
    }
})
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
celciusBtn.addEventListener('click', () => {
    // convert to celcius
})
farenheitBtn.addEventListener('click', () => {
    // (0°C × 9 / 5) + 32 = 32°F
    let farenheit = (+minTemp1.textContent * 9 / 5) + 32;
    minTemp1.textContent = farenheit
    // convert to farenheit
});
let link = 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3f48274a20bac99a1e52fb12652e7fdc';

link2 = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=3f48274a20bac99a1e52fb12652e7fdc';
reverse = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=44.34&longitude=10.99&localityLanguage=en';

'BodEl6mvkYI8vSk3kzoJlHnPMs47bChX'
fetch('https://api.giphy.com/v1/gifs/translate?api_key=BodEl6mvkYI8vSk3kzoJlHnPMs47bChX&s=cats', { mode: 'cors' });
// time function;
let setDate = (function() {
    const currentDay = new Date()
    const thirdDay = new Date((new Date()).getTime() + (2 * 86400000));
    const fourthDay = new Date((new Date()).getTime() + (3 * 86400000));
    const fifthDay = new Date((new Date()).getTime() + (4 * 86400000));
    const sixthDay = new Date((new Date()).getTime() + (5 * 86400000));
    const dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let dateArray = [
        `${dayArray[currentDay.getDay()]},${currentDay.getDate()} ${monthArray[currentDay.getMonth()]}`,
        `${dayArray[thirdDay.getDay()]},${thirdDay.getDate()} ${monthArray[thirdDay.getMonth()]}`,
        `${dayArray[fourthDay.getDay()]},${fourthDay.getDate()} ${monthArray[fourthDay.getMonth()]}`,
        `${dayArray[fifthDay.getDay()]},${fifthDay.getDate()} ${monthArray[fifthDay.getMonth()]}`,
        `${dayArray[sixthDay.getDay()]},${sixthDay.getDate()} ${monthArray[sixthDay.getMonth()]}`,
    ]
    for (let i = 0; i < dateArray.length; i++) {
        dayValues[i].textContent = dateArray[i]
    }
})()