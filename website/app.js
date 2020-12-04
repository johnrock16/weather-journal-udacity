const weatherContainer=document.getElementById('weather-container');
const generateButton= document.getElementById('generate');
const cityText= document.getElementById('weather-city-name');
const temperatureText = document.getElementById('weather-temperature-text')
const weatherStatusText = document.getElementById('weather-status-text')
const windText = document.getElementById('weather-wind-text')
const cloudText = document.getElementById('weather-cloud-text')
const zipCodeText = document.getElementById('zip');
const feelingArea = document.getElementById('feelings');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');



generateButton.addEventListener('click',()=>{
    generateWeather(zipCodeText.value).then((result)=>{
    if(result?.weather){
        const {name, main:{temp},wind:{speed},weather,clouds:{all:clouds}} = result.weather;
        const status=(weather &&  weather.length>0)?weather[0]:undefined
        
        cityText.innerHTML=name;
        temperatureText.innerHTML=convertKelvinToCelsius(temp,true);
        windText.innerHTML=`Wind: ${speed} m/s`;
        weatherStatusText.innerHTML=(status?.main)?`${status.main}`:'';
        cloudText.innerHTML=`Clouds: ${clouds} %`;
        dateDiv.innerHTML+=`<span>${result.date.toLocaleString('en-US')}<span>`;
        tempDiv.innerHTML+=`<span>${convertKelvinToCelsius(temp,true)}<span>`;
        contentDiv.innerHTML+=`<span>${feelingArea.value}<span>`;

        weatherContainer.style.backgroundColor=(status?.main==='Rain' || status?.main==='Clouds')? 'darkgray' : '#1D84B5';
    }
    })
})