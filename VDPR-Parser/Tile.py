import SubTile
import json

class Tile:
	def __init__(self):
		self.subTiles = []
		self.name = ""
		self.satisfied = False;
		self.creditsNeeded = -1
		self.creditsTaken = -1
		self.otherRequirements = ""

	def __str__(self):
		output = "\n\n" + self.name + "\nSatisfied: " + str(self.satisfied)
		if(self.creditsNeeded != -1):
			output = output + "\nCredits Needed: " + str(self.creditsNeeded)
		if(self.creditsTaken != -1):
			output = output + "\nCredits Taken:  " + str(self.creditsTaken)
		if(self.otherRequirements != ""):
			output = output + "\nOther Requirments: " + self.otherRequirements
		for tile in range(len(self.subTiles)):
			output = output + "\n" + str(self.subTiles[tile])

		return output

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)