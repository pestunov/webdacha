import requests
import datetime as dt

t1 = dt.datetime.now()
req = requests.get('https://www.iao.ru/')
t2 = dt.datetime.now()

print(req)