<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="artwork/smartsocket.png" alt="Project logo"></a>
</p>

<h3 align="center">SmartSocket</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center"> SmartSocket
    <br> 
</p>

# 📝 Table of Contents

- [About](#about)
- [Smart Socket](#sfms)
  - [Getting Started](#getting_started)
  - [Circuit](#circuit)
  - [WebApp](#webapp)
  - [Usage](#usage)
  - [List Of Components](#list)
  - [Built Using](#built_using)
  - [Authors](#authors)


# 📜 About <a name = "about"></a>

This repo contains

- Backend
- Firmware
- Detailed instructions

<br><br>

#   Smart Socket<a name = "sfms"></a>
## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your system.

### Prerequisites

Things you need to install the FW.

```
- Arduino IDE
```

### Installing <a name = "installing"></a>

A step by step series that tell you how to get the Firmware and Backend running

#### ESP32 Configuration(Frequency Counter)

You should have Arduino IDE Installed

1.  Add ESP32 Board to your Arduino IDE
2.  In your Arduino IDE, go to File> Preferences
    Installing ESP32 Add-on in Arduino IDE Windows, Mac OS X, Linux open preferences
3.  Enter `https://dl.espressif.com/dl/package_esp32_index.json`
    into the “Additional Board Manager URLs” field then, click the “OK” button:
    Note: if you already have the ESP32 boards URL, you can separate the URLs with a comma(each board will go to neaw line) as follows:
    `https://dl.espressif.com/dl/package_esp32_index.json,\n http://arduino.esp8266.com/stable/package_esp8266com_index.json`

4.  Open the Boards Manager. Go to Tools > Board > Boards Manager…
5.  Search for ESP32 and press install button for the ESP32 by Espressif Systems“:
6.  That’s it. It should be installed after a few seconds.
7.  In your Arduino sketchbook directory, create tools directory if it doesn't exist yet.
8.  Unpack the tool into tools directory(present in libs/ESP32FS-1.0.zip) (the path will look like <home_dir>/Arduino/tools/ESP32FS/tool/esp32fs.jar).
9.  Close and re-open the Arduino IDE.

10. Now copy the contents of the libs folder to the libraries directory of your Arduino
    1. If you are using windows, the libraries directory will be Documents/Arduino/libraries

##### ESP32 Node FW Uploading

1.  Select ESP32 Dev Module from Tools->Board->ESP32
2.  Select the correct port from Tools->Port
3.  Then open FSP32_FW.ino file from Firmware/FreqMonitor/ESP32_FW folder.
4.  Select Tools > ESP32 Sketch Data Upload menu item. This should start uploading the files into ESP32 flash file system.
5.  Now Upload the Code to your ESP32 Dev Module.
6.  Your ESP32 is now ready to be used.

##  🔌Circuit <a name = "circuit"></a>

### ESP32 LILYGO®TTGO T-PCIE Module Pinout

Follow the pinout diagram given below to connect different components to your ESP32 LILYGO®TTGO T-PCIE Module board.

![Pinout](Circuit/esp32pinout.jpg)


### Complete Circuit Diagram

Here's the complete circuit diagram of the system.

![CircuitDiagram](Circuit/Circuit_bb.png)

### PCB

![PCBEFM](PCB/SmartEFM/pcb2d.png)
![PCBEFM3d](PCB/SmartEFM/pcb3d.png)

### Casing

![CAEFM](Casing/SmartEFM_BS_Box.png)
![CAEFMTOP](Casing/smartEFM_TC.png)
### Other Components

```http
Other components pin connection details
```

#### Smart Socket Circuit

```Different Components connected to Arduino Pro Mini for Frequency Measurements```

#### ESP32 LILYGO®TTGO T-PCIE Connections

```Arduino Pro Mini Connected with ESP32```

| Relay | ESP32 |
| :---------- | :---- |
| `CH1`   | `12` |
| `DC+`   | `5V` |
| `DC-`   | `GND` |

*   CH1 pin is connected via Logic Level Shifter

#### LED

```LED Connected with ESP32```

| LED Pins | ESP32 |
| :---------- | :---- |
| `Pin 1(Long Pin)`   | `36` |
| `Pin 2`   | `GND` |



## 💻WebApp <a name = "webapp"></a>


WebApp can be accessed from the link below

**TO BE ADDED**

### Data
Data published from the device would be in the JSON format given below:

```json
{
  "macAddress": "",
  "Name": "",
  "Address": "",
  "RSSI": ""
}
```

### MQTT Topics

```MQTT Topic Details```
*   As seen from ESP32

| Topic | Type | Details
| :---------- | :---- |  :---- |
| `SmartSocket/device/data`   | `PUBLISH` |  `Publishes the socket state string` | 

### FrontEnd

-   The WebApp is developed using NodeJS, ReactJS and MongoDB.

**TO BE ADDED**


<!-- -   Link: [Complete Dashboard]()
    *   user: admin@smartsocket.com
    *   pass: admin -->

<!-- ![dashboard21](artwork/db4.png) Dashboard Home Page

![dashboard23](artwork/db3.png) Settings Page

![dashboard18](artwork/db7.png) Map Page Additional Information Marker

![dashboard24](artwork/db5.png) Sign-in Page

![dashboard25](artwork/db6.png) Sign-up Page -->

### Database

You can access the database from the link below

**TO BE ADDED**
<!-- 
*   http://smartsocket-data-preview.production.rehanshakir.com/
    *   User: admin
    *   Password: admin

![dashboard115](artwork/db.png) Database -->

## Usage <a name = "usage"></a>

1.  [Upload the code to your Arduino Pro Mini](https://github.com/Nauman3S/SmartSocket#arduino-pro-mini-configuration)
2.  [Upload the code to your ESP32](https://github.com/Nauman3S/SmartSocket#esp32-configurationfrequency-counter)
3.  [Make the circuit](https://github.com/Nauman3S/SmartSocket#complete-circuit-diagram)
4.  Power on your ESP32, it will present you with an AP named `SmartEFM-abcd` (while `SmartEFM` can be changed in the portal and `abcd` is a unique id for each esp32) 
5.  Default captive portal password `123456789AP` which can be changed in captive portal. 
6.  Connect to the ESP32 access point and open the web-browser and navigate to the link `http://esp32.local/_ac`. This link will work on most of the operating systems but if your operating system is not allowing to open it, you may want to check the captive portal IP Address from the serial monitor and can use that IP address inplace of the above mentioned URL. 
7.  The default access IP Address is `http://192.168.4.1/_ac` 
8.  You will be presented with a main dashboard as shown below(based on your device)
![SCR1](artwork/scr1.png)
    * You can also open `http://esp32.local/` to access the CaptivePortal.
![SCR1](artwork/scr2.png)
9. You can connect to WiFi, from "Connect to WiFi" menu
![SCR1](artwork/scr4.png)
10. Once connected to a WiFi network, you can again access the captive portal using same URL or the IP Address from the Serial monitor.
11. You can open settings page with following default credentials
   1.  User: **AP Name (SmartEFM)**
   2.  Password: **admin**

In settings page, you can configure your device. You can set network type (WiFi/GPRS) and you can set network APN details as well.
![SCR1](artwork/scr3.png)

13. Open the [test dashboard](https://nodered-proxy.production.wrapdrive.tech/ui/#!/2) to see the live data

<br><br>

### PCB

**TO BE ADDED**

<!-- ![PCBBS](PCB/SmartBluetoothScanner/pcb2d.png)
![PCBEFM3d](PCB/SmartBluetoothScanner/pcb3d.png) -->

### Casing

![CAEFM](Casing/SmartEFM_BS_Box.png)



<br><br>
# List of Components <a name = "list"></a>

Following components are used to make this project

1.   Microcontrollers
     *   ESP32 with SIM800L
    https://de.aliexpress.com/item/4001142716386.html?gatewayAdapt=glo2deu

2.  Power Circuit
    *   AC to 5V DC Converter
    https://www.amazon.com/Converter-Universal-Isolated-Switching-Version/dp/B07SGQ6XXR/ref=sr_1_1?crid=12JGAW640YK25&keywords=ac+to+dc+module&qid=1642413883&sprefix=ac+to+dc+modu%2Caps%2C303&sr=8-1
3.  Misc
    *   5mm LED Light
    https://www.amazon.com/MCIGICM-Circuit-Assorted-Science-Experiment/dp/B07PG84V17/ref=sr_1_2?crid=2EJHAQUUNKS16&keywords=led+5mm&qid=1642414000&sprefix=led+5%2Caps%2C336&sr=8-2

    *   Bi-directional logic level shifter
    https://www.amazon.com/DZS-Elec-Converter-Bi-Directional-Communication/dp/B07J67MTKV/ref=sr_1_10?keywords=logic+level+converter+bi-directional&qid=1642477438&sprefix=bi-directional+level%2Caps%2C417&sr=8-10
    
    *   Solid State Relay
    https://www.amazon.com/DollaTek-1-Channel-Level-Trigger-Module/dp/B07DK29FR6/ref=sr_1_12?crid=3AY7SEMFWEWVT&keywords=ssr+relay+module&qid=1651029377&sprefix=ss+relay+module%2Caps%2C174&sr=8-12
# ⛏️ Built Using <a name = "built_using"></a>


- [Arduino](https://www.arduino.cc/) - Embedded Framework and IDE - For Sensor Node Design


# ✍️ Authors <a name = "authors"></a>

- [@Nauman3S](https://github.com/Nauman3S) - Development and Deployment
