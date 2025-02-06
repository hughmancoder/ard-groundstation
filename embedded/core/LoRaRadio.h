#ifndef LoRaRadio_h
#define LoRaRadio_h

#include <SPI.h>
#include <RH_RF95.h>

// #define LED 13

class LoRaRadio {
  private:
    RH_RF95 rf95;
    uint8_t RFM95_RST;
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN]; // Max 60 bytes
    bool serial;
    uint32_t Baud_Rate;

  public:
    LoRaRadio(uint8_t rst_Pin, uint8_t cs_pin, uint8_t int_pin, uint32_t baud_rate) 
      : rf95(cs_pin, int_pin), RFM95_RST(rst_Pin), Baud_Rate(baud_rate) {}

    void begin(float freq, uint8_t tx_power, bool serial) {
      pinMode(RFM95_RST, OUTPUT);
      digitalWrite(RFM95_RST, HIGH);
      delay(100);
      SPI.begin();
      SPI.setSCK(13);  // Set SCK pin to pin 2
      delay(100);
      if (serial) {
        Serial.begin(Baud_Rate);
        while (!Serial); // Wait for serial port to connect
        Serial.println("LoRa Test!");
      }
      digitalWrite(RFM95_RST, LOW);
      delay(10);
      digitalWrite(RFM95_RST, HIGH);
      delay(10);
      if (!rf95.init()) {
        if (serial) Serial.println("LoRa init failed");
        while (1);
      }
      if (!rf95.setFrequency(freq)) {
        if (serial) Serial.println("SetFrequency failed");
        while (1);
      }
      if (serial) Serial.println("LoRa initialized");
      rf95.setTxPower(tx_power, false);
    }

    void send(const uint8_t* data, uint8_t len) {
      rf95.send(data, len);
      rf95.waitPacketSent();
    }

    bool receiveData(uint8_t* data, uint8_t* len) {
      if (rf95.available()) {
        Serial.println("rf95");
        *len = sizeof(buf);
        if (rf95.recv(buf, len)) {
          memcpy(data, buf, *len); // Ensure `len` is not larger than `sizeof(buf)`
          return true;
        }
      }
      return false;
    }

    bool receiveRSSI(int* rssi) {
      *rssi = rf95.lastRssi();
      return true;
    }
};

#endif
