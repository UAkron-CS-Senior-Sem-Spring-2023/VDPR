import Course
import Student
import PDFParser
import os, base64
import time
import json

import redis
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app, resources=r'/*')
cache = redis.Redis(host='redis', port=6379)

from pathlib import Path

@app.route('/parse', methods=['POST'])
def parsePDF():
	parser = PDFParser.PDFParser()
	pdfData = request.files.get('uploadfile')
	if pdfData == None:
		parser.parseInfo("jacobDPR.pdf")
		return "file upload failure"
	else:
		pdfData.save("uploadedPDF.pdf")
		parser.parseInfo("jacobDPR.pdf")
		return parser.toJSON()

@app.route('/requirements', methods=['GET'])
def getRequirements():
	parser = PDFParser.PDFParser()
	parser.parseInfo("jacobDPR.pdf")
	return parser.toJSON()
