#include "headers.h"   //all misc. headers and functions
#include "MQTTFuncs.h" //MQTT related functions

#include "webApp.h" //Captive Portal webpages
#include <FS.h>     //ESP32 File System

#include "communicationHandler.h"
#include "GPRS.h"
// 45,20;25/01/2022 09:52:10;12.2,13.765
IPAddress ipV(192, 168, 4, 1);
String loadParams(AutoConnectAux &aux, PageArgument &args) //function to load saved settings
{
    (void)(args);
    File param = FlashFS.open(PARAM_FILE, "r");
    String v1 = "";
    String v2 = "";
    if (param)
    {
        Serial.println("load params func");
        aux.loadElement(param);

        // curSValueElm.value="CurS:7788";
        param.close();
    }
    else
        Serial.println(PARAM_FILE " open failed");
    return String("");
}

String saveParams(AutoConnectAux &aux, PageArgument &args) //save the settings
{
    serverName = args.arg("mqttserver"); //broker
    serverName.trim();

    channelId = args.arg("channelid");
    channelId.trim();

    userKey = args.arg("userkey"); //user name
    userKey.trim();

    apiKey = args.arg("apikey"); //password
    apiKey.trim();

    apPass = args.arg("apPass"); //ap pass
    apPass.trim();

    settingsPass = args.arg("settingsPass"); //ap pass
    settingsPass.trim();

    hostName = args.arg("hostname");
    hostName.trim();

    networkType = args.arg("networkType");
    networkType.trim();

    apn = args.arg("apn");
    apn.trim();

    apnUser = args.arg("apnUser");
    apnUser.trim();

    apnPass = args.arg("apnPass");
    apnPass.trim();
    // The entered value is owned by AutoConnectAux of /mqtt_setting.
    // To retrieve the elements of /mqtt_setting, it is necessary to get
    // the AutoConnectAux object of /mqtt_setting.
    File param = FlashFS.open(PARAM_FILE, "w");
    portal.aux("/mqtt_setting")->saveElement(param, {"mqttserver", "channelid", "userkey", "apikey", "hostname", "apPass", "apnUser", "apnPass", "apn", "networkType", "settingsPass"});
    param.close();

    // Echo back saved parameters to AutoConnectAux page.
    AutoConnectText &echo = aux["parameters"].as<AutoConnectText>();
    echo.value = "Server: " + serverName + "<br>";
    echo.value += "Channel ID: " + channelId + "<br>";
    echo.value += "Username: " + userKey + "<br>";
    echo.value += "Password: " + apiKey + "<br>";
    echo.value += "APN: " + apn + "<br>";
    echo.value += "APN Username: " + apnUser + "<br>";
    echo.value += "APN Password: " + apnPass + "<br>";
    echo.value += "Network Type: " + networkType + "<br>";
    echo.value += "ESP host name: " + hostName + "<br>";
    echo.value += "AP Password: " + apPass + "<br>";
    echo.value += "Settings Page Password: " + settingsPass + "<br>";
    mqttPublish("SmartEFM/config", String("Something"));

    return String("");
}
bool loadAux(const String auxName) //load defaults from data/*.json
{
    bool rc = false;
    Serial.println("load aux func");
    String fn = auxName + ".json";
    File fs = FlashFS.open(fn.c_str(), "r");
    if (fs)
    {
        rc = portal.load(fs);
        fs.close();
    }
    else
        Serial.println("Filesystem open failed: " + fn);
    return rc;
}
uint8_t inAP = 0;

bool whileCP()
{
    loopCommunicationHandler();
    if (networkType == "GPRS")
    {
        loopGPRS();
    }
    if (millis() - lastPub > updateInterval) //publish data to mqtt server
    {
        // sendData(getDHT22SensorValue());

        ledState(ACTIVE_MODE);

        lastPub = millis();
    }

    if (inAP == 0)
    {

        ledState(AP_MODE);
        inAP = 1;
    }
}

void setup() //main setup functions
{
    setupCommunicationHandler();

    delay(1000);

    Serial.print("Device ID: ");
    Serial.println(ss.getMacAddress());

    if (!MDNS.begin("esp32")) //starting mdns so that user can access webpage using url `esp32.local`(will not work on all devices)
    {
        Serial.println("Error setting up MDNS responder!");
        while (1)
        {
            delay(1000);
        }
    }
#if defined(ARDUINO_ARCH_ESP8266)
    FlashFS.begin();
#elif defined(ARDUINO_ARCH_ESP32)
    FlashFS.begin(true);
#endif
    loadAux(AUX_MQTTSETTING);
    loadAux(AUX_MQTTSAVE);
    AutoConnectAux *setting = portal.aux(AUX_MQTTSETTING);
    if (setting) //get all the settings parameters from setting page on esp32 boot
    {
        Serial.println("Setting loaded");
        PageArgument args;
        AutoConnectAux &mqtt_setting = *setting;
        loadParams(mqtt_setting, args);
        AutoConnectInput &hostnameElm = mqtt_setting["hostname"].as<AutoConnectInput>();
        AutoConnectInput &apPassElm = mqtt_setting["apPass"].as<AutoConnectInput>();
        AutoConnectInput &serverNameElm = mqtt_setting["mqttserver"].as<AutoConnectInput>();
        AutoConnectInput &channelidElm = mqtt_setting["channelid"].as<AutoConnectInput>();
        AutoConnectInput &userkeyElm = mqtt_setting["userkey"].as<AutoConnectInput>();
        AutoConnectInput &apikeyElm = mqtt_setting["apikey"].as<AutoConnectInput>();
        AutoConnectInput &settingsPassElm = mqtt_setting["settingsPass"].as<AutoConnectInput>();

        AutoConnectInput &apnElm = mqtt_setting["apn"].as<AutoConnectInput>();
        AutoConnectInput &apnUserElm = mqtt_setting["apnUser"].as<AutoConnectInput>();
        AutoConnectInput &apnPassElm = mqtt_setting["apnPass"].as<AutoConnectInput>();
        AutoConnectRadio &networkTypeElm = mqtt_setting["networkType"].as<AutoConnectRadio>();

        //vibSValueElm.value="VibS:11";
        serverName = String(serverNameElm.value);
        channelId = String(channelidElm.value);
        userKey = String(userkeyElm.value);
        apiKey = String(apikeyElm.value);
        hostName = String(hostnameElm.value);
        apPass = String(apPassElm.value);
        settingsPass = String(settingsPassElm.value);
        apnUser = String(apnUserElm.value);
        apnPass = String(apnPassElm.value);
        apn = String(apnElm.value);
        networkType = String(networkTypeElm.value());

        if (hostnameElm.value.length())
        {
            //hostName=hostName+ String("-") + String(GET_CHIPID(), HEX);
            //;
            //portal.config(hostName.c_str(), apPass.c_str());
            // portal.config(hostName.c_str(), "123456789AP");
            config.apid = hostName + "-" + String(GET_CHIPID(), HEX);
            config.password = apPass;
            config.psk = apPass;
            // portal.config(hostName.c_str(), "123456789AP");
            Serial.println("(from hostELM) hostname set to " + hostName);
        }
        else
        {

            // hostName = String("OEE");;
            // portal.config(hostName.c_str(), "123456789AP");
            config.apid = hostName + "-" + String(GET_CHIPID(), HEX);
            config.password = apPass;
            config.psk = apPass;
            //config.hostName = hostName;//hostnameElm.value+ "-" + String(GET_CHIPID(), HEX);
            // portal.config(hostName.c_str(), "123456789AP");
            Serial.println("hostname set to " + hostName);
        }
        config.homeUri = "/_ac";
        config.apip = ipV;

        portal.on(AUX_MQTTSETTING, loadParams);
        portal.on(AUX_MQTTSAVE, saveParams);
    }
    else
    {
        Serial.println("aux. load error");
    }
    //config.homeUri = "/_ac";
    config.apip = ipV;
    config.autoReconnect = true;
    config.reconnectInterval = 1;
    Serial.print("AP: ");
    Serial.println(hostName);
    Serial.print("Password: ");
    Serial.println(apPass);
    config.title = "Smart EFM"; //set title of webapp
    Serial.print("Device Hostname: ");
    Serial.println(hostName);
    //add different tabs on homepage

    //  portal.disableMenu(AC_MENUITEM_DISCONNECT);
    server.on("/", handleRoot);
    // Starts user web site included the AutoConnect portal.

    config.auth = AC_AUTH_DIGEST;
    config.authScope = AC_AUTHSCOPE_PARTIAL;
    config.username = hostName;
    config.password = settingsPass;

    portal.config(config);
    portal.whileCaptivePortal(whileCP);
    portal.onDetect(atDetect);
    portal.load(FPSTR(PAGE_AUTH));
    if (portal.begin())
    {
        Serial.println("Started, IP:" + WiFi.localIP().toString());
        ledState(AP_MODE);
    }
    else
    {
        Serial.println("Connection failed.");
        while (true)
        {
            yield();
            delay(100);
        }
    }
    setupRTC();
    if (networkType == "GPRS")
    {
        setupGPRS();
    }
    else
    {
    }

    MDNS.addService("http", "tcp", 80);
    mqttConnectWiFi(); //start mqtt
}

int k = 0;
String tempVal = "";
void loop()
{
    server.handleClient();
    portal.handleRequest();
    loopCommunicationHandler();

    if (millis() - lastPub > updateInterval) //publish data to mqtt server
    {
        if (isDataAvailable())
        {

            String datastamp = readData() + String(";") + getTimestamp()+String(";")+getGPSData();
            mqttPublish("SmartEFM/data", datastamp);
        }

        ledState(ACTIVE_MODE);

        lastPub = millis();
    }
    if (!mqttClient.connected())
    {
        reconnect();
    }
    mqttClient.loop();
    if (WiFi.status() == WL_IDLE_STATUS)
    {
        ledState(IDLE_MODE);
        ESP.restart();

        delay(1000);
    }
}