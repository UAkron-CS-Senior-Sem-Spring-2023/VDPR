import Course
import json

class Student:
	def __init__(self):
		self.coursesTaken = []
		self.major = ""
		self.yearJoined = -1;
		self.termJoined = ""

	def __str__(self):
		return f"{self.major} {self.yearJoined} {self.termJoined}"

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)