import Course
import Student

from PyPDF2 import PdfReader

class PDFParser:
	def __init__(self):
		self.student = Student.Student()

	def parseInfo(self, path):
		reader = PdfReader(path)
		text = ""
		for page in reader.pages:
			text += page.extract_text() + "\n"
		lines = text.splitlines()
		for line in range (len(lines)):
			lines[line] = lines[line].split()
		self.parseStudentInfo(lines)
		self.parseCoursesTaken(lines)
		
	def parseStudentInfo(self, lines):
		yearline = lines[6]
		self.student.yearJoined = int(yearline[2])
		self.student.termJoined = yearline[3].strip()
		majorline = lines[8]
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





			
