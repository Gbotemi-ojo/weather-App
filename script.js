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
const tempScale = document.querySelectorAll('.tempScale');
const celciusText = document.querySelector('.celciusText');
locationBtn.addEventListener('click', getWeatherData);
searchBtn.addEventListener('click', searchLocation);
const cityInfo = document.querySelector('.cityInfo');
async function fetchData(latitude,longitude){
    const getUrl = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3f48274a20bac99a1e52fb12652e7fdc`, { mode: 'cors' })
    const data = await getUrl.json();
    return data;
}
async function MinTempData(data){
    const minTemp1 = (await data.list[8].main.temp_min - 273).toFixed(2);
    const minTemp2 = (await data.list[16].main.temp_min - 273).toFixed(2);
    const minTemp3 = (await data.list[24].main.temp_min - 273).toFixed(2);
    const minTemp4 = (await data.list[30].main.temp_min - 273).toFixed(2);
    const minTemp5 = (await data.list[36].main.temp_min - 273).toFixed(2);
    const minTempArray = [
        minTemp1,minTemp2,minTemp3,minTemp4,minTemp5
    ]
    return minTempArray;
}
async function maxTempData(data){
    const maxTemp1 = (await data.list[8].main.temp_max - 273).toFixed(2);
    const maxTemp2 = (await data.list[16].main.temp_max - 273).toFixed(2);
    const maxTemp3 = (await data.list[24].main.temp_max - 273).toFixed(2);
    const maxTemp4 = (await data.list[30].main.temp_max - 273).toFixed(2);
    const maxTemp5 = (await data.list[36].main.temp_max - 273).toFixed(2);
    const maxTempArray = [
        maxTemp1,maxTemp2,maxTemp3,maxTemp4,maxTemp5
    ]
    return maxTempArray;
}
async function weatherIconsData(data){
    const weatherIconImg1 = await data.list[8].weather[0].icon;
    const weatherIconImg2 = await data.list[16].weather[0].icon;
    const weatherIconImg3 = await data.list[24].weather[0].icon;
    const weatherIconImg4 = await data.list[30].weather[0].icon;
    const weatherIconImg5 = await data.list[36].weather[0].icon;
    const weatherIconArray = [
        weatherIconImg1,weatherIconImg2,weatherIconImg3,weatherIconImg4,weatherIconImg5
    ]
    return weatherIconArray;
}
async function renderData(data){
    const imgId = await data.list[0].weather[0].icon;
    const todayTemp = (await data.list[0].main.feels_like - 273).toFixed(2);
    const tempDetail = await data.list[0].weather[0].description;
    tempDetailDisplay.textContent = tempDetail;
    todayTempDisplay.textContent = todayTemp;
    const windSpeed = await data.list[0].wind.speed;
    windSpeedDisplay.textContent = windSpeed;
    const humidity = await data.list[0].main.humidity;
    humidityDisplay.textContent = humidity;
    inputRange.value = humidity;
    const visibility = await data.list[0].visibility;
    const convertedVisibility = (visibility * 0.000621371).toFixed(2);
    visibiltyDisplay.textContent = convertedVisibility;
    const airPressure = data.list[0].main.pressure;
    airPressureDisplay.textContent = airPressure;
    todayWeatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${imgId}@2x.png`);
    cityInfo.textContent = data.city.name;
}
async function getWeatherData() {
    const weatherInfo = async (location) => {
        location = await location;
        const longitude = await location.coords.longitude;
        const latitude = await location.coords.latitude;
        let data = await fetchData(latitude,longitude);
        let weathericonsArray = await weatherIconsData(data);
        let minTempArray = await MinTempData(data);
        let maxTempArray = await maxTempData(data);
        renderData(data);
        console.log(data);
        celciusBtn.click();
        for (let i = 0; i <= 5; i++) {
            minTemp[i].textContent = minTempArray[i];
            maxTemp[i].textContent = maxTempArray[i];
            futureCastImg[i].setAttribute('src', `http://openweathermap.org/img/wn/${weathericonsArray[i]}@2x.png`);
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
        let data = await fetchData(latitude, longitude);
        let weathericonsArray = await weatherIconsData(data)
        let minTempArray = await MinTempData(data)
        let maxTempArray = await maxTempData(data)
        renderData(data);
        celciusBtn.click()
        console.log(data);
        for (let i = 0; i <= 5; i++) {
            minTemp[i].textContent = minTempArray[i];
            maxTemp[i].textContent = maxTempArray[i];
            futureCastImg[i].setAttribute('src', `http://openweathermap.org/img/wn/${weathericonsArray[i]}@2x.png`);
        }
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
        let data = await fetchData(latitude, longitude);
        let weathericonsArray = await weatherIconsData(data)
        let minTempArray = await MinTempData(data)
        let maxTempArray = await maxTempData(data)
        renderData(data)
        console.log(data);
        celciusBtn.click()
        for (let i = 0; i <= 5; i++) {
            minTemp[i].textContent = minTempArray[i];
            maxTemp[i].textContent = maxTempArray[i];
            futureCastImg[i].setAttribute('src', `http://openweathermap.org/img/wn/${weathericonsArray[i]}@2x.png`);
        }
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
celciusBtn.disabled = true;
celciusBtn.addEventListener('click', () => {
    celciusBtn.disabled = true;
    farenheitBtn.disabled = false;
    const celcius = (+todayTempDisplay.textContent - 32) * 5 / 9;
    todayTempDisplay.textContent = celcius.toFixed(2)
    celciusText.textContent = 'C';
    minTemp.forEach(temp => {
        let celcius = (+temp.textContent - 32) * 5/9;
        temp.textContent = celcius.toFixed(2);
    });
    maxTemp.forEach(temp => {
        let celcius = (+temp.textContent - 32) * 5 / 9;
        temp.textContent = celcius.toFixed(2);
    });
    tempScale.forEach(unit => {
        unit.textContent = 'C';
    });
});
farenheitBtn.addEventListener('click', () => {
    farenheitBtn.disabled = true;
    celciusBtn.disabled = false;
    const farenheit = (+todayTempDisplay.textContent * 9 / 5) + 32;
    todayTempDisplay.textContent = farenheit.toFixed(2)
    celciusText.textContent = 'F'
    minTemp.forEach(temp => {
        let farenheit = (+temp.textContent * 9 / 5) + 32;
        temp.textContent = farenheit.toFixed(2);
    });
    maxTemp.forEach(temp => {
        let farenheit = (+temp.textContent * 9 / 5) + 32;
        temp.textContent = farenheit.toFixed(2);
    });
    tempScale.forEach(unit => {
        unit.textContent = 'F';
    });
});
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