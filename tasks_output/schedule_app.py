import time
from utils import get_file_to_read_from, calculate_sleep_time
from task import read_tasks, print_tasks
from alarm import alarm, find_next_alarm_time
fileToRead = ""

# TODO add better error and exception handling


fileToRead = get_file_to_read_from("../data/currentActiveTaskListDir.txt")
tasks = read_tasks(fileToRead)
print_tasks(tasks)

while True:
	sleep_time = calculate_sleep_time(find_next_alarm_time(tasks))
	print(sleep_time/60)
	time.sleep(sleep_time)
	alarm("sonar.ogg", 15)
