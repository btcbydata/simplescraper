from xml.sax.xmlreader import AttributesImpl
import firebase_admin
import requests, re
import time, json
from bs4 import BeautifulStoneSoup
from firebase_admin import credentials
from firebase_admin import db

headers = {
	"Connection": "keep-alive",
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
}

#firebase 인증, 클라우드에선 경로 수정
certfile = "C:\\Users\\rhyth\\Desktop\\Senior_Project\\new_scraper\\firebase_cert.json"

cred_obj = firebase_admin.credentials.Certificate(certfile)
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': 'https://fbsimplescraper-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

dir=db.reference()

html = requests.get("https://gall.dcinside.com/board/lists/?id=bitcoins_new1",headers)
bs = BeautifulStoneSoup(html.read(),'lxml')
contents = bs.find('tbody').find_all('tr')
dict = []

for i in contents:
	gallnum = i.find('td',{'class':'gall_num'}) #글제목
	if (isinstance(num,int)==False): #공지 제외
		continue

	galltitle = i.find('a').text # 제목
	galldate = i.find('td', {'class':'gall_date'}).attrs #일시




dir.update({'예제':'테스트1212'})