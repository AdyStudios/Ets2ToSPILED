const fs = require('fs');

const networking = require('./networking');
const receivedDataFile = './received.txt';
const outputFile = './data.json';

const tst = require('trucksim-telemetry');
const telemetry = tst();

var receivedDataText;
var logicRunning = false;
var currentText = 0;

networking.createServer();
networking.refreshData();

fs.readFile(receivedDataFile, function(err, data){if(err) return console.log(err);receivedDataText = data.toString();printReceivedData(receivedDataText);});
    
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
    logic(completeData, 5000);
}

async function logic(completeData, waitTime){
    var dummy = "";
    if(currentText == 0){
        dummy = completeData.speed;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 1){
        dummy = completeData.paused;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 2){
        dummy = completeData.gameTime;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 3){
        dummy = completeData.jobDestination;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 4){
        dummy = completeData.navDistance;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 5){
        dummy = completeData.navTime;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 6){
        dummy = completeData.cargoName;
        console.log(dummy);
        await sleep(waitTime);
        currentText += 1;
    }
    if(currentText == 7){
        currentText == 0;
    }
}

telemetry.game.on('connected', function() {
    console.log('Telementry connected to the game');
});

telemetry.watch({interval: 50}, updateData)