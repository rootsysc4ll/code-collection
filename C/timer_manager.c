#include "digital_clock_v2.h"

int main()
{
    char timer_str[TIMER_STR_MAXSIZE];
    FILE* timer_conf_file = fopen("timer_conf.txt", "r");
    fgets(timer_str, TIMER_STR_MAXSIZE - 1, timer_conf_file);
    fclose(timer_conf_file);

    int timer[3] = {0};
    get_timer_elements(timer, timer_str);

    printf("h: %d, min: %d, s: %d\n", timer[hours], timer[mins], timer[secs]);

    printf("Timer done!");
    sleep(5);

    return EXIT_SUCCESS;
}
