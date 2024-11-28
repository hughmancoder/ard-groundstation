#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include "Telemetry.hpp"

// Initialize the I2C LCD with the address 0x27 and 16x2 display size
LiquidCrystal_I2C lcd(0x27, 16, 2);

// const int ledPin = 2;
// bool ledState = false; // Variable to store the current state of the LED

void setup() {
  Serial.begin(115200); // Initialize serial communication
  // pinMode(ledPin, OUTPUT);

  lcd.init();
  lcd.backlight();

  // Display a startup message on the LCD
  lcd.setCursor(0, 0);
  lcd.print("Telemetry Ready");
  delay(2000);
  lcd.clear();
}

void loop() {
  static unsigned int index = 0; // Track the current data index

  // Display the current telemetry data on the LCD
  lcd.setCursor(0, 0);
  lcd.print("Simulation data");
  lcd.setCursor(0, 1);
  lcd.print("Sample : ");
  lcd.print(sampleData[index].time);

  printTelemetryAsCSV(sampleData[index]);
  
  index++;
  if (index >= sizeof(sampleData) / sizeof(sampleData[0])) {
    index = 0; 
  }

  delay(1000); 
}