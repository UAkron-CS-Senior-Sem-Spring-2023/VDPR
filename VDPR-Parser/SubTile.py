import Course
import json

class SubTile:
	def __init__(self):
		self.courses  = []
		self.name = ""
		self.satisfied = False;
		self.creditsNeeded = -1
		self.creditsTaken = -1
		self.coursesNeeded = -1
		self.coursesTaken = -1
		self.otherRequirements = ""

	def __str__(self):
		output = "\n\t" + self.name + "\n\tSatisfied: " + str(self.satisfied)
		if(self.creditsNeeded != -1):
			output = output + "\n\tCredits Needed: " + str(self.creditsNeeded)
		if(self.creditsTaken != -1):
			output = output + "\n\tCredits Taken:  " + str(self.creditsTaken)
		if(self.coursesNeeded != -1):
			output = output + "\n\tCourses Needed: " + str(self.coursesNeeded)
		if(self.coursesTaken != -1):
			output = output + "\n\tCourses Taken:  " + str(self.coursesTaken)
		if(self.otherRequirements != ""):
			output = output + "\n\tOther Requirements:  " + self.otherRequirements
		if(self.courses != []):
			output = output + "\n\tCourses Taken:\n"
			for course in range(len(self.courses)):
				output = output + "\t\t" + str(self.courses[course]) + "\n"
		return output

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)