/* Global Variables */
const address = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const myUniqueKey = '&appid=2cc801fbda1b87600c1e1a2abd770116&units=metric' //update
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/'+ (d.getMonth() + 1) + '/'+ d.getFullYear(); //update

// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', ()=> {
    const countryZipCode = document.getElementById("zip").value;
    userCondition = document.getElementById("feelings").value
    
// an async function in that uses fetch() to make a GET request to the OpenWeatherMap API.
    const fetchTemperature = async ()=> {
        const weatherResponse = await fetch(address+countryZipCode+myUniqueKey);
        try {
            const receivedInfo = await weatherResponse.json();
            return receivedInfo;
        }
        catch(error) {
            console.log("error", error);
        }
    }

    fetchTemperature().then((input)=> {
        updateInfo('/updateData', {date:newDate, temperature:input.list[0].main.temp, howUserFeel:userCondition});
        updateUiData();
    })
})

// to post data
const updateInfo = async (url = "", input = {}) => {
    const serverResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //body data type must match 'content-type' header
        body: JSON.stringify(input)
    });

    try {
        const received = await serverResponse.json();
        return received;
    }
    catch(error) {
        console.log('error', error)
    }
}

const updateUiData = async () => {
    const serverResponse = await fetch('/routes')
    try {
        const appRoutes = await serverResponse.json();
        document.getElementById('date').innerHTML = `Today is: ${appRoutes.date}`;
        document.getElementById('temp').innerHTML = `temperature is: ${appRoutes.temperature} celcius`

        //the line below can be sent to projectData in the server by passing its data to updateInfo function
        document.getElementById('content').innerHTML = `My condition is: ${appRoutes.howUserFeel}`
    }
    catch(error) {
        console.log("error", error);
    }
}