const apiKey = '';

const weatherContainer = document.getElementById('weather-container');
const generateButton = document.getElementById('generate');
const cityText = document.getElementById('weather-city-name');
const temperatureText = document.getElementById('weather-temperature-text')
const weatherStatusText = document.getElementById('weather-status-text')
const windText = document.getElementById('weather-wind-text')
const cloudText = document.getElementById('weather-cloud-text')
const zipCodeText = document.getElementById('zip');
const feelingArea = document.getElementById('feelings');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

generateButton.addEventListener('click', () => {
    generateWeather(apiKey, zipCodeText.value).then(async (result) => {
        if (result?.weather) {
            const { name, main: { temp }, wind: { speed }, weather, clouds: { all: clouds } } = result.weather;
            const status = (weather && weather.length > 0) ? weather[0] : undefined
            const date= result.date;

            cityText.innerHTML = name;
            temperatureText.innerHTML = `${temp} ° C`;
            windText.innerHTML = `Wind: ${speed} m/s`;
            weatherStatusText.innerHTML = (status?.main) ? `${status.main}` : '';
            cloudText.innerHTML = `Clouds: ${clouds} %`;

            weatherContainer.style.backgroundColor = (status?.main === 'Rain' || status?.main === 'Clouds') ? 'darkgray' : '#1D84B5';

            const entryData=await addEntryToServer({temp,date:date.toLocaleString('en-US'),feel:feelingArea.value});
            if(entryData){
                dateDiv.innerHTML += `<span>${entryData.temp}<span>`;
                tempDiv.innerHTML += `<span>${entryData.date}<span>`;
                contentDiv.innerHTML += `<span>${entryData.feel}<span>`;
            }
        }
    });
});

const addEntryToServer = async (data)=>{
    const result=await postData('/add',data);
    return (result)?result:undefined
}

const postData = async (PATH, data = {}) => {
    const response = await fetch(SERVER_ROOT + PATH, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (response && response.status === 200) {
        try {
            const newData = await response.json();
            return newData;
        }
        catch (error) {
            console.log("error", error);
        }
    }
}