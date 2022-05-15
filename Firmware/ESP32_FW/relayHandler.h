
uint8_t relayState=false;
void setupRelay()
{
    pinMode(12, OUTPUT);
}

void changeRelayState(bool state)
{
    if (state == true)
    {
        digitalWrite(12, HIGH);
        relayState=true;
    }
    else
    {
        digitalWrite(12, LOW);
        relayState=false;
    }
}

uint8_t getRelayState(){
    return relayState;
}