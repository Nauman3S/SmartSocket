uint8_t dataAvailable = 0;
String incmommingData = "";
void setupCommunicationHandler()
{
    Serial.begin(115200);
}

void sendData(String d)
{
    String v = String("*") + d + String("^");
    Serial.println(v);
}

uint8_t isDataAvailable()
{
    return dataAvailable;
}

void loopCommunicationHandler()
{
    if (Serial.available())
    {
        incmommingData = Serial.readString();
        dataAvailable=1;
    }
}
String readData(){
    dataAvailable=0;
    String d=incmommingData;
    incmommingData="";
    return d;
}