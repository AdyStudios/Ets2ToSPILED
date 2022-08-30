const fs = require('fs');

const networking = require('./networking');
const receivedDataFile = './received.txt';

const child_proc = require("child_process");
const sub = child_proc.fork("./counter.js");

const tst = require('trucksim-telemetry');
const telemetry = tst();

var receivedDataText;
var display = "";
var currentText = 0;

networking.createServer();
networking.refreshData();

fs.readFile(receivedDataFile, function(err, data){if(err) return console.log(err);receivedDataText = data.toString();printReceivedData(receivedDataText);});
    
sub.on("message", (message) => {
  currentText = message.value;
  console.log(currentText);
});

function printReceivedData(data){
    console.log("the response was: " + data);
}

function formatTime (ms) {
    const hours = Math.floor(ms / 3600000)
    const min   = Math.floor(ms % 3600000 / 60000)
    return `${hours}h ${min}min`
}

function formatRealTIme(ms){
    const hours = Math.floor(ms / 3600000)
    const min   = Math.floor(ms % 3600000 / 60000)
    var tmptime = `${hours}h ${min}min`;
    const eta = parseInt(tmptime) / 19;
    return `${eta}`
}

function doubleDigits(num){
    return  num < 10 ? `0${num}` : num
}

function formatGameTime(ms){
    const date = new Date(ms)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
     return `${days[date.getUTCDay()]} ${doubleDigits(date.getUTCHours())}:${doubleDigits(date.getUTCMinutes())}`
}

function formatDistance(distance){
    return (distance / 1000).toFixed(1).toLocaleString() + 'km';
}

function updateData(data)
{
    var speed = data.truck.speed.kph;
    var paused = data.game.paused;
    var gameTime = data.game.time.unix;
    var jobDestination = data.job.destination.city.name;
    var navDistance = data.navigation.distance;
    var navTime = data.navigation.time;
    
    try{var cargoName = data.job.cargo.name;}
    catch(err){var cargoName = "";}
    var completeData = {
        speed: speed + 'km/h',
        paused: paused,
        gameTime: formatGameTime(gameTime),
        jobDestination: jobDestination,
        navDistance: formatDistance(navDistance),
        navTime: formatTime(navTime),
        cargoName: cargoName
    };
    //console.log(completeData);
    logic(completeData);
}

async function logic(completeData)
{
    if(currentText == 0)    display = completeData.speed;
    else if(currentText == 1)    display = completeData.paused;
    else if(currentText == 2)    display = completeData.gameTime;
    else if(currentText == 3)    display = completeData.jobDestination;
    else if(currentText == 4)    display = completeData.navDistance;
    else if(currentText == 5)    display = completeData.navTime;
    else if(currentText == 6)    display = completeData.cargoName;
    console.log(display);
}

telemetry.game.on('connected', function() {
    console.log('Telementry connected to the game');
});

telemetry.watch({interval: 50}, updateData)