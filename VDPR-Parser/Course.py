import json

class Course:
	def __init__(self):
		self.year = -1
		self.term = ""
		self.subject = ""
		self.catalogNum = ""
		self.title = ""
		self.grade = "Pending"
		self.units = -1.0
		self.courseType = ""

	def __str__(self):
		return f"{self.year} {self.term} {self.subject} {self.catalogNum} {self.title} {self.grade} {str(self.units)} {self.courseType}"

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
