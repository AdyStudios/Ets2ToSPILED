const axios = require('axios');
const http = require('http');

const fs = require('fs');

var receivedData;

function createServer(){
    var server = http.createServer(function(req, res) 
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.readFile('data.txt', function(err, data) {
            res.end(data);
        });
    });
    server.listen(8080);
}

function refreshData(){
    axios
      .get('http://localhost:8080/')
      .then(res => {
        processData(res);
      })
      .catch(error => {
        console.error(error);
    });
}
function processData(res){
    if(res == null){
        return;
    }
    console.log(`statusCode: ${res.status}` + '\nData: ' + res.data);
    receivedData = res.data;
    /*write the recieved data to a file*/
    fs.writeFile('received.txt', receivedData, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}


module.exports= {refreshData, processData, createServer, receivedData};
