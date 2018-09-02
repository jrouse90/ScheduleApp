import subprocess
import datetime
from utils import is_pass_now

def find_next_alarm_time(dic):
	for task in dic:
		if not is_pass_now(task["start"]):
			return task["start"]
		elif not is_pass_now(task["end"]):
			return task["end"]
	return datetime.time(0, 0)

def alarm(sound, num_plays=1):
	# research the effiecientcy of a for loop
	for x in range(num_plays):
		subprocess.run(["play", "-q", sound])
