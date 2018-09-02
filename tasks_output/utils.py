import datetime
import pandas as pd

def convert_to_positive(num):
	if num < 0:
		return -(num)
	elif num == 0:
		return num
	else:
		return num


def calculate_sleep_time(time_to_check):
	time_now = datetime.time(datetime.datetime.now().hour, datetime.datetime.now().minute)
	hours = convert_to_positive(time_now.hour - time_to_check.hour)
	minutes = convert_to_positive(time_now.minute - time_to_check.minute)

	return ((hours)*60*60)+(minutes*60)


def convert_to_datetime(dict_to_convert):
	for task in dict_to_convert:
		task["start"], task["end"] = pd.to_datetime(task["start"], format="%H%M").time(), pd.to_datetime(task["end"], format="%H%M").time()

	return dict_to_convert


def is_pass_now(time_to_check):
	time_now = datetime.time(datetime.datetime.now().hour, datetime.datetime.now().minute)
	if time_to_check > time_now:
		return False
	return True


def get_file_to_read_from(filename):
	with open(filename, "r") as f:
		return f.readline()