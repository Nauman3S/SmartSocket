
#include <SoftwareSerial.h>

SoftwareSerial mySerial(6, 5); // RX, TX

void setup(void)
{
    mySerial.begin(115200);

    // Timer1 module configuration
    TCCR1A = 0;
    TCCR1B = 2; // enable Timer1 module with 1/8 prescaler ( 2 ticks every 1 us)
    TCNT1 = 0;  // Set Timer1 preload value to 0 (reset)
    TIMSK1 = 1; // enable Timer1 overflow interrupt

    EIFR |= 1;                               // clear INT0 flag
    attachInterrupt(0, timer1_get, FALLING); // enable external interrupt (INT0)
}

uint16_t tmr1 = 0;
float period, frequency;

void timer1_get()
{
    tmr1 = TCNT1;
    TCNT1 = 0; // reset Timer1
}

ISR(TIMER1_OVF_vect)
{ // Timer1 interrupt service routine (ISR)
    tmr1 = 0;
}

// main loop
String data = ""; //freq in hz, period in ms
void loop()
{

    // save current Timer1 value
    uint16_t value = tmr1;
    // calculate signal period in milliseconds
    // 8.0 is Timer1 prescaler and 16000 = MCU_CLK/1000
    period = 8.0 * value / 16000;
    // calculate signal frequency which is = 1/period ; or = MCU_CLK/(Prescaler * Timer_Value)
    if (value == 0)
    {
        frequency = 0; // aviod division by zero
    }
    else
    {
        frequency = 16000000.0 / (8UL * value);
    }
    data = String(frequency) + String(",") + String(period);
    mySerial.println(data);

    delay(500);
}

// end of code.