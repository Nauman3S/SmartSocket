
#include "GPRS.h"
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>
#include <string>
#include <ArduinoJson.h>
#include <WiFi.h>
DynamicJsonDocument doc(2024);
String myMac = "";
String status = "NULL";

#include <PubSubClient.h>
#include "SoftwareStack.h"
#ifndef BUILTIN_LED
#define BUILTIN_LED 2 // backward compatibility
#endif
#include "statusLED.h"
#include "neoTimer.h"
#define GET_CHIPID() ((uint16_t)(ESP.getEfuseMac() >> 32))

SoftwareStack ss; //SS instance

String mac = (WiFi.macAddress());
char __mac[sizeof(mac)];

const char *mqtt_server = "broker.hivemq.com";
//IPAddress mqttBroker(34,214,65,82);
const int mqtt_port = 1883;
const char *mqtt_user = "testUser";
const char *mqtt_pass = "testUser@123";
const char *mqtt_client_name = __mac; //"12312312312332212";// any random alphanumeric stirng
//////////////////////////////
#define BUFFER_SIZE 250
String incoming = "";
String incomingTopic = "";

String connectionMode = "GPRS";
