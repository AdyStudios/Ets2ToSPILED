const networking = require('./networking');

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

networking.createServer();
networking.refreshData();

async function loop(){
    await sleep(50);
    networking.refreshData();
    loop();
}


loop();