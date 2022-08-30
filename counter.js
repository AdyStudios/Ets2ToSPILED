var currentText = 0;

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waiter(ms){
    process.send({ value: currentText });
    while (true)
    {
        await sleep(ms);
        currentText +=1;
        if(currentText == 7){
            currentText = 0;
        }
        process.send({ value: currentText });
    }
    
}
waiter(5000);