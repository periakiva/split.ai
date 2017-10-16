import codecs
from werkzeug.utils import secure_filename
import os
import re, locale
import tesserocr
from PIL import Image, ImageFilter, ImageEnhance
import json
from flask import Flask, render_template,make_response,g,request,url_for,redirect, flash,jsonify
app = Flask(__name__)

UPLOAD_FOLDER='/home/native/projects/hackRUfall2017/'
ALLOWED_EXTENSIONS = set(['txt','pdf','png','jpg','gif'])
app.secret_key = "super"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER 

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def getImage(filepath):
    image = Image.open(filepath)
    image = image.convert('L')
    image = image.point(lambda x: 0 if x<159 else 255, '1')
    image.save("result.png")
    
    f = open('extractedTestFromRec.txt','w')
    a = tesserocr.image_to_text(image)
    print a
    #print type(a)
    f.write(a.encode("UTF-8"))
    f.close()

#getImage('/home/native/projects/hackRUfall2017/test4.jpg')

def readLine(sentence):
    index = None
    sentence=sentence.lower()
#    print sentence
    if ('total' or 'yolal' or 'talal') in sentence:
        if ('total' and 'sub') in sentence:
            return None,None,False
        totalPrice = sentence[sentence.index('$')+1:len(sentence)]
        totalPrice = totalPrice.replace(" ",".")
        return "Total",totalPrice,True
    elif ('sales tax' or 'sale tax' or 'tax') in sentence:
        if '$' in sentence:
            salesTax = sentence[sentence.index('$')+1:len(sentence)]
        else:
            salesTax = sentence[sentence.index('3')+1:len(sentence)]
        salesTax = salesTax.replace(' ', '.')
        print salesTax
        return "Sales Tax",salesTax,False
    elif '$' in sentence:
        index = sentence.index('$')
        itemDescription = sentence[0:index]
        itemPrice=sentence[index+1:len(sentence)]
        itemPrice = itemPrice.replace(" ",".")
        return itemDescription, itemPrice,False
    else:
        return None,None,False

def readFile(path):
    listOfLines=[]
    text = codecs.open(path,'r',encoding='utf-8',errors='replace')
    text = text.readlines()
    lines =[]
    for line in text:
        l = line.replace('\n','')
        lines.append(l)   
    reciptOrder = {}
    checker=False
    for line in lines:
        item,price,checker = readLine(line)
        if (item and price):
            reciptOrder[item]=price
    return reciptOrder
def turnToJson(dic):
    js = json.dumps(dic)
    loaded_js = json.loads(js)
    print loaded_js
    return loaded_js

@app.route('/',methods=['GET','POST'])
def upload_file():
    print request.method
    if request.method == 'POST':
        print request.files
        f = request.files['super']
        print f
        sfname = str(secure_filename(f.filename))
        f.save(sfname)
        print sfname
        print "hello"
        getImage(sfname)
        dictionary=readFile('extractedTestFromRec.txt')
        js = turnToJson(dictionary)
        print js
        return jsonify(js)

"""
if __name__=="__main__":
    getImage('/home/native/projects/hackRUfall2017/rec.jpg')

    dictionary= readFile('/home/native/projects/hackRUfall2017/extractedTestFromRec.txt')
    for i in dictionary:
        print i,dictionary[i]
    print dictionary
"""
