#include "LoRaRadio.h"
#include "Telemetry.hpp"
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);

#define RFM95_RST 1  // Reset pin
#define RFM95_CS 10   // Chip Select (NSS) pin
#define RFM95_INT 2  // Interrupt pin (connected to DIO0). Set to -1 if unused
#define RF95_FREQ 916.0  // Frequency for LoRa communication
#define BAUD_RATE 115200  // Baud rate for Serial communication

// The RFM95W has a maximum range of 15 kilometers
LoRaRadio radio(RFM95_RST, RFM95_CS,  RFM95_INT, BAUD_RATE);

int samples = 0; 

void setup()
{

    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("Initializing...");
    delay(500);

    Serial.begin(BAUD_RATE);

    lcd.setCursor(0, 0);
    lcd.print("Awaiting Radio");
    delay(500);

    // Note: The LoRa radio is initialized with a frequency of 916.0 MHz and a transmitter power of 23 dBm (maximum allowable limit)
    radio.begin(RF95_FREQ, 23, false); 

    lcd.setCursor(0, 0);
    Serial.println("LoRa Radio Ready");
    delay(500);
}

void displayData(const char *data, int rssi, int sampleCount) {
    lcd.setCursor(0, 0);
    lcd.print("Data: ");
    lcd.print(data);
    lcd.setCursor(0, 1);
    lcd.print("RSSI: ");
    lcd.print(rssi);
    lcd.setCursor(10, 1);
    lcd.print("S: ");
    lcd.print(sampleCount);
}

void loop()
{
    uint8_t data[256];
    uint8_t len;
    int rssi;
    if (radio.receiveData(data, &len))
    {
        data[len] = '\0';  // Null-terminate the data

        if (radio.receiveRSSI(&rssi))
        {
            displayData((char *)data, rssi, samples);
        } 
        else
        {
            displayData((char *)data, 0, samples);
        }
        
        // printTelemetryAsCSV(data);

        Send serial data
        Serial.print(samples);  
        Serial.print(",");
        Serial.println((char *)data);  

        samples++;             
    }
}
