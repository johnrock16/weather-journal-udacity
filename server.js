
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
let projectData = [];


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    // methods: "GET"
}
app.use(cors(corsOptions));


app.use(express.static('website'));

app.get('/getWeather', async (req, res) => {
    const { city, WEATHER_KEY } = req.query;
    if (city) {
        const resolve = await fetch(`http://api.openweathermap.org/data/2.5/weather?${WEATHER_KEY}&` + new URLSearchParams({ q: city }), {
            method: 'GET',
        });
        if (!resolve) {
            return false;
        }
        else if (resolve.status === 200) {
            try {
                const result = await resolve.json();
                if (result) {
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ weather: result });
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    // res.sendStatus(500);
    // res.json({
    //     hasErrors:true,
    //     error:'Erro inesperado'
    // })
});


app.post('/add', (req, res) => {
    const { temp, feel, date } = req.body;;
    projectData = { temp, feel, date }
    console.log(projectData);
    res.json(projectData);
});

app.listen(port, () => {
    console.log(`Server is running`);
});