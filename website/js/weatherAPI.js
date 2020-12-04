const SERVER_ROOT='http://localhost:3000';

const generateWeather=(WEATHER_KEY,city)=>{
    const date = new Date();
    return fetch(`${SERVER_ROOT}/getWeather?`+new URLSearchParams({city,WEATHER_KEY}),{
        method:"GET",
        headers:{
            "content-type":"application/json",
        },
    }).then((resolve)=>{
        return resolve.json();
    }).then((result)=>{
        return {date,...result}
    }).catch((error)=>{
        console.log(error)
    });
}

const convertKelvinToCelsius=(kelvin,formated=false)=>{
    return formated?`${Math.round(kelvin-273.15)} ° C`:Math.round(kelvin-273.15);
}