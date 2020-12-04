const SERVER_ROOT='http://localhost:3000';

const generateWeather=(city)=>{
    const date = new Date();
    // const date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return fetch(`${SERVER_ROOT}/getWeather?`+new URLSearchParams({city}),{
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