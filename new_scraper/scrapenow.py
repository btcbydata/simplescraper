from xml.sax.xmlreader import AttributesImpl
import firebase_admin
import requests, re
import time, json
import pandas
from bs4 import BeautifulSoup
from firebase_admin import credentials
from firebase_admin import db

headers = {
	"Connection": "keep-alive",
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
}

num = []
title = []
date = []

#firebase 인증, 클라우드에선 경로 수정
certfile = "btcbd_scraper\\new_scraper\\firebase_cert.json"

cred_obj = firebase_admin.credentials.Certificate(certfile)
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': 'https://fbsimplescraper-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

dir=db.reference()

crawled_url='https://gall.dcinside.com/board/lists/?id=bitcoins_new1'

for i in range(1,3): ## 시작,종료 페이지 설정
	URL = "{0}&page={1}".format(crawled_url, i) #페이지 스크롤
	res = requests.get(URL,headers=headers)
	bs = BeautifulSoup(res.content,'html.parser')
	contents = bs.find('tbody').find_all('tr')
	for j in contents:

			gallnum = j.find('td', class_='gall_num')
			num.append(gallnum.text) #글번호
			galltitle = j.find('a')
			title.append(galltitle.text) #글제목
			galldate = j.find('td', class_='gall_date')
			try :
				date.append(galldate['title']) #날짜
			except :
				try :
					date.append(galldate.text)
				except :
					date.append("NULL") #공지등 예외처리


	print(i,"page scraped")

df = pandas.DataFrame({"num":num, "title":title, "date":date})
ad = df[df['num'].str.contains('AD')].index
vote = df[df['num'].str.contains('설문')].index
notice = df[df['num'].str.contains('공지')].index # 광고, 설문, 공지 등 처리
df.drop(ad, inplace=True)
df.drop(vote, inplace=True)
df.drop(notice, inplace=True) # 광고, 설문, 공지 제거
df = df.sort_values('num') # 글번호 기준 정열
df.reset_index(inplace=False) # dataframe 초기화
dir.update(df.to_dict('records'))