#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdlib.h>
#include <errno.h>
#include <wait.h>
#include <string.h>
#include <signal.h>
#include <stdbool.h>
#include <time.h>
#include <sys/stat.h>

enum timer_elements{hours, mins, secs};

#define MAX_INPUTSIZE 16 // timer XX:YY:ZZ + ('\n' -> '\0)
#define TIMER_STR_MAXSIZE 9 // XX:YY:ZZ + '\0'

#define EXIT_FORMAT_ERROR 2
#define EXIT_PARSE_ERROR 3
#define EXIT_CHILD_ERROR 4
#define EXIT_SUBCHILD_ERROR 5
#define EXIT_PARENT_SUCCESS 6


void clear_screen();
int  start();
void display_time();

int  init_timer();
void get_timer_elements(int timer[3], char timer_str[]);
int  terminal();

int  error_occured(int errorcode, char* errormess);
void invalid_input();


void clear_screen()
{
    printf("\033[H\033[J");
}

int start()
{
    while (true)
    {
        char buffer[MAX_INPUTSIZE];
        fgets(buffer, MAX_INPUTSIZE, stdin);
        buffer[strcspn(buffer, "\n")] = '\0';

        char* first_arg = strtok(buffer, " ");
        if (first_arg == NULL)
        {
            invalid_input();
        }
        else if (strcmp(first_arg, "timer") == 0)
        {
            int timer_result = init_timer();
            if (timer_result != EXIT_SUCCESS && timer_result != EXIT_PARSE_ERROR) return EXIT_FAILURE;
        } 
        else if (strcmp(first_arg, "time") == 0)
        {
            display_time();
        }
        else if (strcmp(first_arg, "exit") == 0)
        {
            return EXIT_SUCCESS;
        }
        else 
        {
            invalid_input();
        }
    }
}

void display_time()
{
    time_t current_time;
    time(&current_time);
    printf("%s", ctime(&current_time));
}

int init_timer()
{
    char* tmp = strtok(NULL, " ");
    if (!tmp) return error_occured(EXIT_PARSE_ERROR, "Failed to parse timer argument");

    char timer_str[TIMER_STR_MAXSIZE];   
    strcpy(timer_str, tmp);
    tmp = NULL;

    FILE *timer_conf = fopen("timer_conf.txt", "w");
    if (!timer_conf)    {   return error_occured(EXIT_FAILURE, "Failed to open timer_conf file");   }
    fprintf(timer_conf, "%s", timer_str);
    fclose(timer_conf);
    
	pid_t pid = fork();
	if (pid < 0)
	{
		return error_occured(EXIT_FAILURE, "Failed to fork process");
	}
    else if (pid == 0)
    {   
	    terminal();
    }

    return EXIT_SUCCESS;
}

void get_timer_elements(int timer[3], char timer_str[])
{   
    for (size_t i = 0; i < 3; i++)
    {
        char tmp_buff[2];
        (i == 0) ? strcpy(tmp_buff, strtok(timer_str, ":")) : strcpy(tmp_buff, strtok(NULL, ":"));

        timer[i] = atoi(tmp_buff);
    }
}

// child proccess
int terminal()
{
    char* args[] = {
		"/bin/foot",
        "./timer_manager",
        NULL        
    };
    
    // turning subchild into terminal
    execv(args[0], args);
    return error_occured(EXIT_SUBCHILD_ERROR, "Failed to turn subchild into terminal");
}

int error_occured(int errorcode, char* errormess)
{
    fprintf(stderr, errormess);
    fprintf(stderr, ": code %d\n", errno);
    return errorcode;
}

void invalid_input()
{
    printf("Invalid input\n");
}
