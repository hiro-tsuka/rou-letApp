from apscheduler.schedulers.background import BackgroundScheduler
from .mail import gmail_send
from .models import Locations

def update():
    """
        This function is called by start() below
    """
    # 既存のデータの中でacceptedがfalseのものだけを取得してquery_setに格納
    query_set = Locations.objects.filter(accepted=False)
    body = "notAcceptedId\n"
    for elem in query_set:
        body += str(elem.id) + ","
    query_set2 = Locations.objects.filter(reports__gt=5)
    body += "\nreportedId\n"
    for elem in query_set2:
        body += str(elem.id) + ","
    print(body)
    print('Update!')
    gmail_send(To="",Subject="test",MailBody=body)

# new=>
def start():
   """
   Scheduling data update
   Run update function once every 12 seconds
   """
   print("stert")
   scheduler = BackgroundScheduler()
   print(scheduler.get_jobs())

# BackgroundSchedulerの組み込みメソッドで、処理時間を送らせることができる
   scheduler.add_job(update, 'interval', minutes=60*24) # schedule
#    scheduler.add_job(update, 'interval', minutes=60*24) # schedule
   scheduler.start()