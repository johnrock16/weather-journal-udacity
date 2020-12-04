
const express = require('express')
const bodyParser = require('body-parser');
const cors= require('cors');
const fetch=require('node-fetch');
const app = express();
const port = 3000;
const WEATHER_KEY='';
// const WEATHER_API_ROOT=''
let projectData=[];


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
    // methods: "GET"
}
app.use(cors(corsOptions));


app.use(express.static('website'));

app.get('/getWeather', async(req, res) => {
    const {city}=req.query;
    if(city){
        fetch(`http://api.openweathermap.org/data/2.5/weather?`+new URLSearchParams({q: city,appid:WEATHER_KEY,}),{
            method:'GET',
        }).then((resolve)=>{
            if(!resolve){
               return false;
            }
            else if(resolve.status===200){
               return resolve.json()
            }
        }).then((result)=>{
            if(result){
                projectData.push(result)
                res.setHeader('Content-Type', 'application/json');
                res.json({weather:result});
            }
        }).catch((error)=>{
            console.log(error)
        })
        
    }
    // res.sendStatus(500);
    // res.json({
    //     hasErrors:true,
    //     error:'Erro inesperado'
    // })
});


app.post('/getInfo', async(req, res) => {
    res.json({infos:projectData});
})
  
app.listen(port, () => {
    console.log(`Server is running`);
})

// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

// // Require Express to run server and routes

// // Start up an instance of app

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance

// // Initialize the main project folder
// app.use(express.static('website'));


// // Setup Server

// const express = require('express')
// const app = express()
// const port = 3000
