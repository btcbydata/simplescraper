import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#firebase 인증, 클라우드에선 경로 수정
certfile = "C:\\Users\\rhyth\\Desktop\\Senior_Project\\new_scraper\\firebase_cert.json"



cred_obj = firebase_admin.credentials.Certificate(certfile)
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': 'https://fbsimplescraper-default-rtdb.asia-southeast1.firebasedatabase.app'
	})

dir=db.reference()
dir.update({'예제':'테스트1212'})