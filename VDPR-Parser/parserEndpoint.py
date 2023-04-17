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

@app.route('/parse', methods=['POST', 'GET'])
def parsePDF():
	parser = PDFParser.PDFParser()
	pdfData = request.files.get('uploadfile')
	if request.method == "GET":
		parser.parseInfo("uploadedPDF.pdf")
		return parser.toJSON()
	else:
		pdfData.save("uploadedPDF.pdf")
		return "Success", 200
