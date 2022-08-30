const networking = require('./networking');
console.log("network refresh started");

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

networking.refreshData();

async function loop(){
    await sleep(50);
    networking.refreshData();
    loop();
}

loop();