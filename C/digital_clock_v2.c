#include "digital_clock_v2.h"

int main()
{
    clear_screen();
    printf("\nWelcome to the digital clock!\n");
    printf("\"time\"           - Displays the current time\n");
    printf("\"timer XX:YY:ZZ\" - Take the limit for the timer with the format as show and starts it\n");
    printf("\"exit\"           - closes the digital clock\n");
    printf("If you want to stop a timer, just close the window associated with it\n");

    int exit_result = start();
    
    return exit_result; 
}
