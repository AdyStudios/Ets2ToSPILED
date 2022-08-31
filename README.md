# Ets2ToSPILED - Displays Euro Truck Data on an SPI LED with the help of an esp32

### How it works?
I used a node.js libary called "trucksim-telementry" to get the data from Euro Truck Simulator 2, then I host a local server and send the data to it. The esp32 (or microcontroller of choice) then sends a get request to that server and prints the data that it got.

## How to use it
First you have to setup trucksim-telementry. To do so you have to simpy install the scs-sdk-plugin [from here](https://github.com/RenCloud/scs-sdk-plugin/releases/tag/V.1.11), and then drop the file into [euro truck installation folder]Euro Truck Simulator 2\bin\win_x64\plugins\bin\win_x64\plugins\

After that open the project in a command line, (or powershell or code editor) and run ```npm install```. This will install all required packages.
Then you will have to go and edit the main.ino file. Replace the wifi SSID and password, then change the server adress, to your local ip. 
You will also have to install the following packages: HTTPClient, MD_PAROLA, MD_MX72XX, SPI. Flash the main.ino with the Arduino app onto your esp32 or other microcontroller. 

### How to connect the display

[Wiring image](https://microcontrollerslab.com/wp-content/uploads/2022/01/ESP32-with-MAX7219-led-matrix.jpg)
If you don't have a Vin pin your esp32 then you will have to use the 3V3 pin for VCC.

VCC - VIN/3V3
GND - GND
DIN - GPIO 23
CS - GPIO 5
CLK - GPIO 18

If you have any questions contatct me on discord: AdyEndre#7784 or create and issue.

### Notes
If you have or less display modules change the #DEFINE MAX_DEVICES: to your number of modules.
