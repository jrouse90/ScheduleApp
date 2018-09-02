import json
from utils import convert_to_datetime

def print_tasks(task_dict_to_print, key_to_sort_on=None):
	for task in sorted(task_dict_to_print, key=lambda d : d["start"]):
		print("{} - {} : {}".format(task["start"], task["end"], task["title"]))
		print("Notes: {}".format(task["notes"]))
		print()

def read_tasks(file_to_read):
	tasks=None
	try:
		with open(file_to_read, "r") as f:
			tasks = json.load(f)
	except IOError:
		print(f"Couldn't read {file_to_read} or {file_to_read} does not exsist!!")
	except Exception as e:
		print("EXCEPTION OCCURED!!!")
		print(e)

	return sorted(convert_to_datetime(tasks), key=lambda d : d["start"])
