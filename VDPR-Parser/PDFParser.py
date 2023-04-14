import Course
import Student
import Tile
import SubTile
import json

from PyPDF2 import PdfReader

class PDFParser:
	def __init__(self):
		self.student = Student.Student()
		self.tiles = []

	def parseInfo(self, path):
		reader = PdfReader(path)
		text = ""
		for page in reader.pages:
			text += page.extract_text() + "\n"
		#print for testing
		###########################
		# file_object  = open("output.txt", "w+")
		# file_object.write(text)
		###########################
		lines = text.splitlines()
		for line in range (len(lines)):
			lines[line] = lines[line].split()
		self.parseStudentInfo(lines)
		self.parseCoursesTaken(lines)
		self.parseTiles(lines)
		
	def parseStudentInfo(self, lines):
		for line in range(len(lines)):
			if "Term" in lines[line]:
				yearline = lines[line + 1]
				break
		self.student.yearJoined = int(yearline[2])
		self.student.termJoined = yearline[3].strip()
		for line in range(len(lines)):
			if "Important" in lines[line]:
				majorline = lines[line - 2]
				break
		for i in range(len(majorline) - 5):
			self.student.major += majorline[i] + " "
		self.student.major = self.student.major.strip()

	def parseCoursesTaken(self, lines):
		courseLines = self.getCourseLines(lines)
		for line in range (len(courseLines)):
			length = len(courseLines[line])
			courseToAdd = Course.Course()
			courseToAdd.year = courseLines[line][0]
			courseToAdd.term = courseLines[line][1]
			courseToAdd.subject = courseLines[line][2]
			courseToAdd.catalogNum = courseLines[line][3]
			courseToAdd.grade = courseLines[line][length - 3]
			courseToAdd.units = courseLines[line][length - 2]
			courseToAdd.courseType = courseLines[line][length - 1]
			for word in range(length - 7):
				courseToAdd.title += courseLines[line][4 + word] + " "
			courseToAdd.title = courseToAdd.title.strip()
			self.student.coursesTaken.append(courseToAdd)

	def getCourseLines(self, lines):
		historyPoint = -1
		for line in range(len(lines)):
			for word in range(len(lines[line]) - 1):
				if(lines[line][word].strip() == "Course" and lines[line][word + 1].strip() == "History"):
					historyPoint = line + 2
					break;
		courseLines = []
		for line in range(len(lines) - historyPoint):
			courseLines.append(lines[historyPoint + line])
		return self.cleanData(courseLines)

	def cleanData(self, lines):
		length = len(lines)
		for line in range (length):
			if(line == length):
				break
			if(lines[line][0][0] != "2"):
				for word in range(len(lines[line])):
					fixedWord = lines[line][word][0]
					for let in range (len(lines[line][word]) - 1):
						if(lines[line][word][let + 1].isupper() and lines[line][word][let].islower()):
							fixedWord += " " + lines[line][word][let + 1]
						else:
							fixedWord += lines[line][word][let + 1]
					fixedWordList = fixedWord.split()
					for fixedWord in range(len(fixedWordList)):
						lines[line - 1].append(fixedWordList[fixedWord])
				lines.pop(line)
				length -= 1
		return lines

	def parseTiles(self, lines):
		currTile = None
		subTile = None
		lines = list(filter(None, lines))
		for line in range (len(lines)):
			if self.inLine("(RG", lines[line]):
				if currTile != None:
					self.tiles.append(currTile)
				currTile = Tile.Tile()
				for word in range(len(lines[line])):
					currTile.name = currTile.name + " " + lines[line][word]
					currTile.name = currTile.name.strip()
				line += 1
				while not self.inLine("(RQ", lines[line]):
					if ("Satisfied:" in lines[line]):
						satIndex = lines[line].index("Satisfied:")
						if(satIndex > 0 and lines[line][satIndex - 1] == "Not"):
							currTile.satisfied = False
						else:
							currTile.satisfied = True
						for word in range(satIndex + 1, len(lines[line])):
							currTile.otherRequirements = currTile.otherRequirements + " " + lines[line][word]
							currTile.otherRequirements = currTile.otherRequirements.strip()
					elif ("Units:" in lines[line]):
						if ("required," in lines[line]):
							currTile.creditsNeeded = float(lines[line][lines[line].index("required,") - 1])
						if ("used," in lines[line]):
							currTile.creditsTaken = float(lines[line][lines[line].index("used,") - 1])
						if ("used" in lines[line]):
							currTile.creditsTaken = float(lines[line][lines[line].index("used") - 1])
					else:
						for word in range(len(lines[line])):
							currTile.otherRequirements = currTile.otherRequirements + " " + lines[line][word]
							currTile.otherRequirements = currTile.otherRequirements.strip()
					line += 1
			elif self.inLine("(RQ", lines[line]):
				subTile = SubTile.SubTile()
				for word in range(len(lines[line])):
					subTile.name = subTile.name + " " + lines[line][word]
					subTile.name = subTile.name.strip()
				line += 1
				while (not self.inLine("(RQ", lines[line])) and (not self.inLine("(RG", lines[line])) and lines[line][len(lines[line]) - 1] != "History":
					if ("Satisfied:" in lines[line]):
						satIndex = lines[line].index("Satisfied:")
						if("Not" in lines[line]):
							subTile.satisfied = False
						else:
							subTile.satisfied = True
						for word in range(satIndex + 1, len(lines[line])):
							subTile.otherRequirements = subTile.otherRequirements + " " + lines[line][word]
							subTile.otherRequirements = subTile.otherRequirements.strip()
					elif ("Units:" in lines[line]):
						if ("required," in lines[line]):
							subTile.creditsNeeded = float(lines[line][lines[line].index("required,") - 1])
						if ("used" in lines[line]):
							subTile.creditsTaken = float(lines[line][lines[line].index("used") - 1])
						if ("used," in lines[line]):
							subTile.creditsTaken = float(lines[line][lines[line].index("used,") - 1])
					elif ("Courses:" in lines[line]):
						if ("required," in lines[line]):
							subTile.coursesNeeded = float(lines[line][lines[line].index("required,") - 1])
						if ("used" in lines[line]):
							subTile.coursesTaken = float(lines[line][lines[line].index("used") - 1])
						if ("used," in lines[line]):
							subTile.coursesTaken = float(lines[line][lines[line].index("used,") - 1])
					elif (lines[line][0] == "Courses" and lines[line][1] == "Used"):
						line += 1
						while (not self.inLine("(RQ", lines[line])) and (not self.inLine("(RG", lines[line])) and lines[line][len(lines[line]) - 1] != "History" and lines[line][len(lines[line]) - 1] != "Available":
							if(lines[line][0][0:2] == "20"):
								newCourse = Course.Course()
								newCourse.year = lines[line][0]
								newCourse.term = lines[line][1]
								newCourse.subject = lines[line][2]
								newCourse.catalogNum = lines[line][3]
								newCourse.grade = lines[line][len(lines[line]) - 2]
								newCourse.units = float(lines[line][len(lines[line]) - 1])
								for word in range(4, len(lines[line]) - 2):
									newCourse.title = newCourse.title + " " + lines[line][word]
									newCourse.title = newCourse.title.strip()
								subTile.courses.append(newCourse)
							line += 1
						if (self.inLine("(RQ", lines[line]) or self.inLine("(RG", lines[line])):
							line = line -1
					else:
						for word in range(len(lines[line])):
							subTile.otherRequirements = subTile.otherRequirements + " " + lines[line][word]
							subTile.otherRequirements = subTile.otherRequirements.strip()
					line += 1
					if(line > len(lines) - 1):
						break
				currTile.subTiles.append(subTile)
		self.tiles.append(currTile)

	def inLine(self, value, line):
		for word in range(len(line)):
			if (value in line[word]):
				return True
			
	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

#for testing
def main():
	test = PDFParser()
	test.parseInfo("jacobDPR.pdf")
	f = open("output.txt", "w")
	for tile in range(len(test.tiles)):
		f.write(str(test.tiles[tile]))
	f.close()

if __name__ == '__main__':
	main() 