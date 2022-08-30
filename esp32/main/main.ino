#include <WiFi.h>
#include <HTTPClient.h>
#include <MD_Parola.h>
#include <MD_MAX72xx.h>
#include <SPI.h>

#define HARDWARE_TYPE MD_MAX72XX::FC16_HW
#define MAX_DEVICES 8
#define CS_PIN 5

MD_Parola Display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);
  
const char* ssid = "Telekom-7Y7P2q";
const char* password = "5643146221867551";

String displayText;
  
void setup() {
  
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
  Display.begin();
  Display.setIntensity(15);
  Display.displayClear();
}
  
void loop() {
  
  if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
  
    HTTPClient http;
  
    http.begin("http://192.168.1.9:8080/"); //Specify the URL
    int httpCode = http.GET();                                        //Make the request
  
    if (httpCode > 0) { //Check for the returning code
  
        String payload = http.getString();
        Serial.println(payload);
        displayText = payload;
      }
  
    else {
      Serial.println("Error on HTTP request");
      Serial.println(httpCode);
    }
  
    http.end(); //Free the resources
  }

  Display.setTextAlignment(PA_CENTER);
  Display.print(displayText);
  delay(50);
  
}
