# Ets2ToSPILED - Displays Euro Truck Data on an SPI LED with the help of an esp32

###How it works?
I used a node.js libary called "trucksim-telementry" to get the data from Euro Truck Simulator 2, then I host a local server and send the data to it. The esp32 (or microcontroller of choice) then sends a get request to that server and prints the data that it got.

###How to use it
First you have to setup trucksim-telementry. To do so you have to simpy install the scs-sdk-plugin [from here](https://github.com/RenCloud/scs-sdk-plugin/releases/tag/V.1.11)
