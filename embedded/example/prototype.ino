#include <SPI.h>
#include <RH_RF95.h>

// Define LoRa module pins
#define RFM95_CS 10
#define RFM95_RST 1
#define RFM95_INT -1

#define RF95_FREQ 915.0

RH_RF95 rf95(RFM95_CS, RFM95_INT);

void setup() {
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);

  // Start Serial communication
  Serial.begin(115200);
  while (!Serial); // Wait for Serial Monitor to open

  // Reset LoRa module
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  // Initialize the LoRa module
  if (!rf95.init()) {
    Serial.println("LoRa initialization failed.");
    while (1); // Stay here if initialization fails
  }
  Serial.println("LoRa initialization succeeded.");

  // Set frequency for the LoRa module
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("Frequency set failed.");
    while (1);
  }
  Serial.println("Frequency set to: " + String(RF95_FREQ) + " MHz");

  // Optional: Set the receiver mode (optional for RH_RF95)
  rf95.setModeRx();
  Serial.println("LoRa module is in receive mode.");
}

void loop() {
  // Check if data is available
  if (rf95.available()) {
    Serial.println("Data available!");

    // Buffer to hold received data
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);

    // Read the received data
    if (rf95.recv(buf, &len)) {
      Serial.print("Received message: ");
      Serial.write(buf, len); // Print the message as raw data
      Serial.println();

      // Optional: Print RSSI (signal strength)
      Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi());
    } else {
      Serial.println("Receive failed.");
    }
    }

  delay(100); // Delay to avoid flooding the Serial Monitor
}
